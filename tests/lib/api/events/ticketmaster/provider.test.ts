import { describe, expect, it, vi } from "vitest";

import { createTicketmasterEventProvider } from "@/lib/api/events/ticketmaster/provider";

const fakeApiKey = "test-api-key";

function searchResponse(events: unknown[] = []) {
  return {
    _embedded: events.length ? { events } : undefined,
    page: {
      size: 25,
      totalElements: events.length,
      totalPages: events.length ? 1 : 0,
      number: 0,
    },
  };
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function nextResponse(responses: Response[]) {
  const response = responses.shift();
  if (!response) throw new Error("Test response queue is empty.");
  return response;
}

describe("Ticketmaster event provider", () => {
  it("maps supported search parameters explicitly and URL-encodes values", async () => {
    let requestedUrl = "";
    const fetchImpl: typeof fetch = async (input) => {
      requestedUrl = String(input);
      return jsonResponse(searchResponse());
    };
    const provider = createTicketmasterEventProvider({
      apiKey: fakeApiKey,
      fetchImpl,
    });

    await provider.searchEvents({
      keyword: "rock & roll",
      countryCode: "us",
      location: {
        city: "New York",
        stateCode: "ny",
        postalCode: "10001",
        latitude: 40.7128,
        longitude: -74.006,
        radius: { value: 25, unit: "miles" },
      },
      startDateTime: "2026-10-01T00:00:00Z",
      endDateTime: "2026-11-01T00:00:00Z",
      category: "arts-theater-comedy",
      classification: { genre: "Comedy" },
      page: 0,
      pageSize: 25,
    });

    const url = new URL(requestedUrl);
    expect(`${url.origin}${url.pathname}`).toBe(
      "https://app.ticketmaster.com/discovery/v2/events.json",
    );
    expect(Object.fromEntries(url.searchParams)).toMatchObject({
      apikey: fakeApiKey,
      keyword: "rock & roll",
      countryCode: "US",
      city: "New York",
      stateCode: "NY",
      postalCode: "10001",
      geoPoint: "dr5regw3p",
      radius: "25",
      unit: "miles",
      startDateTime: "2026-10-01T00:00:00Z",
      endDateTime: "2026-11-01T00:00:00Z",
      segmentName: "Arts & Theatre",
      page: "0",
      size: "25",
    });
    expect(url.searchParams.getAll("classificationName")).toEqual(["Comedy"]);
  });

  it.each([
    ["concerts", "segmentName", "Music"],
    ["sports", "segmentName", "Sports"],
    ["arts-theater-comedy", "segmentName", "Arts & Theatre"],
    ["family", "includeFamily", "only"],
  ] as const)("maps the %s application category", async (category, key, value) => {
    let requestedUrl = "";
    const provider = createTicketmasterEventProvider({
      apiKey: fakeApiKey,
      fetchImpl: async (input) => {
        requestedUrl = String(input);
        return jsonResponse(searchResponse());
      },
    });

    await provider.searchEvents({ category });

    expect(new URL(requestedUrl).searchParams.get(key)).toBe(value);
  });

  it("normalizes search results and successful empty searches", async () => {
    const responses = [
      jsonResponse(
        searchResponse([{ id: "event-1", name: "Normalized Event" }]),
      ),
      jsonResponse(searchResponse()),
    ];
    const provider = createTicketmasterEventProvider({
      apiKey: fakeApiKey,
      fetchImpl: async () => nextResponse(responses),
    });

    const populated = await provider.searchEvents({ pageSize: 25 });
    const empty = await provider.searchEvents({ pageSize: 25 });

    expect(populated.events[0]).toMatchObject({
      id: "ticketmaster:event-1",
      providerEventId: "event-1",
    });
    expect(empty.events).toEqual([]);
    expect(empty.pagination.totalItems).toBe(0);
  });

  it("encodes detail ids, normalizes sparse details, and returns null for 404", async () => {
    const requestedUrls: string[] = [];
    const responses = [
      jsonResponse({ id: "id/with spaces?", name: "Sparse Detail" }),
      jsonResponse({}, 404),
    ];
    const provider = createTicketmasterEventProvider({
      apiKey: fakeApiKey,
      fetchImpl: async (input) => {
        requestedUrls.push(String(input));
        return nextResponse(responses);
      },
    });

    const event = await provider.getEventById("id/with spaces?");
    const missing = await provider.getEventById("missing");

    expect(new URL(requestedUrls[0]).pathname).toBe(
      "/discovery/v2/events/id%2Fwith%20spaces%3F.json",
    );
    expect(event).toMatchObject({
      providerEventId: "id/with spaces?",
      images: [],
      venue: null,
      priceRange: null,
    });
    expect(missing).toBeNull();
  });

  it.each([
    [401, "unauthorized"],
    [403, "unauthorized"],
    [429, "rate_limit"],
    [500, "provider_error"],
  ])("maps HTTP %s to %s", async (status, code) => {
    const provider = createTicketmasterEventProvider({
      apiKey: fakeApiKey,
      fetchImpl: async () => jsonResponse({}, status),
    });

    await expect(provider.searchEvents({})).rejects.toMatchObject({
      code,
      status,
    });
  });

  it("maps network, invalid JSON, and schema failures safely", async () => {
    const networkProvider = createTicketmasterEventProvider({
      apiKey: fakeApiKey,
      fetchImpl: async () => {
        throw new Error("socket failed");
      },
    });
    const invalidJsonProvider = createTicketmasterEventProvider({
      apiKey: fakeApiKey,
      fetchImpl: async () => new Response("not json"),
    });
    const invalidSchemaProvider = createTicketmasterEventProvider({
      apiKey: fakeApiKey,
      fetchImpl: async () => jsonResponse({ unexpected: true }),
    });

    await expect(networkProvider.searchEvents({})).rejects.toMatchObject({
      code: "network",
      message: "Ticketmaster request failed.",
    });
    await expect(invalidJsonProvider.searchEvents({})).rejects.toMatchObject({
      code: "invalid_response",
    });
    await expect(invalidSchemaProvider.searchEvents({})).rejects.toMatchObject({
      code: "invalid_response",
    });
  });

  it("fails safely when configuration is missing or a request times out", async () => {
    expect(() =>
      createTicketmasterEventProvider({ apiKey: "" }),
    ).toThrowError(
      expect.objectContaining({ code: "configuration", status: null }),
    );

    const fetchImpl: typeof fetch = (_input, init) =>
      new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener(
          "abort",
          () => reject(init.signal?.reason),
          { once: true },
        );
      });
    const provider = createTicketmasterEventProvider({
      apiKey: fakeApiKey,
      fetchImpl,
      timeoutMs: 1,
    });

    await expect(provider.searchEvents({})).rejects.toMatchObject({
      code: "network",
      message: "Ticketmaster request timed out.",
    });
  });

  it("maps a timeout while reading the response body to a network error", async () => {
    const provider = createTicketmasterEventProvider({
      apiKey: fakeApiKey,
      timeoutMs: 10,
      fetchImpl: async (_input, init) =>
        new Response(new ReadableStream({
          start(controller) {
            init?.signal?.addEventListener("abort", () => {
              controller.error(init.signal?.reason);
            }, { once: true });
          },
        })),
    });

    await expect(provider.searchEvents({})).rejects.toMatchObject({
      code: "network",
      message: "Ticketmaster request timed out.",
    });
  });

  it.each([
    { keyword: "" },
    { page: -1 },
    { pageSize: 201 },
    { page: 50, pageSize: 20 },
    { location: { latitude: 91, longitude: 0 } },
    { location: { latitude: 0 } },
    { location: { radius: { value: -1, unit: "miles" as const } } },
    {
      startDateTime: "2026-11-01T00:00:00Z",
      endDateTime: "2026-10-01T00:00:00Z",
    },
    {
      category: "concerts" as const,
      classification: { segment: "Sports" },
    },
  ])("rejects invalid search input before fetching: %#", async (params) => {
    const fetchImpl = vi.fn<typeof fetch>();
    const provider = createTicketmasterEventProvider({
      apiKey: fakeApiKey,
      fetchImpl,
    });

    await expect(provider.searchEvents(params)).rejects.toMatchObject({
      code: "provider_error",
    });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("rejects malformed event details", async () => {
    const provider = createTicketmasterEventProvider({
      apiKey: fakeApiKey,
      fetchImpl: async () => jsonResponse({ id: "missing-name" }),
    });

    await expect(provider.getEventById("missing-name")).rejects.toMatchObject({
      code: "invalid_response",
    });
  });
});
