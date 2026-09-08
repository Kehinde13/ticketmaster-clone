import "server-only";

import { getEventProvider } from "@/lib/api/events";
import type { EventProvider } from "@/lib/api/events/provider";
import type { Event, EventCategory } from "@/types/event";

export async function loadPopularEvents(
  category: EventCategory,
  provider: EventProvider = getEventProvider(),
): Promise<readonly Event[]> {
  const result = await provider.searchEvents({
    countryCode: "US",
    category,
    page: 0,
    pageSize: 6,
  });
  return result.events;
}
