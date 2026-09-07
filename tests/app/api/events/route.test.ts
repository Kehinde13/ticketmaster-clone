// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

import { GET } from "@/app/api/events/route";
import { getEventProvider } from "@/lib/api/events";
import type { EventProvider } from "@/lib/api/events/provider";
import type { EventSearchResult } from "@/types/event";

vi.mock("@/lib/api/events", () => ({ getEventProvider: vi.fn() }));

const searchEvents = vi.fn<EventProvider["searchEvents"]>();
const emptyResult: EventSearchResult = {
  events: [],
  pagination: { page: 0, size: 20, totalItems: 0, totalPages: 0, hasNextPage: false },
};
const request = (query = "") => GET(new Request(`http://localhost/api/events?${query}`));

beforeEach(() => {
  vi.resetAllMocks();
  searchEvents.mockResolvedValue(emptyResult);
  vi.mocked(getEventProvider).mockReturnValue({
    searchEvents, getEventById: vi.fn<EventProvider["getEventById"]>(),
  });
});

describe("GET /api/events", () => {
  it("returns normalized events and pagination with explicit freshness headers", async () => {
    const result: EventSearchResult = {
      events: [{
        id: "ticketmaster:example", provider: "ticketmaster", providerEventId: "example",
        name: "Example Concert", url: null, images: [], venue: null,
        classification: null, priceRange: null, status: null,
        dates: {
          start: { localDate: null, localTime: null, utcDateTime: null },
          end: null, timezone: null, dateTbd: false, dateTba: false,
          timeTba: false, noSpecificTime: false, endApproximate: false, spansMultipleDays: false,
        },
      }],
      pagination: { page: 0, size: 20, totalItems: 1, totalPages: 1, hasNextPage: false },
    };
    searchEvents.mockResolvedValue(result);
    const response = await request("countryCode=us");
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("content-type")).toContain("application/json");
    expect(await response.json()).toEqual(result);
    expect(searchEvents).toHaveBeenCalledExactlyOnceWith({ countryCode: "US", page: 0, pageSize: 20 });
  });

  it("returns empty searches as HTTP 200 and supplies defaults", async () => {
    const response = await request();
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(emptyResult);
    expect(searchEvents).toHaveBeenCalledExactlyOnceWith({ page: 0, pageSize: 20 });
  });

  it.each([" Coldplay ", "Arts & Theater", "100% live %26"])("preserves decoded keyword %s", async (keyword) => {
    const response = await request(new URLSearchParams({ keyword }).toString());
    expect(response.status).toBe(200);
    expect(searchEvents).toHaveBeenCalledWith(expect.objectContaining({ keyword: keyword.trim() }));
  });

  it("constructs nested location and classification and normalizes date offsets", async () => {
    const response = await request(new URLSearchParams({
      city: " Miami ", stateCode: "fl", postalCode: " 33101 ", countryCode: "us",
      latitude: "25.76", longitude: "-80.19", radius: "25", radiusUnit: "km",
      category: "concerts", segment: " Music ", genre: " Rock ", subGenre: " Alternative ",
      startDateTime: "2026-10-01T01:00:00+01:00", endDateTime: "2026-10-02T00:00:00Z",
      page: "2", pageSize: "25",
    }).toString());
    expect(response.status).toBe(200);
    expect(searchEvents).toHaveBeenCalledExactlyOnceWith({
      countryCode: "US", category: "concerts", page: 2, pageSize: 25,
      startDateTime: "2026-10-01T00:00:00Z", endDateTime: "2026-10-02T00:00:00Z",
      location: { city: "Miami", stateCode: "FL", postalCode: "33101", latitude: 25.76,
        longitude: -80.19, radius: { value: 25, unit: "km" } },
      classification: { segment: "Music", genre: "Rock", subGenre: "Alternative" },
    });
  });

  it.each([
    ["countryCode=gb&city=London&stateCode=England", { city: "London", stateCode: "ENGLAND" }],
    ["latitude=0&longitude=0&radius=1", { latitude: 0, longitude: 0, radius: { value: 1, unit: "miles" } }],
    ["latitude=-90&longitude=180", { latitude: -90, longitude: 180 }],
  ])("accepts valid location %s", async (query, location) => {
    expect((await request(query)).status).toBe(200);
    expect(searchEvents).toHaveBeenCalledWith(expect.objectContaining({ location: expect.objectContaining(location) }));
  });

  it.each(["page=49&pageSize=20", "page=4&pageSize=200", "page=999&pageSize=1"])("accepts final retrievable pages %s", async (query) => {
    expect((await request(query)).status).toBe(200);
  });

  it.each([
    "keyword=", "keyword=%20", `keyword=${"x".repeat(201)}`,
    `city=${"x".repeat(101)}`, `stateCode=${"x".repeat(21)}`, `postalCode=${"x".repeat(21)}`,
    `segment=${"x".repeat(101)}`, `genre=${"x".repeat(101)}`, `subGenre=${"x".repeat(101)}`,
    "countryCode=USA", "countryCode=1", "countryCode=U", "countryCode=12",
    "page=-1", "page=abc", "page=1.5", "page=", "page=1e2", "page=0x10",
    "pageSize=0", "pageSize=999999", "pageSize=201", "pageSize=Infinity",
    "page=50&pageSize=20", "page=5&pageSize=200", "page=1000&pageSize=1",
    "latitude=91&longitude=0", "latitude=-91&longitude=0", "latitude=0&longitude=181",
    "latitude=0&longitude=-181", "latitude=0", "longitude=0", "latitude=&longitude=0",
    "latitude=NaN&longitude=0", "latitude=Infinity&longitude=0",
    "radius=25", "radiusUnit=km", "latitude=0&longitude=0&radius=0",
    "latitude=0&longitude=0&radius=-1", "latitude=0&longitude=0&radius=NaN",
    "latitude=0&longitude=0&radius=Infinity", "latitude=0&longitude=0&radius=1001",
    "latitude=0&longitude=0&radius=1&radiusUnit=meters",
    "startDateTime=tomorrow", "startDateTime=2026-02-30T00:00:00Z",
    "startDateTime=2026-10-01", "startDateTime=2026-10-01T00:00:00",
    "startDateTime=2026-10-02T00:00:00Z&endDateTime=2026-10-01T00:00:00Z",
    "startDateTime=2026-10-01T00:00:00.100Z&endDateTime=2026-10-01T00:00:00Z",
    "category=unknown", "category=concerts&segment=Sports",
    "page=0&page=2", "countryCode=US&countryCode=US", "keyword=a&keyword=b",
    "totallyUnknown=value", "country=US", "pagesize=20", "apikey=TEST_SECRET_DO_NOT_EXPOSE",
    "__proto__=polluted",
  ])("rejects invalid input without constructing or invoking a provider: %s", async (query) => {
    const response = await request(query);
    expect(response.status).toBe(400);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await response.json()).toMatchObject({ error: {
      code: "INVALID_SEARCH_PARAMS", message: "The event search parameters are invalid.",
    } });
    expect(getEventProvider).not.toHaveBeenCalled();
    expect(searchEvents).not.toHaveBeenCalled();
  });

  it("returns concise field errors without echoing unknown keys or supplied values", async () => {
    const response = await request("page=TEST_SECRET_DO_NOT_EXPOSE&TEST_SECRET_DO_NOT_EXPOSE=x");
    expect(await response.json()).toEqual({ error: {
      code: "INVALID_SEARCH_PARAMS", message: "The event search parameters are invalid.",
      fields: { query: "Invalid search parameter." },
    } });
  });

  it.each([
    ["configuration", 503, "EVENT_SERVICE_UNAVAILABLE"],
    ["unauthorized", 503, "EVENT_SERVICE_UNAVAILABLE"],
    ["rate_limit", 503, "EVENT_SERVICE_UNAVAILABLE"],
    ["network", 503, "EVENT_SERVICE_UNAVAILABLE"],
    ["invalid_response", 502, "EVENT_PROVIDER_RESPONSE_ERROR"],
    ["provider_error", 502, "EVENT_PROVIDER_RESPONSE_ERROR"],
    ["not_found", 502, "EVENT_PROVIDER_RESPONSE_ERROR"],
    ["unexpected", 500, "INTERNAL_ERROR"],
  ])("maps %s safely", async (code, status, publicCode) => {
    const secret = "TEST_SECRET_DO_NOT_EXPOSE";
    const error = Object.assign(new Error(`https://example.com?apikey=${secret}`), {
      code, status: 401, cause: { secret, _embedded: {}, _links: {} }, stack: secret,
    });
    searchEvents.mockRejectedValue(error);
    const response = await request();
    expect(response.status).toBe(status);
    expect(response.headers.get("cache-control")).toBe("no-store");
    const body = await response.json();
    expect(body).toEqual({ error: {
      code: publicCode,
      message: status === 503 ? "Event search is temporarily unavailable." :
        status === 502 ? "Event search could not be completed." : "An unexpected error occurred.",
    } });
    expect(JSON.stringify(body)).not.toMatch(/TEST_SECRET|apikey|cause|stack|_embedded|_links/);
  });

  it("handles missing configuration during construction as service unavailable", async () => {
    vi.mocked(getEventProvider).mockImplementation(() => {
      throw Object.assign(new Error("TICKETMASTER_API_KEY is missing"), { code: "configuration" });
    });
    const response = await request();
    expect(response.status).toBe(503);
    expect(await response.text()).not.toContain("TICKETMASTER_API_KEY");
    expect(searchEvents).not.toHaveBeenCalled();
  });

  it.each([new Error("Internal stack detail"), null, "Internal error"])("handles unexpected exceptions safely", async (error) => {
    searchEvents.mockRejectedValue(error);
    const response = await request();
    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({ error: {
      code: "INTERNAL_ERROR", message: "An unexpected error occurred.",
    } });
  });
});
