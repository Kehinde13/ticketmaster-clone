import { z } from "zod";

const nonEmptyString = z.string().trim().min(1);
const optionalNonEmptyString = nonEmptyString.optional();

const classificationLevelSchema = z.object({
  id: optionalNonEmptyString,
  name: nonEmptyString,
});

const ticketmasterImageSchema = z.object({
  url: nonEmptyString,
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  ratio: optionalNonEmptyString,
  fallback: z.boolean().optional(),
  attribution: optionalNonEmptyString,
});

const ticketmasterDateTimeSchema = z.object({
  localDate: z.iso.date().optional(),
  localTime: z.iso.time().optional(),
  dateTime: z.iso.datetime({ offset: true }).optional(),
  approximate: z.boolean().optional(),
});

const ticketmasterVenueSchema = z.object({
  id: optionalNonEmptyString,
  name: nonEmptyString,
  address: z
    .object({
      line1: optionalNonEmptyString,
      line2: optionalNonEmptyString,
      line3: optionalNonEmptyString,
    })
    .optional(),
  city: z.object({ name: optionalNonEmptyString }).optional(),
  state: z
    .object({
      name: optionalNonEmptyString,
      stateCode: optionalNonEmptyString,
    })
    .optional(),
  country: z
    .object({
      name: optionalNonEmptyString,
      countryCode: optionalNonEmptyString,
    })
    .optional(),
  postalCode: optionalNonEmptyString,
  timezone: optionalNonEmptyString,
  location: z
    .object({
      latitude: z.union([z.string(), z.number()]).optional(),
      longitude: z.union([z.string(), z.number()]).optional(),
    })
    .optional(),
});

const ticketmasterClassificationSchema = z.object({
  primary: z.boolean().optional(),
  segment: classificationLevelSchema.optional(),
  genre: classificationLevelSchema.optional(),
  subGenre: classificationLevelSchema.optional(),
  family: z.boolean().optional(),
});

const ticketmasterPriceRangeSchema = z.object({
  type: optionalNonEmptyString,
  currency: optionalNonEmptyString,
  min: z.union([z.string(), z.number()]).optional(),
  max: z.union([z.string(), z.number()]).optional(),
});

export const ticketmasterEventSchema = z.object({
  id: nonEmptyString,
  name: nonEmptyString,
  url: optionalNonEmptyString,
  images: z.array(ticketmasterImageSchema).optional(),
  dates: z
    .object({
      start: ticketmasterDateTimeSchema
        .extend({
          dateTBD: z.boolean().optional(),
          dateTBA: z.boolean().optional(),
          timeTBA: z.boolean().optional(),
          noSpecificTime: z.boolean().optional(),
        })
        .optional(),
      end: ticketmasterDateTimeSchema.optional(),
      timezone: optionalNonEmptyString,
      status: z.object({ code: optionalNonEmptyString }).optional(),
      spanMultipleDays: z.boolean().optional(),
    })
    .optional(),
  classifications: z.array(ticketmasterClassificationSchema).optional(),
  priceRanges: z.array(ticketmasterPriceRangeSchema).optional(),
  _embedded: z
    .object({
      venues: z.array(ticketmasterVenueSchema).optional(),
    })
    .optional(),
});

const ticketmasterPageSchema = z.object({
  size: z.number().int().nonnegative(),
  totalElements: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
  number: z.number().int().nonnegative(),
});

export const ticketmasterSearchResponseSchema = z.object({
  _embedded: z
    .object({
      events: z.array(ticketmasterEventSchema),
    })
    .optional(),
  page: ticketmasterPageSchema,
});

export type TicketmasterEvent = z.infer<typeof ticketmasterEventSchema>;
export type TicketmasterSearchResponse = z.infer<
  typeof ticketmasterSearchResponseSchema
>;
