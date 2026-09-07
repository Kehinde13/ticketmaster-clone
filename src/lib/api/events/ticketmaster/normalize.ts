import type {
  Event,
  EventClassification,
  EventClassificationLevel,
  EventDateTime,
  EventImage,
  EventImageRatio,
  EventPriceRange,
  EventStatus,
  EventVenue,
  EventSearchResult,
} from "@/types/event";
import { createEventId } from "@/types/event";

import type {
  TicketmasterEvent,
  TicketmasterSearchResponse,
} from "./schema";

function normalizeUrl(value: string | undefined): string | null {
  if (!value || !URL.canParse(value)) {
    return null;
  }

  const url = new URL(value);
  return url.protocol === "http:" || url.protocol === "https:"
    ? url.toString()
    : null;
}

function normalizeCoordinate(
  value: string | number | undefined,
  min: number,
  max: number,
): number | null {
  if (value === undefined || value === "") {
    return null;
  }

  const coordinate = typeof value === "number" ? value : Number(value);
  return Number.isFinite(coordinate) && coordinate >= min && coordinate <= max
    ? coordinate
    : null;
}

function normalizeDateTime(
  value:
    | {
        localDate?: string;
        localTime?: string;
        dateTime?: string;
      }
    | undefined,
): EventDateTime {
  return {
    localDate: value?.localDate ?? null,
    localTime: value?.localTime ?? null,
    utcDateTime: value?.dateTime ?? null,
  };
}

function normalizeImageRatio(value: string | undefined): EventImageRatio {
  if (value === "16_9") return "16:9";
  if (value === "3_2") return "3:2";
  if (value === "4_3") return "4:3";
  return "other";
}

function normalizeImages(images: TicketmasterEvent["images"]): EventImage[] {
  return (images ?? []).flatMap((image) => {
    const url = normalizeUrl(image.url);
    if (!url) return [];

    return [
      {
        url,
        width: image.width ?? null,
        height: image.height ?? null,
        ratio: normalizeImageRatio(image.ratio),
        fallback: image.fallback ?? false,
        attribution: image.attribution ?? null,
      },
    ];
  });
}

function normalizeVenue(event: TicketmasterEvent): EventVenue | null {
  const venue = event._embedded?.venues?.[0];
  if (!venue) return null;

  return {
    id: venue.id ?? null,
    name: venue.name,
    timezone: venue.timezone ?? null,
    location: {
      addressLines: [
        venue.address?.line1,
        venue.address?.line2,
        venue.address?.line3,
      ].filter((line): line is string => Boolean(line)),
      city: venue.city?.name ?? null,
      state: venue.state?.name ?? null,
      stateCode: venue.state?.stateCode ?? null,
      country: venue.country?.name ?? null,
      countryCode: venue.country?.countryCode ?? null,
      postalCode: venue.postalCode ?? null,
      latitude: normalizeCoordinate(
        venue.location?.latitude,
        -90,
        90,
      ),
      longitude: normalizeCoordinate(
        venue.location?.longitude,
        -180,
        180,
      ),
    },
  };
}

function normalizeClassificationLevel(
  level: { id?: string; name: string } | undefined,
): EventClassificationLevel | null {
  return level
    ? {
        providerId: level.id ?? null,
        name: level.name,
      }
    : null;
}

function normalizeClassification(
  event: TicketmasterEvent,
): EventClassification | null {
  const classifications = event.classifications ?? [];
  const classification =
    classifications.find((candidate) => candidate.primary) ??
    classifications[0];

  if (!classification) return null;

  return {
    segment: normalizeClassificationLevel(classification.segment),
    genre: normalizeClassificationLevel(classification.genre),
    subGenre: normalizeClassificationLevel(classification.subGenre),
  };
}

function finiteNumber(value: string | number | undefined): number | null {
  if (value === undefined || value === "") return null;
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) ? number : null;
}

function normalizePriceRange(
  event: TicketmasterEvent,
): EventPriceRange | null {
  for (const range of event.priceRanges ?? []) {
    const min = finiteNumber(range.min);
    const max = finiteNumber(range.max);
    const currency = range.currency?.toUpperCase();

    if (
      min !== null &&
      max !== null &&
      min >= 0 &&
      max >= min &&
      currency
    ) {
      return {
        type: range.type?.toLowerCase() === "standard" ? "standard" : "other",
        currency,
        min,
        max,
      };
    }
  }

  return null;
}

function normalizeStatus(event: TicketmasterEvent): EventStatus | null {
  const status = event.dates?.status?.code;
  if (
    status === "onsale" ||
    status === "offsale" ||
    status === "canceled" ||
    status === "postponed" ||
    status === "rescheduled"
  ) {
    return status;
  }

  return null;
}

export function normalizeTicketmasterEvent(event: TicketmasterEvent): Event {
  const start = event.dates?.start;

  return {
    id: createEventId("ticketmaster", event.id),
    provider: "ticketmaster",
    providerEventId: event.id,
    name: event.name,
    url: normalizeUrl(event.url),
    images: normalizeImages(event.images),
    dates: {
      start: normalizeDateTime(start),
      end: event.dates?.end ? normalizeDateTime(event.dates.end) : null,
      timezone: event.dates?.timezone ?? null,
      dateTbd: start?.dateTBD ?? false,
      dateTba: start?.dateTBA ?? false,
      timeTba: start?.timeTBA ?? false,
      noSpecificTime: start?.noSpecificTime ?? false,
      endApproximate: event.dates?.end?.approximate ?? false,
      spansMultipleDays: event.dates?.spanMultipleDays ?? false,
    },
    venue: normalizeVenue(event),
    classification: normalizeClassification(event),
    priceRange: normalizePriceRange(event),
    status: normalizeStatus(event),
  };
}

export function normalizeTicketmasterSearchResponse(
  response: TicketmasterSearchResponse,
): EventSearchResult {
  const { number, size, totalElements, totalPages } = response.page;

  return {
    events: (response._embedded?.events ?? []).map(normalizeTicketmasterEvent),
    pagination: {
      page: number,
      size,
      totalItems: totalElements,
      totalPages,
      hasNextPage: number + 1 < totalPages,
    },
  };
}
