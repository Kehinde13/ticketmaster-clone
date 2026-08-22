# Desktop global header reference

Inspected on 2026-08-22.

## Sources and confidence

- Ticketmaster US homepage (`https://www.ticketmaster.com/`): current public output confirms the country control, utility links, branding, category order, More button, search toggle, and signed-out account label.
- Ticketmaster US concerts discovery (`https://www.ticketmaster.com/discover/concerts`): current public output confirms the same global structure and shows a search field within the header experience.
- Ticketmaster sports discovery was also inspected as cross-page structural evidence.
- A recent publicly indexed Ticketmaster desktop screenshot matching the current structure was inspected at 980 x 450. It clearly exposes both header rows, but its publication/capture date and original viewport are not authoritative live measurements.
- Direct live rendering at 1280-1920 px and breakpoint/scroll inspection was attempted, but the in-app browser runtime could not start.

## Reference confidence

**STRONGLY SUPPORTED BY CURRENT PUBLIC EVIDENCE**

Current Ticketmaster pages directly support the full information architecture and accessible control purposes. The two-row visual treatment is supported by a matching public screenshot, while exact current-live dimensions, responsive transitions, hover behavior, and scroll behavior remain unverified.

## Global-header boundary

The global header ends after the blue primary-navigation row. Homepage location, date, and event-search controls below it are part of Discover and remain out of scope. The compact search affordance physically rendered in the primary row is part of this shell; its behavior is deferred.

## Findings

| Detail | Finding | Classification |
| --- | --- | --- |
| Rows | Black utility strip over blue primary navigation | Directly observed in matching screenshot |
| Total height | Approximately 94 px | Measured from screenshot |
| Utility height | Approximately 24 px | Measured from screenshot |
| Main height | Approximately 70 px | Measured from screenshot |
| Width strategy | Full-width rows; content follows viewport rather than an obvious centered max-width | Visually estimated |
| Gutters | Approximately 16 px | Measured approximately |
| Utility background | Near-black (`#111`) | Visually estimated |
| Main background | Ticketmaster blue, close to existing `primary` (`#026cdf`) | Visually estimated |
| Border/shadow | No visible shadow; row colors create separation | Directly observed |
| Country | Circular US flag plus `US`, left side of utility strip | Directly observed |
| Utility order | Hotels, Sell, Gift Cards, Help, VIP, PayPal partner badge | Directly observed and supported by current page output |
| Branding | White lowercase italic wordmark at main-row left, approximately 120 x 24 px | Measured approximately |
| Categories | Concerts; Sports; Arts, Theater & Comedy; Family; Cities; More | Current public structure |
| More | Button semantics; exact chevron treatment is uncertain | Structure directly supported; visual treatment uncertain |
| Search | Compact bordered search shell with small `SEARCH` label, prompt, and search icon | Directly observed in matching screenshot; current output calls it a toggle |
| Account | Outline person icon followed by `Sign In/Register` | Directly observed and current structure supported |
| Utility typography | Approximately 12 px, regular white text | Measured approximately |
| Category typography | Approximately 13-14 px, medium white text | Measured approximately |
| Search icon | Approximately 20 px | Measured approximately |
| Account icon | Approximately 18-20 px | Measured approximately |
| Sticky/scroll | Could not be reliably inspected | Uncertain; static is least speculative |
| Hover | Subtle tonal/background changes appear plausible but could not be directly exercised | Uncertain |
| Focus | Not observable in screenshot; project focus ring should remain visible | Accessibility implementation choice |
| Breakpoint | Desktop is evidenced at 980 px; exact switch point is unverified | Uncertain; retain existing 768 px architecture |

## Scope decision

Implement a static, Server Component-compatible desktop shell using two rows. Destination controls remain buttons where routes do not yet exist; branding links to `/`. Country, More, search, and account behavior remain deferred. At narrower desktop widths the search shell collapses to an icon and right-side account text may visually compress, avoiding collisions without changing the existing mobile breakpoint.

## Implementation comparison

The first pass was compared against the inspected 980 x 450 reference image. Its three largest differences were that the PayPal partner badge disappeared below 1024 px, category text stayed at the smaller fallback size at 980 px, and the independent wordmark had no explicit reference-sized width. The badge and 13 px category treatment now begin at 900 px, and the wordmark occupies an approximately 120 x 24 px box. Row heights, full-width color blocks, 16 px outer gutters, navigation order, compact bordered search shell, and account placement match the strongest visible evidence. Category spacing remains intentionally compact to prevent collisions. Exact wordmark glyph geometry, live hover treatment, sticky behavior, and transitions cannot be validated from the static reference and remain approximations.
