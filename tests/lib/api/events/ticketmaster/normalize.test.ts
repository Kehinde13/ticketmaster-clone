import { describe, expect, it } from "vitest";

import {
  normalizeTicketmasterEvent,
  normalizeTicketmasterSearchResponse,
} from "@/lib/api/events/ticketmaster/normalize";
import {
  ticketmasterEventSchema,
  ticketmasterSearchResponseSchema,
} from "@/lib/api/events/ticketmaster/schema";

const completeEvent = {
  id: "event-123",
  name: "The Example Tour",
  url: "https://www.ticketmaster.com/example",
  images: [
    {
      url: "https://example.com/image.jpg",
      width: 1024,
      height: 576,
      ratio: "16_9",
      fallback: false,
      attribution: "Example attribution",
    },
  ],
  dates: {
    start: {
      localDate: "2026-10-09",
      localTime: "20:00:00",
      dateTime: "2026-10-10T01:00:00Z",
      dateTBD: false,
      dateTBA: false,
      timeTBA: false,
      noSpecificTime: false,
    },
    timezone: "America/Chicago",
    status: { code: "onsale" },
    spanMultipleDays: false,
  },
  classifications: [
    {
      primary: true,
      segment: { id: "music-id", name: "Music" },
      genre: { id: "rock-id", name: "Rock" },
      subGenre: { id: "alternative-id", name: "Alternative Rock" },
    },
  ],
  priceRanges: [
    { type: "standard", currency: "usd", min: 45, max: 120 },
  ],
  _embedded: {
    venues: [
      {
        id: "venue-123",
        name: "Example Arena",
        address: { line1: "100 Main Street" },
        city: { name: "Chicago" },
        state: { name: "Illinois", stateCode: "IL" },
        country: { name: "United States", countryCode: "US" },
        postalCode: "60601",
        timezone: "America/Chicago",
        location: { latitude: "41.8781", longitude: "-87.6298" },
      },
    ],
  },
};

describe("Ticketmaster normalization", () => {
  it("normalizes a complete event without retaining raw response data", () => {
    const event = normalizeTicketmasterEvent(
      ticketmasterEventSchema.parse(completeEvent),
    );

    expect(event).toMatchObject({
      id: "ticketmaster:event-123",
      provider: "ticketmaster",
      providerEventId: "event-123",
      name: "The Example Tour",
      url: "https://www.ticketmaster.com/example",
      status: "onsale",
      priceRange: {
        type: "standard",
        currency: "USD",
        min: 45,
        max: 120,
      },
      classification: {
        segment: { providerId: "music-id", name: "Music" },
        genre: { providerId: "rock-id", name: "Rock" },
        subGenre: {
          providerId: "alternative-id",
          name: "Alternative Rock",
        },
      },
    });
    expect(event.images).toEqual([
      {
        url: "https://example.com/image.jpg",
        width: 1024,
        height: 576,
        ratio: "16:9",
        fallback: false,
        attribution: "Example attribution",
      },
    ]);
    expect(event.venue?.location).toMatchObject({
      addressLines: ["100 Main Street"],
      city: "Chicago",
      latitude: 41.8781,
      longitude: -87.6298,
    });
    expect(event).not.toHaveProperty("_embedded");
  });

  it("normalizes a sparse valid event with deliberate nulls", () => {
    const event = normalizeTicketmasterEvent(
      ticketmasterEventSchema.parse({ id: "sparse-1", name: "Sparse Event" }),
    );

    expect(event.images).toEqual([]);
    expect(event.url).toBeNull();
    expect(event.venue).toBeNull();
    expect(event.classification).toBeNull();
    expect(event.priceRange).toBeNull();
    expect(event.status).toBeNull();
    expect(event.dates).toEqual({
      start: { localDate: null, localTime: null, utcDateTime: null },
      end: null,
      timezone: null,
      dateTbd: false,
      dateTba: false,
      timeTba: false,
      noSpecificTime: false,
      endApproximate: false,
      spansMultipleDays: false,
    });
  });

  it("preserves uncertain dates and sanitizes invalid optional values", () => {
    const event = normalizeTicketmasterEvent(
      ticketmasterEventSchema.parse({
        id: "uncertain-1",
        name: "Uncertain Event",
        url: "not-a-url",
        dates: {
          start: {
            localDate: "2027-01-01",
            dateTBD: true,
            timeTBA: true,
            noSpecificTime: true,
          },
          status: { code: "future-status" },
        },
        priceRanges: [
          { type: "standard", currency: "USD", min: "invalid", max: 50 },
        ],
        _embedded: {
          venues: [
            {
              name: "Somewhere",
              location: { latitude: "NaN", longitude: "Infinity" },
            },
          ],
        },
      }),
    );

    expect(event.dates.start.utcDateTime).toBeNull();
    expect(event.dates).toMatchObject({
      dateTbd: true,
      timeTba: true,
      noSpecificTime: true,
    });
    expect(event.url).toBeNull();
    expect(event.status).toBeNull();
    expect(event.priceRange).toBeNull();
    expect(event.venue?.location.latitude).toBeNull();
    expect(event.venue?.location.longitude).toBeNull();
  });

  it("normalizes pagination and a successful empty response", () => {
    const response = ticketmasterSearchResponseSchema.parse({
      page: { size: 20, totalElements: 0, totalPages: 0, number: 0 },
    });

    expect(normalizeTicketmasterSearchResponse(response)).toEqual({
      events: [],
      pagination: {
        page: 0,
        size: 20,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
      },
    });
  });
});
