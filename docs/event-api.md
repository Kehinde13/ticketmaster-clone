# Event API boundary

Research date: September 7, 2026

## Official research

The contract was checked against the current official [Ticketmaster Discovery API v2 reference](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/) and its Event Search, Get Event Details, and Get Event Images operations.

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

Raw provider and HAL response shapes must remain inside the future provider implementation. That implementation must validate untrusted JSON before normalization and must never expose credentials or raw upstream errors to application UI.

## Contract decisions

- Normalized IDs use `<provider>:<providerEventId>`; for example, `ticketmaster:event-123`. Provider lookup receives the raw provider event ID because the provider instance already establishes the namespace.
- Missing normalized data is represented with `null`; optional properties are reserved for caller-supplied search filters.
- Dates stay as local date/time and UTC ISO strings plus timezone and uncertainty flags. Presentation labels are derived later rather than stored in `Event`.
- Venue address and coordinates live in `EventLocation` and are not duplicated at the event root.
- Images retain dimensions, normalized ratio, fallback status, and attribution so presentation code can select an appropriate candidate later.
- Classification names are normalized while optional upstream identifiers are isolated as `providerId` metadata. Application categories use stable internal slugs; future adapters own provider-ID mappings.
- Price is nullable. No fees, taxes, totals, or missing prices are inferred.
- Provider errors use safe categories: configuration, unauthorized, rate limit, not found, network, invalid response, and provider error.
- `TICKETMASTER_API_KEY` is intentionally not required yet. Phase 4.2 will introduce server-only configuration with the real provider.

The Phase 3 `EventCardData` remains a temporary presentation projection derived from `Event` identity and name. Its formatted prototype strings stay isolated until real normalized events are connected.
