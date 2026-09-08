# Event API boundary

Research date: September 7, 2026

## Official research

The contract was checked against the current official [Ticketmaster Discovery API v2 reference](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/) and [API Explorer](https://developer.ticketmaster.com/api-explorer/v2/), including the Event Search, Get Event Details, and Get Event Images operations.

Relevant provider capabilities are keyword, country, city/state/postal or coordinate-radius location, start/end date-time, classification, zero-based page/size search, and event lookup by provider ID. The documented response supplies HAL-wrapped results and page metadata; events may include local and UTC start data, TBD/TBA flags, timezone, lifecycle status, image variants, embedded venue/location, segment/genre/subgenre classification, optional price ranges, and a provider detail URL. Authentication uses an API key, and the default limit is 5,000 calls per day and five requests per second with deep paging limited to the first 1,000 items.

## Boundary

```text
External provider response
  -> provider-owned runtime validation
  -> provider normalization
  -> server-only EventProvider
  -> client-safe normalized Event
  -> application and UI
```

Raw provider and HAL response shapes remain inside the provider implementation, which validates untrusted JSON before normalization. The application endpoint never exposes credentials or raw upstream errors.

## Contract decisions

- Normalized IDs use `<provider>:<providerEventId>`; for example, `ticketmaster:event-123`. Provider lookup receives the raw provider event ID because the provider instance already establishes the namespace.
- Missing normalized data is represented with `null`; optional properties are reserved for caller-supplied search filters.
- Dates stay as local date/time and UTC ISO strings plus timezone and uncertainty flags. Presentation labels are derived later rather than stored in `Event`.
- Venue address and coordinates live in `EventLocation` and are not duplicated at the event root.
- Images retain dimensions, normalized ratio, fallback status, and attribution so presentation code can select an appropriate candidate later.
- Classification names are normalized while optional upstream identifiers are isolated as `providerId` metadata. Application categories use stable internal slugs; future adapters own provider-ID mappings.
- Price is nullable. No fees, taxes, totals, or missing prices are inferred.
- Provider errors use safe categories: configuration, unauthorized, rate limit, not found, network, invalid response, and provider error.
- `TICKETMASTER_API_KEY` remains optional during unrelated builds and tests but is required when the real Ticketmaster provider is constructed without an injected test key.

The Phase 3 `EventCardData` remains a temporary presentation projection derived from `Event` identity and name. Its formatted prototype strings stay isolated until real normalized events are connected.

## Ticketmaster provider implementation

`createTicketmasterEventProvider` is a server-only `EventProvider` backed by native `fetch`. It uses the fixed Discovery v2 base URL, requires `TICKETMASTER_API_KEY` only when constructed without an injected key, injects fetch for isolated tests, aborts requests after eight seconds by default, and does not retry.

Search translation is explicit: keyword, country, city/state/postal, UTC date-time boundaries, page/size, and classification names map to their documented parameters. Coordinates are validated and encoded as the current `geoPoint` geohash; radius/unit are sent only with coordinates. Categories map as Music, Sports, Arts & Theatre, while Family uses `includeFamily=only`. No provider classification IDs are exposed to callers.

Targeted Zod schemas validate the event fields and HAL page structures actually consumed. Missing `_embedded` events is a valid empty result. A malformed required event ID/name or page fails the whole response; invalid optional URLs, prices, status values, or coordinates are safely dropped or normalized to `null`.

HTTP 401/403, 429, and other failures map to unauthorized, rate-limit, and provider errors. Detail 404 returns `null`. Network/timeout, invalid JSON, and schema failures preserve an internal cause while exposing only safe messages. URLs and errors are never logged, so the `apikey` value is not emitted.

## Application event search endpoint

`GET /api/events` is public and returns `EventSearchResult` directly: `{ events: Event[], pagination: { page, size, totalItems, totalPages, hasNextPage } }`. Successful empty searches return HTTP 200. Only GET is implemented (Next.js supplies HEAD/OPTIONS).

The flat URL query is validated with Zod before provider construction or execution, then translated to nested `EventSearchParams.location` and `.classification`. All parameters are scalar. Duplicate parameters, including identical duplicates, and unknown names return HTTP 400. Empty supplied strings are rejected. No unknown parameters reach the provider.

| Parameters | Rules |
| --- | --- |
| `keyword` | Trimmed, 1–200 characters |
| `countryCode` | Two ASCII letters, normalized uppercase |
| `city` | Trimmed, 1–100 characters |
| `stateCode`, `postalCode` | Trimmed, 1–20 characters; state code uppercased without restricting searches to US states |
| `latitude`, `longitude` | Finite decimal numbers, required together; latitude -90–90, longitude -180–180 |
| `radius`, `radiusUnit` | Radius >0 and <=1000, requires coordinates; unit `miles` (default when radius supplied) or `km`; unit alone rejected |
| `startDateTime`, `endDateTime` | Valid ISO date-times with seconds and explicit UTC/offset; fractions accepted; normalized to UTC milliseconds; start must not exceed end |
| `category` | `concerts`, `sports`, `arts-theater-comedy`, or `family` |
| `segment`, `genre`, `subGenre` | Trimmed, 1–100 characters; a segment conflicting with a category is rejected |
| `page`, `pageSize` | Decimal integers; default 0/20, page >=0, size 1–200, page * size <1000 |

Pagination defaults and provider limits are shared through `eventSearchLimits`. Numeric exponent/hex forms, blanks, NaN, and Infinity are rejected. The route does not construct Ticketmaster queries; the provider retains that responsibility.

Errors use `{ error: { code, message, fields? } }`. Validation fields contain only known field names and fixed messages; unknown query names use `query`. Supplied values and Zod internals are never echoed.

| Failure | HTTP | Public code |
| --- | --- | --- |
| Invalid query | 400 | `INVALID_SEARCH_PARAMS` |
| Configuration, upstream authorization, upstream rate limit, network/timeout | 503 | `EVENT_SERVICE_UNAVAILABLE` |
| Invalid upstream response, provider error, unexpected upstream not-found | 502 | `EVENT_PROVIDER_RESPONSE_ERROR` |
| Unexpected application exception | 500 | `INTERNAL_ERROR` |

Upstream quota failures represent temporary service unavailability, not a client rate-limit violation. A search-level upstream not-found is treated as a provider failure; a valid empty search remains successful. Missing credentials are caught during provider construction and return the safe 503 response.

All handled responses include JSON content type and `Cache-Control: no-store`; the route is explicitly dynamic. Credentials remain server-only, and error stacks, causes, upstream messages, secret-bearing request URLs, and raw HAL envelopes are never serialized. Route tests mock the provider getter and make zero live API calls.

Request-disconnect propagation is deferred because the existing provider owns its timeout signal. Distributed rate limiting, authentication, persistence, UI integration, and client retry behavior are outside this phase.

## Application event details endpoint

`GET /api/events/:id` accepts a normalized application event ID, for example `/api/events/ticketmaster%3Aevent-123`. Success is HTTP 200 with `{ event: Event }`; nullable venue, price, classification, and other optional metadata remain valid. This endpoint is public. Only GET is implemented; Next.js supplies HEAD/OPTIONS.

The client-safe `parseEventId` helper matches the existing `createEventId` format: `ticketmaster:<providerEventId>`. It splits at the first colon, permits only the supported `ticketmaster` provider, and returns the unmodified provider ID. The route selects the existing provider getter and calls `getEventById(providerEventId)`; it does not construct upstream URLs or change the provider contract.

Decoded IDs are limited to 512 characters total. Provider IDs must be nonempty ASCII letters/digits or URI punctuation (`._~!$&'()*+,;=:@%/?-`); whitespace, control characters, backslashes, and other characters are rejected. Malformed IDs, missing separators, unknown providers, and excessive lengths return HTTP 400 `INVALID_EVENT_ID` before provider construction.

Callers should encode the entire normalized ID as one path segment. Next.js decodes route parameters once; the parser never decodes again. Literal percent sequences in provider IDs stay literal (e.g. `%252F` in the URL becomes `%2F` in the provider ID). A Proxy guard scoped to `/api/events/:id` validates transport encoding without rewriting the path. It returns the safe HTTP 400 `INVALID_EVENT_ID` JSON response for malformed escapes/UTF-8 before Next.js route decoding, which otherwise produced a framework 500 in production verification. An absent path segment belongs to the existing search endpoint.

| Failure | HTTP | Public code |
| --- | --- | --- |
| Invalid normalized ID | 400 | `INVALID_EVENT_ID` |
| Provider returns null or throws not-found | 404 | `EVENT_NOT_FOUND` |
| Configuration, upstream authorization, upstream rate limit, network/timeout | 503 | `EVENT_SERVICE_UNAVAILABLE` |
| Invalid upstream response or provider error | 502 | `EVENT_PROVIDER_RESPONSE_ERROR` |
| Unexpected application exception | 500 | `INTERNAL_ERROR` |

Errors use `{ error: { code, message } }` with fixed public messages. Every handled response includes JSON content type and `Cache-Control: no-store`; the route is explicitly dynamic. Credentials stay server-only. No upstream request URL, error message, stack, cause, or raw Ticketmaster response is serialized or logged. Event URLs in successful normalized data are public event-page URLs. Route tests mock the provider boundary and make no live calls. Event Details UI and client data integration remain deferred.

## Server-rendered Discover integration

Server-rendered Discover content calls `EventProvider` directly through a small
server-only loader. Browser and future client integrations use `/api/events`.
This avoids an unnecessary HTTP round trip through the application's own route
while keeping provider selection, normalization, and credentials server-side.
All four Popular Near You rows pass an application category to this loader and
render normalized `Event[]` through the shared `EventCardData` projection.
