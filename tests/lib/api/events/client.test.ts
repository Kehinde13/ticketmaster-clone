import { afterEach, describe, expect, it, vi } from "vitest";

import {
  buildEventSearchUrl,
  EventSearchApiError,
  fetchEventSearch,
} from "@/lib/api/events/client";
import type { EventSearchParams, EventSearchResult } from "@/types/event";

const emptyResult: EventSearchResult = {
  events: [],
  pagination: { page: 0, size: 20, totalItems: 0, totalPages: 0, hasNextPage: false },
};

const populatedResult: EventSearchResult = {
  events: [{
    id: "ticketmaster:event-1",
    provider: "ticketmaster",
    providerEventId: "event-1",
    name: "Normalized Event",
    url: "https://www.ticketmaster.com/event/event-1",
    images: [],
    dates: {
      start: { localDate: "2026-09-12", localTime: null, utcDateTime: null },
      end: null,
      timezone: null,
      dateTbd: false,
      dateTba: false,
      timeTba: false,
      noSpecificTime: true,
      endApproximate: false,
      spansMultipleDays: false,
    },
    venue: null,
    classification: null,
    priceRange: null,
    status: "onsale",
  }],
  pagination: { page: 0, size: 20, totalItems: 1, totalPages: 1, hasNextPage: false },
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

afterEach(() => vi.unstubAllGlobals());

describe("buildEventSearchUrl", () => {
  it("serializes minimal parameters and omits missing values", () => {
    expect(buildEventSearchUrl({ countryCode: "US" }))
      .toBe("/api/events?countryCode=US");
    expect(buildEventSearchUrl({ location: {} })).toBe("/api/events");
  });

  it("encodes keyword, location, coordinates, radius, dates, classification, and pagination", () => {
    expect(buildEventSearchUrl({
      keyword: "AC/DC & friends",
      countryCode: "US",
      location: {
        city: "New York",
        stateCode: "NY",
        postalCode: "10001",
        latitude: 40.7128,
        longitude: -74.006,
        radius: { value: 25, unit: "miles" },
      },
      startDateTime: "2026-09-01T00:00:00Z",
      endDateTime: "2026-10-01T00:00:00Z",
      category: "arts-theater-comedy",
      classification: { segment: "Arts & Theater", genre: "Comedy", subGenre: "Stand Up" },
      page: 1,
      pageSize: 20,
    })).toBe(
      "/api/events?keyword=AC%2FDC+%26+friends&countryCode=US&city=New+York&stateCode=NY&postalCode=10001&latitude=40.7128&longitude=-74.006&radius=25&radiusUnit=miles&startDateTime=2026-09-01T00%3A00%3A00Z&endDateTime=2026-10-01T00%3A00%3A00Z&category=arts-theater-comedy&segment=Arts+%26+Theater&genre=Comedy&subGenre=Stand+Up&page=1&pageSize=20",
    );
  });

  it("is deterministic regardless of input property insertion order", () => {
    const first: EventSearchParams = { keyword: "Jazz", countryCode: "US", page: 2 };
    const second: EventSearchParams = { page: 2, countryCode: "US", keyword: "Jazz" };
    expect(buildEventSearchUrl(first)).toBe(buildEventSearchUrl(second));
  });
});

describe("fetchEventSearch", () => {
  it("returns normalized success data and passes GET, Accept, and AbortSignal", async () => {
    const signal = new AbortController().signal;
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(jsonResponse(emptyResult));
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchEventSearch({ countryCode: "US" }, { signal })).resolves.toEqual(emptyResult);
    expect(fetchMock).toHaveBeenCalledExactlyOnceWith("/api/events?countryCode=US", {
      method: "GET",
      headers: { Accept: "application/json" },
      signal,
    });
  });

  it("treats an empty event array as a successful search", async () => {
    vi.stubGlobal("fetch", vi.fn<typeof fetch>().mockResolvedValue(jsonResponse(emptyResult)));
    await expect(fetchEventSearch({})).resolves.toEqual(emptyResult);
  });

  it("returns representative normalized events without presentation conversion", async () => {
    vi.stubGlobal("fetch", vi.fn<typeof fetch>().mockResolvedValue(jsonResponse(populatedResult)));
    const result = await fetchEventSearch({ category: "concerts" });
    expect(result).toEqual(populatedResult);
    expect(result.events[0]).toMatchObject({
      id: "ticketmaster:event-1",
      name: "Normalized Event",
      dates: { noSpecificTime: true },
    });
    expect(result.events[0]).not.toHaveProperty("dateLabel");
  });

  it.each([
    [400, "INVALID_SEARCH_PARAMS", "The event search parameters are invalid."],
    [502, "EVENT_PROVIDER_RESPONSE_ERROR", "Event search could not be completed."],
    [503, "EVENT_SERVICE_UNAVAILABLE", "Event search is temporarily unavailable."],
    [500, "INTERNAL_ERROR", "An unexpected error occurred."],
  ])("normalizes the safe public %i error", async (status, code, message) => {
    vi.stubGlobal("fetch", vi.fn<typeof fetch>().mockResolvedValue(jsonResponse({
      error: { code, message, fields: status === 400 ? { keyword: "Invalid search parameter." } : undefined },
    }, status)));

    const error = await fetchEventSearch({}).catch((reason: unknown) => reason);
    expect(error).toBeInstanceOf(EventSearchApiError);
    expect(error).toMatchObject({
      status,
      code,
      message,
      fields: status === 400 ? { keyword: "Invalid search parameter." } : undefined,
    });
  });

  it("fails safely for invalid JSON without exposing the body", async () => {
    vi.stubGlobal("fetch", vi.fn<typeof fetch>().mockResolvedValue(new Response("<html>private</html>")));
    await expect(fetchEventSearch({})).rejects.toMatchObject({
      code: "INVALID_API_RESPONSE",
      message: "Event search returned an invalid response.",
    });
  });

  it("rejects a malformed successful envelope", async () => {
    vi.stubGlobal("fetch", vi.fn<typeof fetch>().mockResolvedValue(jsonResponse({ hello: "world" })));
    await expect(fetchEventSearch({})).rejects.toMatchObject({ code: "INVALID_API_RESPONSE" });
  });

  it("rejects provider-shaped fields in an otherwise normalized envelope", async () => {
    vi.stubGlobal("fetch", vi.fn<typeof fetch>().mockResolvedValue(jsonResponse({
      ...emptyResult,
      _embedded: { events: [] },
    })));
    await expect(fetchEventSearch({})).rejects.toMatchObject({ code: "INVALID_API_RESPONSE" });
  });

  it("rejects a malformed error envelope generically", async () => {
    vi.stubGlobal("fetch", vi.fn<typeof fetch>().mockResolvedValue(jsonResponse({ secret: "raw" }, 502)));
    await expect(fetchEventSearch({})).rejects.toMatchObject({
      status: 502,
      code: "INVALID_API_RESPONSE",
      message: "Event search returned an invalid response.",
    });
  });

  it("preserves native request cancellation", async () => {
    const abortError = new DOMException("Aborted", "AbortError");
    vi.stubGlobal("fetch", vi.fn<typeof fetch>().mockRejectedValue(abortError));
    await expect(fetchEventSearch({}, { signal: new AbortController().signal }))
      .rejects.toBe(abortError);
  });
});
