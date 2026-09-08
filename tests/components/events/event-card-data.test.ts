import { describe, expect, it } from "vitest";

import { toEventCardData } from "@/components/events/event-card-data";
import type { Event } from "@/types/event";

function event(overrides: Partial<Event> = {}): Event {
  return {
    id: "ticketmaster:event-1",
    provider: "ticketmaster",
    providerEventId: "event-1",
    name: "The Example Tour",
    url: null,
    images: [],
    dates: {
      start: { localDate: "2026-09-12", localTime: "20:30:00", utcDateTime: null },
      end: null,
      timezone: "America/New_York",
      dateTbd: false,
      dateTba: false,
      timeTba: false,
      noSpecificTime: false,
      endApproximate: false,
      spansMultipleDays: false,
    },
    venue: {
      id: "venue-1",
      name: "Example Arena",
      timezone: "America/New_York",
      location: {
        addressLines: [], city: "New York", state: "New York", stateCode: "NY",
        country: "United States", countryCode: "US", postalCode: null,
        latitude: null, longitude: null,
      },
    },
    classification: {
      segment: { providerId: null, name: "Music" },
      genre: { providerId: null, name: "Rock" },
      subGenre: { providerId: null, name: "Alternative Rock" },
    },
    priceRange: null,
    status: "onsale",
    ...overrides,
  };
}

describe("toEventCardData", () => {
  it("maps complete normalized event identity and presentation fields", () => {
    expect(toEventCardData(event(), "concerts")).toEqual({
      id: "ticketmaster:event-1",
      name: "The Example Tour",
      dateLabel: "SAT, SEP 12 • 8:30 PM",
      venue: "Example Arena",
      location: "New York, NY",
      category: "Alternative Rock",
      image: null,
    });
  });

  it("keeps a date-only value stable and does not fabricate a time", () => {
    const mapped = toEventCardData(event({
      dates: { ...event().dates, start: { localDate: "2026-01-01", localTime: null, utcDateTime: null } },
    }), "concerts");
    expect(mapped.dateLabel).toBe("THU, JAN 1");
  });

  it("renders deliberate TBD date and time labels", () => {
    expect(toEventCardData(event({ dates: { ...event().dates, timeTba: true } }), "concerts").dateLabel)
      .toBe("SAT, SEP 12 • TIME TBA");
    expect(toEventCardData(event({ dates: { ...event().dates, dateTbd: true } }), "concerts").dateLabel)
      .toBe("DATE TBA");
  });

  it("uses safe venue, location, and category fallbacks without dangling punctuation", () => {
    const partialVenue = event().venue;
    expect(partialVenue).not.toBeNull();
    if (!partialVenue) throw new Error("Fixture venue is required.");
    const mapped = toEventCardData(event({
      venue: { ...partialVenue, name: "", location: { ...partialVenue.location, city: "Austin", state: null, stateCode: null } },
      classification: null,
    }), "concerts");
    expect(mapped.venue).toBe("Venue TBA");
    expect(mapped.location).toBe("Austin");
    expect(mapped.category).toBe("Concerts");
  });

  it.each([
    ["concerts", "Concerts"],
    ["sports", "Sports"],
    ["arts-theater-comedy", "Arts, Theater & Comedy"],
    ["family", "Family"],
  ] as const)("uses the %s row label when classification is missing", (category, label) => {
    expect(toEventCardData(event({ classification: null }), category).category).toBe(label);
  });

  it("maps only the selected normalized image into presentation data", () => {
    const mapped = toEventCardData(event({
      images: [
        { url: "https://s1.ticketm.net/dam/wide.jpg", width: 1136, height: 639, ratio: "16:9", fallback: false, attribution: null },
        { url: "https://s1.ticketm.net/dam/card.jpg", width: 640, height: 427, ratio: "3:2", fallback: false, attribution: "Provider" },
      ],
    }), "concerts");

    expect(mapped.image).toEqual({
      src: "https://s1.ticketm.net/dam/card.jpg",
      alt: "The Example Tour",
      width: 640,
      height: 427,
    });
  });

  it("maps missing normalized images to null", () => {
    expect(toEventCardData(event({ images: [] }), "concerts").image).toBeNull();
  });
});
