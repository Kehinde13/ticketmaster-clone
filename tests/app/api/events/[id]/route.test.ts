// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

import { GET } from "@/app/api/events/[id]/route";
import { getEventProvider } from "@/lib/api/events";
import type { EventProvider } from "@/lib/api/events/provider";
import { createEventId, parseEventId, type Event } from "@/types/event";

vi.mock("@/lib/api/events", () => ({ getEventProvider: vi.fn() }));

const getEventById = vi.fn<EventProvider["getEventById"]>();
const event: Event = {
  id: "ticketmaster:event-123",
  provider: "ticketmaster",
  providerEventId: "event-123",
  name: "Example Concert",
  url: "https://www.ticketmaster.com/example/event/event-123",
  images: [{
    url: "https://example.com/event.jpg", width: 1024, height: 576,
    ratio: "16:9", fallback: false, attribution: null,
  }],
  dates: {
    start: { localDate: "2026-10-09", localTime: "20:00:00", utcDateTime: "2026-10-10T01:00:00Z" },
    end: null, timezone: "America/Chicago", dateTbd: false, dateTba: false,
    timeTba: false, noSpecificTime: false, endApproximate: false, spansMultipleDays: false,
  },
  venue: {
    id: "venue-123", name: "Example Arena", timezone: "America/Chicago",
    location: {
      addressLines: ["100 Main Street"], city: "Chicago", state: "Illinois",
      stateCode: "IL", country: "United States", countryCode: "US",
      postalCode: "60601", latitude: 41.8781, longitude: -87.6298,
    },
  },
  classification: {
    segment: { providerId: "music", name: "Music" },
    genre: { providerId: "rock", name: "Rock" }, subGenre: null,
  },
  priceRange: { type: "standard", currency: "USD", min: 45, max: 120 },
  status: "onsale",
};

function request(id: string, path = encodeURIComponent(id)) {
  return GET(new Request(`http://localhost/api/events/${path}`), {
    // Next.js supplies already-decoded asynchronous route parameters.
    params: Promise.resolve({ id }),
  });
}

beforeEach(() => {
  vi.resetAllMocks();
  getEventById.mockResolvedValue(event);
  vi.mocked(getEventProvider).mockReturnValue({
    getEventById, searchEvents: vi.fn<EventProvider["searchEvents"]>(),
  });
});

describe("GET /api/events/[id]", () => {
  it.each(["ticketmaster:event-123", "ticketmaster%3Aevent-123"])(
    "returns the complete normalized event for path %s", async (path) => {
      const response = await request("ticketmaster:event-123", path);
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain("application/json");
      expect(response.headers.get("cache-control")).toBe("no-store");
      expect(await response.json()).toEqual({ event });
      expect(getEventProvider).toHaveBeenCalledExactlyOnceWith("ticketmaster");
      expect(getEventById).toHaveBeenCalledExactlyOnceWith("event-123");
    },
  );

  it.each(["abc_123-XYZ.~", "event:part/one?x=1&y=2", "event%2Fpart", "event%ZZ"])(
    "preserves opaque provider ID %s without double decoding", async (providerEventId) => {
      const id = createEventId("ticketmaster", providerEventId);
      expect(parseEventId(id)).toEqual({ provider: "ticketmaster", providerEventId });
      expect((await request(id)).status).toBe(200);
      expect(getEventById).toHaveBeenCalledExactlyOnceWith(providerEventId);
    },
  );

  it("accepts an ID at the 512-character boundary", async () => {
    const providerEventId = "a".repeat(499);
    expect((await request(createEventId("ticketmaster", providerEventId))).status).toBe(200);
    expect(getEventById).toHaveBeenCalledWith(providerEventId);
  });

  it.each([
    "", "event-123", "unknown:event-123", "ticketmaster:", ":event-123",
    "Ticketmaster:event-123", " ticketmaster:event-123", "ticketmaster: ",
    "ticketmaster:event 123", "ticketmaster:event\n123", "ticketmaster:event\u0000123",
    "ticketmaster:event\\123", "ticketmaster:\ud800", "ticketmaster%3Aevent-123",
    `ticketmaster:${"a".repeat(500)}`,
  ])("rejects invalid ID %j before constructing a provider", async (id) => {
    // Fixed path permits testing malformed decoded input, including lone surrogates.
    const response = await request(id, "invalid");
    expect(response.status).toBe(400);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await response.json()).toEqual({ error: {
      code: "INVALID_EVENT_ID", message: "The event ID is invalid.",
    } });
    expect(getEventProvider).not.toHaveBeenCalled();
    expect(getEventById).not.toHaveBeenCalled();
  });

  it.each([null, undefined, 123, {}])("safely rejects non-string parser input %j", (id) => {
    expect(parseEventId(id)).toBeNull();
  });

  it("preserves legitimate nullable metadata", async () => {
    const sparse: Event = {
      ...event, venue: null, priceRange: null, classification: null, images: [], url: null,
    };
    getEventById.mockResolvedValue(sparse);
    const response = await request(event.id);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ event: sparse });
  });

  it("returns 404 when the provider returns null", async () => {
    getEventById.mockResolvedValue(null);
    const response = await request(event.id);
    expect(response.status).toBe(404);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await response.json()).toEqual({ error: {
      code: "EVENT_NOT_FOUND", message: "The event was not found.",
    } });
  });

  it.each([
    ["configuration", 503, "EVENT_SERVICE_UNAVAILABLE", "Event details are temporarily unavailable."],
    ["unauthorized", 503, "EVENT_SERVICE_UNAVAILABLE", "Event details are temporarily unavailable."],
    ["rate_limit", 503, "EVENT_SERVICE_UNAVAILABLE", "Event details are temporarily unavailable."],
    ["network", 503, "EVENT_SERVICE_UNAVAILABLE", "Event details are temporarily unavailable."],
    ["invalid_response", 502, "EVENT_PROVIDER_RESPONSE_ERROR", "Event details could not be retrieved."],
    ["provider_error", 502, "EVENT_PROVIDER_RESPONSE_ERROR", "Event details could not be retrieved."],
    ["not_found", 404, "EVENT_NOT_FOUND", "The event was not found."],
  ])("maps %s without leaking internal details", async (code, status, publicCode, message) => {
    const secret = "TEST_SECRET_DO_NOT_EXPOSE";
    getEventById.mockRejectedValue(Object.assign(new Error(`https://example.com?apikey=${secret}`), {
      code, status: 401, cause: { secret }, stack: `C:/private/server.ts ${secret}`,
    }));
    const response = await request(event.id);
    expect(response.status).toBe(status);
    expect(response.headers.get("cache-control")).toBe("no-store");
    const body = await response.json();
    expect(body).toEqual({ error: { code: publicCode, message } });
    expect(JSON.stringify(body)).not.toMatch(/TEST_SECRET|apikey|cause|stack|private|https:/);
  });

  it("catches missing configuration during provider construction", async () => {
    vi.mocked(getEventProvider).mockImplementation(() => {
      throw Object.assign(new Error("TICKETMASTER_API_KEY missing"), { code: "configuration" });
    });
    const response = await request(event.id);
    expect(response.status).toBe(503);
    expect(await response.text()).not.toContain("TICKETMASTER_API_KEY");
    expect(getEventById).not.toHaveBeenCalled();
  });

  it.each([new Error("TEST_SECRET_DO_NOT_EXPOSE"), null, "TEST_SECRET_DO_NOT_EXPOSE"])(
    "returns safe 500 for unexpected exceptions", async (error) => {
      getEventById.mockRejectedValue(error);
      const response = await request(event.id);
      expect(response.status).toBe(500);
      expect(response.headers.get("cache-control")).toBe("no-store");
      expect(await response.json()).toEqual({ error: {
        code: "INTERNAL_ERROR", message: "An unexpected error occurred.",
      } });
    },
  );
});
