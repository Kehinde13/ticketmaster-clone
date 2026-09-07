import { describe, expect, it } from "vitest";

import type { EventProvider } from "@/lib/api/events/provider";
import {
  createEventId,
  type Event,
  type EventSearchParams,
  type EventSearchResult,
} from "@/types/event";

const event: Event = {
  id: createEventId("ticketmaster", "event-123"),
  provider: "ticketmaster",
  providerEventId: "event-123",
  name: "Example Event",
  url: null,
  images: [],
  dates: {
    start: {
      localDate: "2026-10-09",
      localTime: "20:00:00",
      utcDateTime: "2026-10-10T01:00:00Z",
    },
    end: null,
    timezone: "America/Chicago",
    dateTbd: false,
    dateTba: false,
    timeTba: false,
    noSpecificTime: false,
    endApproximate: false,
    spansMultipleDays: false,
  },
  venue: null,
  classification: null,
  priceRange: null,
  status: "onsale",
};

class FakeEventProvider implements EventProvider {
  async searchEvents(params: EventSearchParams): Promise<EventSearchResult> {
    return {
      events: [event],
      pagination: {
        page: params.page ?? 0,
        size: params.pageSize ?? 20,
        totalItems: 1,
        totalPages: 1,
        hasNextPage: false,
      },
    };
  }

  async getEventById(providerEventId: string): Promise<Event | null> {
    return providerEventId === event.providerEventId ? event : null;
  }
}

describe("Event provider contract", () => {
  it("supports normalized search and provider-id detail lookup", async () => {
    const provider: EventProvider = new FakeEventProvider();

    const result = await provider.searchEvents({
      keyword: "Example",
      countryCode: "US",
      page: 0,
      pageSize: 20,
    });

    expect(result.events).toEqual([event]);
    expect(result.pagination.hasNextPage).toBe(false);
    await expect(provider.getEventById("event-123")).resolves.toEqual(event);
    await expect(provider.getEventById("missing")).resolves.toBeNull();
  });

  it("constructs provider-qualified ids and rejects empty provider ids", () => {
    expect(createEventId("ticketmaster", "event-123")).toBe(
      "ticketmaster:event-123",
    );
    expect(() => createEventId("ticketmaster", "  ")).toThrow(
      "providerEventId must not be empty",
    );
  });
});
