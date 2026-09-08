import { describe, expect, it, vi } from "vitest";

import { loadPopularConcertEvents } from "@/lib/api/events/discover";
import type { EventProvider } from "@/lib/api/events/provider";
import type { EventSearchResult } from "@/types/event";

describe("loadPopularConcertEvents", () => {
  it("requests the first six normalized US concert events and returns them unchanged", async () => {
    const result: EventSearchResult = {
      events: [],
      pagination: { page: 0, size: 6, totalItems: 0, totalPages: 0, hasNextPage: false },
    };
    const searchEvents = vi.fn<EventProvider["searchEvents"]>().mockResolvedValue(result);
    const provider: EventProvider = {
      searchEvents,
      getEventById: vi.fn<EventProvider["getEventById"]>(),
    };

    await expect(loadPopularConcertEvents(provider)).resolves.toBe(result.events);
    expect(searchEvents).toHaveBeenCalledExactlyOnceWith({
      countryCode: "US",
      category: "concerts",
      page: 0,
      pageSize: 6,
    });
  });
});
