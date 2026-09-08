import { z } from "zod";

import type { EventSearchParams, EventSearchResult } from "@/types/event";

const classificationLevelSchema = z.strictObject({
  providerId: z.string().nullable(),
  name: z.string(),
});

const eventSchema = z.strictObject({
  id: z.string(),
  provider: z.literal("ticketmaster"),
  providerEventId: z.string(),
  name: z.string(),
  url: z.string().nullable(),
  images: z.array(z.strictObject({
    url: z.string(),
    width: z.number().nullable(),
    height: z.number().nullable(),
    ratio: z.enum(["16:9", "3:2", "4:3", "other"]),
    fallback: z.boolean(),
    attribution: z.string().nullable(),
  })),
  dates: z.strictObject({
    start: z.strictObject({
      localDate: z.string().nullable(),
      localTime: z.string().nullable(),
      utcDateTime: z.string().nullable(),
    }),
    end: z.strictObject({
      localDate: z.string().nullable(),
      localTime: z.string().nullable(),
      utcDateTime: z.string().nullable(),
    }).nullable(),
    timezone: z.string().nullable(),
    dateTbd: z.boolean(),
    dateTba: z.boolean(),
    timeTba: z.boolean(),
    noSpecificTime: z.boolean(),
    endApproximate: z.boolean(),
    spansMultipleDays: z.boolean(),
  }),
  venue: z.strictObject({
    id: z.string().nullable(),
    name: z.string(),
    location: z.strictObject({
      addressLines: z.array(z.string()),
      city: z.string().nullable(),
      state: z.string().nullable(),
      stateCode: z.string().nullable(),
      country: z.string().nullable(),
      countryCode: z.string().nullable(),
      postalCode: z.string().nullable(),
      latitude: z.number().nullable(),
      longitude: z.number().nullable(),
    }),
    timezone: z.string().nullable(),
  }).nullable(),
  classification: z.strictObject({
    segment: classificationLevelSchema.nullable(),
    genre: classificationLevelSchema.nullable(),
    subGenre: classificationLevelSchema.nullable(),
  }).nullable(),
  priceRange: z.strictObject({
    type: z.enum(["standard", "other"]),
    currency: z.string(),
    min: z.number(),
    max: z.number(),
  }).nullable(),
  status: z.enum(["onsale", "offsale", "canceled", "postponed", "rescheduled"]).nullable(),
});

const resultSchema = z.strictObject({
  events: z.array(eventSchema),
  pagination: z.strictObject({
    page: z.number().int(),
    size: z.number().int(),
    totalItems: z.number().int().nullable(),
    totalPages: z.number().int().nullable(),
    hasNextPage: z.boolean(),
  }),
});

const errorSchema = z.strictObject({
  error: z.strictObject({
    code: z.enum([
      "INVALID_SEARCH_PARAMS",
      "EVENT_SERVICE_UNAVAILABLE",
      "EVENT_PROVIDER_RESPONSE_ERROR",
      "INTERNAL_ERROR",
    ]),
    message: z.string().max(200),
    fields: z.record(z.string().max(100), z.string().max(200)).optional(),
  }),
});

export class EventSearchApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly fields: Readonly<Record<string, string>> | undefined;

  constructor(
    status: number,
    code: string,
    message: string,
    fields?: Readonly<Record<string, string>>,
  ) {
    super(message);
    this.name = "EventSearchApiError";
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}

function append(
  query: URLSearchParams,
  name: string,
  value: string | number | undefined,
) {
  if (value !== undefined) query.set(name, String(value));
}

export function buildEventSearchUrl(params: EventSearchParams): string {
  const query = new URLSearchParams();
  append(query, "keyword", params.keyword);
  append(query, "countryCode", params.countryCode);
  append(query, "city", params.location?.city);
  append(query, "stateCode", params.location?.stateCode);
  append(query, "postalCode", params.location?.postalCode);
  append(query, "latitude", params.location?.latitude);
  append(query, "longitude", params.location?.longitude);
  append(query, "radius", params.location?.radius?.value);
  append(query, "radiusUnit", params.location?.radius?.unit);
  append(query, "startDateTime", params.startDateTime);
  append(query, "endDateTime", params.endDateTime);
  append(query, "category", params.category);
  append(query, "segment", params.classification?.segment);
  append(query, "genre", params.classification?.genre);
  append(query, "subGenre", params.classification?.subGenre);
  append(query, "page", params.page);
  append(query, "pageSize", params.pageSize);
  const value = query.toString();
  return value ? `/api/events?${value}` : "/api/events";
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    throw new EventSearchApiError(
      response.status,
      "INVALID_API_RESPONSE",
      "Event search returned an invalid response.",
    );
  }
}

export async function fetchEventSearch(
  params: EventSearchParams,
  options: Readonly<{ signal?: AbortSignal }> = {},
): Promise<EventSearchResult> {
  const response = await fetch(buildEventSearchUrl(params), {
    method: "GET",
    headers: { Accept: "application/json" },
    signal: options.signal,
  });
  const body = await readJson(response);

  if (!response.ok) {
    const parsed = errorSchema.safeParse(body);
    if (!parsed.success) {
      throw new EventSearchApiError(
        response.status,
        "INVALID_API_RESPONSE",
        "Event search returned an invalid response.",
      );
    }
    throw new EventSearchApiError(
      response.status,
      parsed.data.error.code,
      parsed.data.error.message,
      parsed.data.error.fields,
    );
  }

  const parsed = resultSchema.safeParse(body);
  if (!parsed.success) {
    throw new EventSearchApiError(
      response.status,
      "INVALID_API_RESPONSE",
      "Event search returned an invalid response.",
    );
  }
  return parsed.data;
}
