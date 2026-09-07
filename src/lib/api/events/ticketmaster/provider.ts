import "server-only";

import { serverEnv } from "@/lib/env/server";
import type {
  EventProvider,
  EventProviderError,
  EventProviderErrorCode,
} from "@/lib/api/events/provider";
import type { EventSearchParams } from "@/types/event";

import {
  normalizeTicketmasterEvent,
  normalizeTicketmasterSearchResponse,
} from "./normalize";
import {
  ticketmasterEventSchema,
  ticketmasterSearchResponseSchema,
} from "./schema";

const discoveryBaseUrl = "https://app.ticketmaster.com/discovery/v2/";
const defaultTimeoutMs = 8_000;
const defaultPageSize = 20;
const maximumPageSize = 200;
const maximumDeepPagingOffset = 1_000;
const geohashAlphabet = "0123456789bcdefghjkmnpqrstuvwxyz";

type ProviderException = Error & EventProviderError;

type TicketmasterProviderOptions = Readonly<{
  apiKey?: string;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
}>;

function providerError(
  code: EventProviderErrorCode,
  message: string,
  status: number | null = null,
  cause?: unknown,
): ProviderException {
  return Object.assign(new Error(message), { code, status, cause });
}

function invalidSearch(message: string): never {
  throw providerError("provider_error", message);
}

function requiredTrimmed(value: string, label: string): string {
  const trimmed = value.trim();
  if (!trimmed) invalidSearch(`${label} must not be empty.`);
  return trimmed;
}

function optionalTrimmed(value: string | undefined, label: string) {
  return value === undefined ? undefined : requiredTrimmed(value, label);
}

function validateDateTime(value: string | undefined, label: string) {
  if (value === undefined) return undefined;
  const trimmed = requiredTrimmed(value, label);
  if (
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(
      trimmed,
    ) ||
    !Number.isFinite(Date.parse(trimmed))
  ) {
    invalidSearch(`${label} must be a valid ISO date-time.`);
  }
  return trimmed;
}

function encodeGeoPoint(
  latitude: number,
  longitude: number,
  precision = 9,
): string {
  const latitudeRange: [number, number] = [-90, 90];
  const longitudeRange: [number, number] = [-180, 180];
  let hash = "";
  let bits = 0;
  let value = 0;
  let longitudeBit = true;

  while (hash.length < precision) {
    const range = longitudeBit ? longitudeRange : latitudeRange;
    const coordinate = longitudeBit ? longitude : latitude;
    const midpoint = (range[0] + range[1]) / 2;

    value <<= 1;
    if (coordinate >= midpoint) {
      value |= 1;
      range[0] = midpoint;
    } else {
      range[1] = midpoint;
    }

    longitudeBit = !longitudeBit;
    bits += 1;

    if (bits === 5) {
      hash += geohashAlphabet[value];
      bits = 0;
      value = 0;
    }
  }

  return hash;
}

function buildSearchQuery(apiKey: string, params: EventSearchParams) {
  const query = new URLSearchParams({ apikey: apiKey });
  const keyword = optionalTrimmed(params.keyword, "keyword");
  const countryCode = optionalTrimmed(params.countryCode, "countryCode");
  const startDateTime = validateDateTime(
    params.startDateTime,
    "startDateTime",
  );
  const endDateTime = validateDateTime(params.endDateTime, "endDateTime");
  const page = params.page ?? 0;
  const pageSize = params.pageSize ?? defaultPageSize;

  if (!Number.isInteger(page) || page < 0) {
    invalidSearch("page must be a non-negative integer.");
  }
  if (
    !Number.isInteger(pageSize) ||
    pageSize < 1 ||
    pageSize > maximumPageSize
  ) {
    invalidSearch(`pageSize must be between 1 and ${maximumPageSize}.`);
  }
  if (page * pageSize >= maximumDeepPagingOffset) {
    invalidSearch("The requested page exceeds Ticketmaster's paging limit.");
  }
  if (
    startDateTime &&
    endDateTime &&
    Date.parse(startDateTime) > Date.parse(endDateTime)
  ) {
    invalidSearch("startDateTime must not be after endDateTime.");
  }

  if (keyword) query.set("keyword", keyword);
  if (countryCode) {
    const normalizedCountryCode = countryCode.toUpperCase();
    if (!/^[A-Z]{2}$/.test(normalizedCountryCode)) {
      invalidSearch("countryCode must be a two-letter country code.");
    }
    query.set("countryCode", normalizedCountryCode);
  }
  if (startDateTime) query.set("startDateTime", startDateTime);
  if (endDateTime) query.set("endDateTime", endDateTime);
  query.set("page", String(page));
  query.set("size", String(pageSize));

  const location = params.location;
  if (location) {
    const city = optionalTrimmed(location.city, "location.city");
    const stateCode = optionalTrimmed(
      location.stateCode,
      "location.stateCode",
    );
    const postalCode = optionalTrimmed(
      location.postalCode,
      "location.postalCode",
    );
    const hasLatitude = location.latitude !== undefined;
    const hasLongitude = location.longitude !== undefined;

    if (city) query.set("city", city);
    if (stateCode) query.set("stateCode", stateCode.toUpperCase());
    if (postalCode) query.set("postalCode", postalCode);

    if (hasLatitude !== hasLongitude) {
      invalidSearch("latitude and longitude must be provided together.");
    }
    if (location.radius && !hasLatitude) {
      invalidSearch("radius requires latitude and longitude.");
    }
    if (hasLatitude && hasLongitude) {
      const latitude = location.latitude;
      const longitude = location.longitude;
      if (
        latitude === undefined ||
        !Number.isFinite(latitude) ||
        latitude < -90 ||
        latitude > 90
      ) {
        invalidSearch("latitude must be between -90 and 90.");
      }
      if (
        longitude === undefined ||
        !Number.isFinite(longitude) ||
        longitude < -180 ||
        longitude > 180
      ) {
        invalidSearch("longitude must be between -180 and 180.");
      }

      query.set("geoPoint", encodeGeoPoint(latitude, longitude));

      if (location.radius) {
        if (
          !Number.isFinite(location.radius.value) ||
          location.radius.value <= 0
        ) {
          invalidSearch("radius must be a positive finite number.");
        }
        query.set("radius", String(location.radius.value));
        query.set("unit", location.radius.unit);
      }
    }
  }

  const categorySegment =
    params.category === "concerts"
      ? "Music"
      : params.category === "sports"
        ? "Sports"
        : params.category === "arts-theater-comedy"
          ? "Arts & Theatre"
          : undefined;
  const classification = params.classification;
  const explicitSegment = optionalTrimmed(
    classification?.segment,
    "classification.segment",
  );

  if (
    categorySegment &&
    explicitSegment &&
    categorySegment.toLowerCase() !== explicitSegment.toLowerCase()
  ) {
    invalidSearch("category conflicts with classification.segment.");
  }
  if (categorySegment) query.set("segmentName", categorySegment);
  if (params.category === "family") query.set("includeFamily", "only");

  for (const value of [
    categorySegment ? undefined : explicitSegment,
    optionalTrimmed(classification?.genre, "classification.genre"),
    optionalTrimmed(classification?.subGenre, "classification.subGenre"),
  ]) {
    if (value) query.append("classificationName", value);
  }

  return query;
}

function statusError(status: number): ProviderException {
  if (status === 401 || status === 403) {
    return providerError(
      "unauthorized",
      "Ticketmaster rejected the provider credentials.",
      status,
    );
  }
  if (status === 404) {
    return providerError("not_found", "The requested event was not found.", 404);
  }
  if (status === 429) {
    return providerError(
      "rate_limit",
      "Ticketmaster's request limit has been reached.",
      429,
    );
  }
  return providerError(
    "provider_error",
    "Ticketmaster could not complete the request.",
    status,
  );
}

export function createTicketmasterEventProvider(
  options: TicketmasterProviderOptions = {},
): EventProvider {
  const apiKey = (options.apiKey ?? serverEnv.TICKETMASTER_API_KEY)?.trim();
  if (!apiKey) {
    throw providerError(
      "configuration",
      "Ticketmaster event provider is not configured.",
    );
  }

  const fetchImpl = options.fetchImpl ?? fetch;
  const timeoutMs = options.timeoutMs ?? defaultTimeoutMs;
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
    throw providerError(
      "configuration",
      "Ticketmaster event provider timeout is invalid.",
    );
  }

  async function request(url: URL): Promise<unknown> {
    const signal = AbortSignal.timeout(timeoutMs);
    let response: Response;

    try {
      response = await fetchImpl(url, {
        headers: { Accept: "application/json" },
        signal,
      });
    } catch (cause) {
      throw providerError(
        "network",
        signal.aborted
          ? "Ticketmaster request timed out."
          : "Ticketmaster request failed.",
        null,
        cause,
      );
    }

    if (!response.ok) throw statusError(response.status);

    try {
      return await response.json();
    } catch (cause) {
      if (signal.aborted) {
        throw providerError(
          "network",
          "Ticketmaster request timed out.",
          null,
          cause,
        );
      }
      throw providerError(
        "invalid_response",
        "Ticketmaster returned invalid JSON.",
        response.status,
        cause,
      );
    }
  }

  return {
    async searchEvents(params) {
      const url = new URL("events.json", discoveryBaseUrl);
      url.search = buildSearchQuery(apiKey, params).toString();
      const payload = await request(url);
      const parsed = ticketmasterSearchResponseSchema.safeParse(payload);

      if (!parsed.success) {
        throw providerError(
          "invalid_response",
          "Ticketmaster returned an invalid event search response.",
          200,
          parsed.error,
        );
      }

      return normalizeTicketmasterSearchResponse(parsed.data);
    },

    async getEventById(providerEventId) {
      const id = requiredTrimmed(providerEventId, "providerEventId");
      const url = new URL(
        `events/${encodeURIComponent(id)}.json`,
        discoveryBaseUrl,
      );
      url.searchParams.set("apikey", apiKey);

      let payload: unknown;
      try {
        payload = await request(url);
      } catch (error) {
        if (
          error instanceof Error &&
          "code" in error &&
          error.code === "not_found"
        ) {
          return null;
        }
        throw error;
      }

      const parsed = ticketmasterEventSchema.safeParse(payload);
      if (!parsed.success) {
        throw providerError(
          "invalid_response",
          "Ticketmaster returned an invalid event detail response.",
          200,
          parsed.error,
        );
      }

      return normalizeTicketmasterEvent(parsed.data);
    },
  };
}
