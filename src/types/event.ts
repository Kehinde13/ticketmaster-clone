export type EventProviderName = "ticketmaster";

export type EventStatus =
  | "onsale"
  | "offsale"
  | "canceled"
  | "postponed"
  | "rescheduled";

export type EventImageRatio = "16:9" | "3:2" | "4:3" | "other";

export type EventImage = Readonly<{
  url: string;
  width: number | null;
  height: number | null;
  ratio: EventImageRatio;
  fallback: boolean;
  attribution: string | null;
}>;

export type EventLocation = Readonly<{
  addressLines: readonly string[];
  city: string | null;
  state: string | null;
  stateCode: string | null;
  country: string | null;
  countryCode: string | null;
  postalCode: string | null;
  latitude: number | null;
  longitude: number | null;
}>;

export type EventVenue = Readonly<{
  id: string | null;
  name: string;
  location: EventLocation;
  timezone: string | null;
}>;

export type EventClassificationLevel = Readonly<{
  providerId: string | null;
  name: string;
}>;

export type EventClassification = Readonly<{
  segment: EventClassificationLevel | null;
  genre: EventClassificationLevel | null;
  subGenre: EventClassificationLevel | null;
}>;

export type EventPriceRange = Readonly<{
  type: "standard" | "other";
  currency: string;
  min: number;
  max: number;
}>;

export type EventDateTime = Readonly<{
  localDate: string | null;
  localTime: string | null;
  utcDateTime: string | null;
}>;

export type EventDates = Readonly<{
  start: EventDateTime;
  end: EventDateTime | null;
  timezone: string | null;
  dateTbd: boolean;
  dateTba: boolean;
  timeTba: boolean;
  noSpecificTime: boolean;
  endApproximate: boolean;
  spansMultipleDays: boolean;
}>;

export type Event = Readonly<{
  id: string;
  provider: EventProviderName;
  providerEventId: string;
  name: string;
  url: string | null;
  images: readonly EventImage[];
  dates: EventDates;
  venue: EventVenue | null;
  classification: EventClassification | null;
  priceRange: EventPriceRange | null;
  status: EventStatus | null;
}>;

export type EventCategory =
  | "concerts"
  | "sports"
  | "arts-theater-comedy"
  | "family";

export type EventClassificationFilter = Readonly<{
  segment?: string;
  genre?: string;
  subGenre?: string;
}>;

export type EventSearchLocation = Readonly<{
  city?: string;
  stateCode?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  radius?: Readonly<{
    value: number;
    unit: "miles" | "km";
  }>;
}>;

export type EventSearchParams = Readonly<{
  keyword?: string;
  countryCode?: string;
  location?: EventSearchLocation;
  startDateTime?: string;
  endDateTime?: string;
  category?: EventCategory;
  classification?: EventClassificationFilter;
  page?: number;
  pageSize?: number;
}>;

export type EventPagination = Readonly<{
  page: number;
  size: number;
  totalItems: number | null;
  totalPages: number | null;
  hasNextPage: boolean;
}>;

export type EventSearchResult = Readonly<{
  events: readonly Event[];
  pagination: EventPagination;
}>;

export function createEventId(
  provider: EventProviderName,
  providerEventId: string,
): string {
  if (providerEventId.trim().length === 0) {
    throw new Error("providerEventId must not be empty");
  }

  return `${provider}:${providerEventId}`;
}

// Temporary Phase 3 view model. Structured identity and name are inherited from
// Event; presentation labels remain until real normalized events feed the cards.
export type EventCardData = Readonly<
  Pick<Event, "id" | "name"> & {
    category: string;
    dateLabel: string;
    venue: string;
    location: string;
  }
>;
