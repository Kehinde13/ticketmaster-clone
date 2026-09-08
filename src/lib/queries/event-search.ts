import { queryOptions } from "@tanstack/react-query";

import {
  buildEventSearchUrl,
  fetchEventSearch,
} from "@/lib/api/events/client";
import type { EventSearchParams } from "@/types/event";

export function eventSearchQueryKey(params: EventSearchParams) {
  return ["events", "search", buildEventSearchUrl(params)] as const;
}

export function eventSearchQueryOptions(params: EventSearchParams) {
  return queryOptions({
    queryKey: eventSearchQueryKey(params),
    queryFn: ({ signal }) => fetchEventSearch(params, { signal }),
    retry: false,
  });
}
