import { QueryClient } from "@tanstack/react-query";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  eventSearchQueryKey,
  eventSearchQueryOptions,
} from "@/lib/queries/event-search";
import type { EventSearchParams, EventSearchResult } from "@/types/event";

const emptyResult: EventSearchResult = {
  events: [],
  pagination: { page: 0, size: 20, totalItems: 0, totalPages: 0, hasNextPage: false },
};

afterEach(() => vi.unstubAllGlobals());

describe("eventSearchQueryKey", () => {
  it("is canonical for equivalent optional parameters", () => {
    expect(eventSearchQueryKey({})).toEqual(eventSearchQueryKey({ location: undefined }));
    expect(eventSearchQueryKey({})).toEqual(eventSearchQueryKey({ location: {} }));
  });

  it.each([
    [{ keyword: "Rock" }, { keyword: "Jazz" }],
    [{ countryCode: "US" }, { countryCode: "CA" }],
    [{ location: { city: "New York" } }, { location: { city: "Boston" } }],
    [{ location: { latitude: 1, longitude: 2, radius: { value: 10, unit: "km" } } }, { location: { latitude: 1, longitude: 3, radius: { value: 10, unit: "km" } } }],
    [{ startDateTime: "2026-01-01T00:00:00Z" }, { startDateTime: "2026-02-01T00:00:00Z" }],
    [{ endDateTime: "2026-03-01T00:00:00Z" }, { endDateTime: "2026-04-01T00:00:00Z" }],
    [{ category: "concerts" }, { category: "sports" }],
    [{ classification: { segment: "Music", genre: "Rock", subGenre: "Alternative" } }, { classification: { segment: "Music", genre: "Jazz", subGenre: "Bebop" } }],
    [{ page: 0 }, { page: 1 }],
    [{ pageSize: 10 }, { pageSize: 20 }],
  ] satisfies readonly [EventSearchParams, EventSearchParams][])(
    "distinguishes every result-changing search parameter",
    (first, second) => expect(eventSearchQueryKey(first)).not.toEqual(eventSearchQueryKey(second)),
  );

  it("uses the canonical serialized search as a primitive key member", () => {
    expect(eventSearchQueryKey({ countryCode: "US", page: 0 })).toEqual([
      "events", "search", "/api/events?countryCode=US&page=0",
    ]);
  });
});

describe("eventSearchQueryOptions", () => {
  it("defines its key, cancellation-aware query function, and conservative retry policy", async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify(emptyResult)));
    vi.stubGlobal("fetch", fetchMock);
    const options = eventSearchQueryOptions({ countryCode: "US" });
    const signal = new AbortController().signal;

    expect(options.queryKey).toEqual(eventSearchQueryKey({ countryCode: "US" }));
    expect(options.retry).toBe(false);
    expect(options.staleTime).toBeUndefined();
    expect(options.refetchInterval).toBeUndefined();
    if (typeof options.queryFn !== "function") throw new Error("Query function is required.");
    await expect(options.queryFn({
      queryKey: options.queryKey,
      signal,
      meta: undefined,
      client: new QueryClient(),
    })).resolves.toEqual(emptyResult);
    expect(fetchMock).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ signal }));
  });
});
