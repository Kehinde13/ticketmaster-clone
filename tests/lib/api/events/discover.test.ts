import { describe, expect, it, vi } from "vitest";

import { loadPopularEvents } from "@/lib/api/events/discover";
import type { EventProvider } from "@/lib/api/events/provider";
import type { EventSearchResult } from "@/types/event";

describe("loadPopularEvents", () => {
  it.each([
    ["concerts", "US"],
    ["sports", "GB"],
    ["arts-theater-comedy", "CA"],
    ["family", "AU"],
  ] as const)(
    "requests the first six normalized %s events for %s and returns them unchanged",
    async (category, countryCode) => {
    const result: EventSearchResult = {
      events: [],
      pagination: { page: 0, size: 6, totalItems: 0, totalPages: 0, hasNextPage: false },
    };
    const searchEvents = vi.fn<EventProvider["searchEvents"]>().mockResolvedValue(result);
    const provider: EventProvider = {
      searchEvents,
      getEventById: vi.fn<EventProvider["getEventById"]>(),
    };

    await expect(loadPopularEvents(category, countryCode, provider)).resolves.toBe(result.events);
    expect(searchEvents).toHaveBeenCalledExactlyOnceWith({
      countryCode,
      category,
      page: 0,
      pageSize: 6,
    });
    },
  );
});
