import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { PopularEventRow } from "@/components/events/popular-event-row";
import type { Event, EventCategory } from "@/types/event";

vi.mock("next/server", () => ({ connection: vi.fn().mockResolvedValue(undefined) }));

function event(name: string): Event {
  const providerEventId = name.toLowerCase().replaceAll(/[^a-z]+/g, "-");
  return {
    id: `ticketmaster:${providerEventId}`,
    provider: "ticketmaster",
    providerEventId,
    name,
    url: null,
    images: [],
    dates: {
      start: { localDate: "2026-09-12", localTime: "20:30:00", utcDateTime: null },
      end: null, timezone: null, dateTbd: false, dateTba: false, timeTba: false,
      noSpecificTime: false, endApproximate: false, spansMultipleDays: false,
    },
    venue: {
      id: null, name: "Live Arena", timezone: null,
      location: {
        addressLines: [], city: "Chicago", state: "Illinois", stateCode: "IL",
        country: "United States", countryCode: "US", postalCode: null,
        latitude: null, longitude: null,
      },
    },
    classification: null,
    priceRange: null,
    status: "onsale",
  };
}

const cases: readonly [EventCategory, string, string][] = [
  ["concerts", "Concerts", "No concerts found"],
  ["sports", "Sports", "No sports events found"],
  ["arts-theater-comedy", "Arts, Theater & Comedy", "No arts events found"],
  ["family", "Family", "No family events found"],
];

describe("PopularEventRow", () => {
  it.each(cases)("renders %s results with the correct fallback label", async (category, label) => {
    const item = event(`${label} Live Event`);
    const loadEvents = vi.fn().mockResolvedValue([item]);
    render(await PopularEventRow({ category, loadEvents }));

    const card = screen.getByRole("article", { name: item.name });
    expect(card).toHaveTextContent(label);
    expect(card).toHaveTextContent("SAT, SEP 12 • 8:30 PM");
    expect(card).toHaveTextContent("Live Arena • Chicago, IL");
    expect(loadEvents).toHaveBeenCalledExactlyOnceWith(category);
  });

  it.each(cases)("renders the %s empty state independently", async (category, _label, empty) => {
    render(await PopularEventRow({ category, loadEvents: vi.fn().mockResolvedValue([]) }));
    expect(screen.getByRole("region", { name: empty })).toBeInTheDocument();
  });

  it.each(cases)("renders a generic %s error without provider internals", async (category) => {
    const loadEvents = vi.fn().mockRejectedValue(new Error("secret upstream response"));
    render(await PopularEventRow({ category, loadEvents }));
    expect(screen.getByRole("alert")).toHaveTextContent("temporarily unavailable");
    expect(screen.queryByText(/secret upstream response/i)).not.toBeInTheDocument();
  });

  it("keeps mixed category outcomes isolated", async () => {
    const outcomes = await Promise.all([
      PopularEventRow({ category: "concerts", loadEvents: vi.fn().mockResolvedValue([event("Concert Success")]) }),
      PopularEventRow({ category: "sports", loadEvents: vi.fn().mockRejectedValue(new Error("failed")) }),
      PopularEventRow({ category: "arts-theater-comedy", loadEvents: vi.fn().mockResolvedValue([]) }),
      PopularEventRow({ category: "family", loadEvents: vi.fn().mockResolvedValue([event("Family Success")]) }),
    ]);
    render(<>{outcomes}</>);

    expect(screen.getByText("Concert Success")).toBeInTheDocument();
    expect(screen.getByText("Family Success")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Sports events are temporarily unavailable.");
    expect(screen.getByRole("region", { name: "No arts events found" })).toBeInTheDocument();
  });
});
