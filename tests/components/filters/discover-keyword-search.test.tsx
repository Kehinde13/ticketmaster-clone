import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { DiscoverKeywordSearch } from "@/components/filters/discover-keyword-search";
import type { EventSearchResult } from "@/types/event";

const result: EventSearchResult = {
  events: [
    {
      id: "ticketmaster:fixture-1",
      provider: "ticketmaster",
      providerEventId: "fixture-1",
      name: "Coldplay: Music of the Spheres",
      url: null,
      images: [],
      dates: {
        start: { localDate: "2026-10-09", localTime: "20:00:00", utcDateTime: null },
        end: null,
        timezone: "America/Chicago",
        dateTbd: false,
        dateTba: false,
        timeTba: false,
        noSpecificTime: false,
        endApproximate: false,
        spansMultipleDays: false,
      },
      venue: {
        id: "venue-1",
        name: "Soldier Field",
        location: {
          addressLines: [], city: "Chicago", state: "Illinois", stateCode: "IL",
          country: "United States", countryCode: "US", postalCode: null,
          latitude: null, longitude: null,
        },
        timezone: "America/Chicago",
      },
      classification: null,
      priceRange: null,
      status: "onsale",
    },
  ],
  pagination: { page: 0, size: 20, totalItems: 1, totalPages: 1, hasNextPage: false },
};

function renderSearch(ui: ReactElement = <DiscoverKeywordSearch categoryNavigation={<div>Categories</div>} />) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

afterEach(() => vi.unstubAllGlobals());

describe("DiscoverKeywordSearch", () => {
  it("does not query initially, while typing, or for whitespace-only submissions", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn<typeof fetch>();
    vi.stubGlobal("fetch", fetchMock);
    renderSearch();
    const input = screen.getByRole("searchbox", { name: "Search" });

    expect(screen.queryByRole("heading", { name: /Search Results/ })).not.toBeInTheDocument();
    await user.type(input, "Coldplay");
    expect(fetchMock).not.toHaveBeenCalled();
    await user.clear(input);
    await user.type(input, "   {Enter}");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each(["enter", "button"])("submits a trimmed keyword with the %s action", async (action) => {
    const user = userEvent.setup();
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(JSON.stringify(result), { status: 200, headers: { "Content-Type": "application/json" } }),
    );
    vi.stubGlobal("fetch", fetchMock);
    renderSearch();
    const input = screen.getByRole("searchbox", { name: "Search" });
    await user.type(input, "  Coldplay  ");
    if (action === "enter") await user.keyboard("{Enter}");
    else await user.click(screen.getByRole("button", { name: /^Search$/ }));

    expect(await screen.findByRole("heading", { name: "Search Results for \u201cColdplay\u201d" })).toBeInTheDocument();
    expect(await screen.findByRole("article", { name: "Coldplay: Music of the Spheres" })).toBeInTheDocument();
    expect(screen.getByText("Event")).toBeInTheDocument();
    expect(screen.getByText(/Soldier Field/)).toHaveTextContent("Soldier Field • Chicago, IL");
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/events?keyword=Coldplay&countryCode=US&page=0&pageSize=20",
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("shows isolated loading, empty, and safe error states", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn<typeof fetch>();
    vi.stubGlobal("fetch", fetchMock);
    renderSearch();
    const input = screen.getByRole("searchbox", { name: "Search" });

    fetchMock.mockImplementationOnce(() => new Promise(() => undefined));
    await user.type(input, "Pending{Enter}");
    expect(await screen.findByText("Loading search results…")).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it("renders empty and generic error responses without leaking codes", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn<typeof fetch>()
      .mockResolvedValueOnce(new Response(JSON.stringify({ ...result, events: [] })))
      .mockResolvedValueOnce(new Response(JSON.stringify({
        error: { code: "EVENT_SERVICE_UNAVAILABLE", message: "TICKETMASTER_API_KEY is missing" },
      }), { status: 503 }));
    vi.stubGlobal("fetch", fetchMock);
    renderSearch();
    const input = screen.getByRole("searchbox", { name: "Search" });

    await user.type(input, "Nobody{Enter}");
    expect(await screen.findByRole("heading", { name: "No events found" })).toBeInTheDocument();
    await user.clear(input);
    await user.type(input, "Failure{Enter}");
    expect(await screen.findByRole("heading", { name: "Search results unavailable" })).toBeInTheDocument();
    expect(screen.queryByText(/EVENT_SERVICE_UNAVAILABLE|TICKETMASTER_API_KEY/)).not.toBeInTheDocument();
  });

  it("clears results without an empty request and uses a new query for a second search", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify(result)));
    vi.stubGlobal("fetch", fetchMock);
    renderSearch();
    const input = screen.getByRole("searchbox", { name: "Search" });

    await user.type(input, "Coldplay{Enter}");
    await screen.findByRole("heading", { name: "Search Results for \u201cColdplay\u201d" });
    await user.clear(input);
    await user.type(input, "Beyoncé{Enter}");
    expect(await screen.findByRole("heading", { name: /Beyoncé/ })).toBeInTheDocument();
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    expect(fetchMock.mock.calls[1]?.[0]).toContain("keyword=Beyonc%C3%A9");
    await user.clear(input);
    expect(screen.queryByRole("heading", { name: /Search Results/ })).not.toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
