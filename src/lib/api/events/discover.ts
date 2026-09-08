import "server-only";

import { getEventProvider } from "@/lib/api/events";
import type { EventProvider } from "@/lib/api/events/provider";
import type { Event } from "@/types/event";

export async function loadPopularConcertEvents(
  provider: EventProvider = getEventProvider(),
): Promise<readonly Event[]> {
  const result = await provider.searchEvents({
    countryCode: "US",
    category: "concerts",
    page: 0,
    pageSize: 6,
  });
  return result.events;
}
