# Mobile country affordance reference

Inspected on 2026-08-20.

## Reference research

- Ticketmaster US homepage (`https://www.ticketmaster.com/`): current public page output exposes the accessible text “United States selected, change country.”
- Ticketmaster US concerts discovery (`https://www.ticketmaster.com/discover/concerts`): inspected for global-shell consistency.
- Publicly indexed Ticketmaster US mobile-web screenshot published in October 2025: shows a black strip above the blue mobile header with a circular US flag and visible `US` label.
- Ticketmaster Canada and UK public pages/help material: inspected as evidence that Ticketmaster operates distinct country markets. Current US help documentation also lists the international Ticketmaster sites.
- Requested live inspection at 375 x 812, 390 x 844, and 430 x 932 was attempted, but the in-app browser runtime could not start.

## Reference confidence

**STRONGLY SUPPORTED BY CURRENT PUBLIC EVIDENCE**

Current Ticketmaster output directly confirms the control’s purpose and current country. A recent mobile-web screenshot clearly supports its placement and visible treatment, but direct live mobile interaction could not be performed.

## Findings

| Detail | Finding | Classification |
| --- | --- | --- |
| Placement | Separate global strip above the blue mobile header | Inferred from strong public mobile-web evidence |
| Surface | Near-black background | Visually estimated |
| Height | 47 px in the 492 px-wide screenshot | Measured from screenshot; current live value uncertain |
| Horizontal padding | About 12 px to the flag edge | Measured approximately from screenshot |
| Current country | United States | Directly supported by current public page output |
| Visible country text | `US` | Directly visible in mobile-web screenshot |
| Flag | Circular US flag, about 23 px | Measured approximately from screenshot |
| Flag/text gap | About 8 px | Measured approximately from screenshot |
| Typography | White, approximately 17 px, regular weight | Visually estimated |
| Country name | Not visibly spelled out in the compact strip | Directly visible in screenshot |
| Country code | `US` | Directly visible in screenshot |
| Chevron/icon | None visible | Directly visible in screenshot |
| Separator | No divider; contrast between black strip and blue header | Directly visible in screenshot |
| Active/pressed treatment | Could not be observed | Uncertain |
| Interaction result | Current page semantics identify it as a change-country control; destination surface was not opened | Purpose directly supported; resulting UI uncertain |

## Scope decision

Implement a static button shell above the existing mobile header with a small independently rendered circular US flag and visible `US` label. Its accessible name will identify the current country and purpose. Country selection, the country list, redirects, persistence, localization, and event filtering remain deferred.

## Implementation comparison

Direct live side-by-side comparison was unavailable. The implementation was compared with the saved 492 px-wide October 2025 mobile-web reference, so no current-live pixel claim is made.

The three largest first-pass differences were a visually flat blue flag canton, an overly bright circular rim, and a flag-to-label gap that appeared slightly tight. The refinement added a subtle dot texture at the rendered size, reduced the rim opacity, and increased the gap from 8 px to 10 px.

Final implementation values are 47 px row height, 12 px horizontal padding, 23 px flag, 10 px gap, and 17 px regular-weight visible text. The precise live flag artwork, active treatment, and destination opened on activation remain approximations or intentionally deferred.
