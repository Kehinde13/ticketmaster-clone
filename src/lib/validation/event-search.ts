import { z } from "zod";

import { eventSearchLimits } from "@/lib/api/events/provider";
import type { EventSearchParams } from "@/types/event";

const text = (max: number) => z.string().trim().min(1).max(max);
const decimal = z.string().trim().max(32)
  .regex(/^-?(?:\d+(?:\.\d+)?|\.\d+)$/).transform(Number);
const integer = z.string().trim().max(10).regex(/^\d+$/)
  .transform(Number).pipe(z.number().int().nonnegative());
const dateTime = text(40).pipe(z.iso.datetime({ offset: true }))
  .refine((value) => /T\d{2}:\d{2}:\d{2}/.test(value))
  .transform((value) => new Date(value).toISOString().replace(".000Z", "Z"));

const queryFields = z.strictObject({
  keyword: text(200).optional(),
  countryCode: text(2).regex(/^[a-z]{2}$/i).toUpperCase().optional(),
  city: text(100).optional(),
  stateCode: text(20).toUpperCase().optional(),
  postalCode: text(20).optional(),
  latitude: decimal.pipe(z.number().min(-90).max(90)).optional(),
  longitude: decimal.pipe(z.number().min(-180).max(180)).optional(),
  radius: decimal.pipe(z.number().positive().max(1000)).optional(),
  radiusUnit: z.enum(["miles", "km"]).optional(),
  startDateTime: dateTime.optional(),
  endDateTime: dateTime.optional(),
  category: z.enum(["concerts", "sports", "arts-theater-comedy", "family"]).optional(),
  segment: text(100).optional(),
  genre: text(100).optional(),
  subGenre: text(100).optional(),
  page: integer.default(eventSearchLimits.defaultPage),
  pageSize: integer.pipe(z.number().min(1).max(eventSearchLimits.maximumPageSize))
    .default(eventSearchLimits.defaultPageSize),
});

const querySchema = queryFields.superRefine((value, context) => {
  const invalid = (field: string) => context.addIssue({
    code: "custom", path: [field], message: "Invalid search parameter.",
  });
  if ((value.latitude === undefined) !== (value.longitude === undefined)) {
    invalid(value.latitude === undefined ? "latitude" : "longitude");
  }
  if (value.radius !== undefined && value.latitude === undefined) invalid("radius");
  if (value.radiusUnit !== undefined && value.radius === undefined) invalid("radiusUnit");
  if (value.page * value.pageSize >= eventSearchLimits.maximumOffset) invalid("page");
  if (value.startDateTime && value.endDateTime &&
    Date.parse(value.startDateTime) > Date.parse(value.endDateTime)) {
    invalid("endDateTime");
  }
  const categorySegments = {
    concerts: "music", sports: "sports", "arts-theater-comedy": "arts & theatre",
  };
  if (value.category && value.category !== "family" && value.segment &&
    categorySegments[value.category] !== value.segment.toLowerCase()) invalid("segment");
}).transform((value): EventSearchParams => {
  const { city, stateCode, postalCode, latitude, longitude, radius, radiusUnit,
    segment, genre, subGenre, ...search } = value;
  const hasLocation = [city, stateCode, postalCode, latitude, longitude]
    .some((item) => item !== undefined);
  return {
    ...search,
    ...(hasLocation ? { location: {
      city, stateCode, postalCode, latitude, longitude,
      ...(radius !== undefined ? { radius: { value: radius, unit: radiusUnit ?? "miles" } } : {}),
    } } : {}),
    ...([segment, genre, subGenre].some((item) => item !== undefined)
      ? { classification: { segment, genre, subGenre } } : {}),
  };
});

const searchQuerySchema = z.instanceof(URLSearchParams).superRefine((query, context) => {
  if (Array.from(query.keys()).some((key) => !Object.hasOwn(queryFields.shape, key))) {
    context.addIssue({ code: "custom", message: "Unknown search parameter." });
  }
}).transform((query) => {
  // Arrays deliberately fail scalar schemas, including identical duplicates.
  return Object.fromEntries(Array.from(new Set(query.keys()), (key) => {
    const values = query.getAll(key);
    return [key, values.length === 1 ? values[0] : values];
  }));
}).pipe(querySchema);

export function parseEventSearchQuery(query: URLSearchParams) {
  return searchQuerySchema.safeParse(query);
}
