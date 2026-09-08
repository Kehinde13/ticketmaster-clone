import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { PopularConcerts } from "@/components/events/popular-concerts";
import type { Event } from "@/types/event";

vi.mock("next/server", () => ({ connection: vi.fn().mockResolvedValue(undefined) }));

const liveEvent: Event = {
  id: "ticketmaster:live-1",
  provider: "ticketmaster",
  providerEventId: "live-1",
  name: "Live Normalized Concert",
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

describe("PopularConcerts", () => {
  it("renders normalized results through the existing event card", async () => {
    render(await PopularConcerts({ loadEvents: vi.fn().mockResolvedValue([liveEvent]) }));
    const card = screen.getByRole("article", { name: "Live Normalized Concert" });
    expect(screen.getByText("SAT, SEP 12 • 8:30 PM")).toBeInTheDocument();
    expect(card).toHaveTextContent("Live Arena • Chicago, IL");
  });

  it("renders a row-level empty state for a successful empty search", async () => {
    render(await PopularConcerts({ loadEvents: vi.fn().mockResolvedValue([]) }));
    expect(screen.getByRole("region", { name: "No concerts found" })).toBeInTheDocument();
  });

  it("renders a generic row-level error without exposing provider internals", async () => {
    const loadEvents = vi.fn().mockRejectedValue(new Error("secret upstream response"));
    render(await PopularConcerts({ loadEvents }));
    expect(screen.getByRole("alert")).toHaveTextContent("Concert events are temporarily unavailable.");
    expect(screen.queryByText(/secret upstream response/i)).not.toBeInTheDocument();
  });
});
