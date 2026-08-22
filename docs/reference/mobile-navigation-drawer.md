# Mobile navigation drawer reference

Inspected on 2026-08-20.

## Sources and confidence

- Ticketmaster US homepage (`https://www.ticketmaster.com/`) and concerts discovery page (`https://www.ticketmaster.com/discover/concerts`): current public structure confirms the primary category labels **Concerts**, **Sports**, **Arts, Theater & Comedy**, and **Family**.
- A publicly indexed October 2025 Ticketmaster US mobile-web screenshot confirms the blue header's hamburger trigger, but does not show its open state.
- Current consumer-site open-drawer screenshots were not available from reliable public results. Account Manager and native-app menus were rejected as different products.
- Direct inspection at 375 x 812, 390 x 844, and 430 x 932 was attempted, but the in-app browser runtime could not start. Open-state layout and interaction values below are intentionally classified as approximations or uncertain.

## Findings

| Detail | Finding | Classification |
| --- | --- | --- |
| Entry direction | From the left, following the observed left-edge hamburger trigger | Approximate; not directly observed |
| Width | Viewport width minus 48 px, capped at 360 px | Implementation approximation |
| Height | Full dynamic viewport height | Implementation approximation |
| Header treatment | Drawer covers the page header and has its own 52 px top row | Implementation approximation |
| Backdrop | Black at 40% opacity over the remaining page | Implementation approximation |
| Surface | White with a subtle right-edge shadow | Implementation approximation |
| Top/horizontal padding | 4 px around the close target; 24 px for navigation rows | Implementation approximation |
| Menu row | 56 px minimum height, 16 px text, 600 weight | Implementation approximation |
| Divider | One border below the drawer top row; no speculative group dividers | Implementation approximation |
| Close control | 44 x 44 px target with a 26 px close icon | Implementation approximation |
| Content grouping | One primary-navigation group | Supported by current public category structure |
| Labels | Concerts; Sports; Arts, Theater & Comedy; Family | Observed in current public page structure |
| Signed-out content | No account label added because its placement in the current drawer could not be confirmed | Uncertain |
| Country control | Not added because drawer placement could not be confirmed | Uncertain |
| Nested sections | Not implemented; no reliable open-drawer evidence | Uncertain/deferred |
| Opening/closing motion | 220 ms left slide with simultaneous backdrop fade and an ease-out curve | Visually plausible implementation approximation |
| Backdrop dismissal | Closes the modal | Accessible modal convention; reference uncertain |
| Escape | Closes the modal | Accessible modal behavior |
| Focus | Moves into the modal, remains trapped, and returns to Menu on close | Accessible modal behavior |
| Body scroll | Locked while open | Accessible modal behavior |
| Drawer scrolling | Navigation region scrolls independently when needed | Implementation behavior |
| Reduced motion | Translation and fade duration removed | Accessibility behavior |

## Scope decision

Only the reliably supported top-level category labels are rendered. Rows are inactive buttons so they do not create broken application routes. Destination pages, nested categories, country selection, authentication, search, and utility links remain deferred.

## Implementation comparison

Live screenshot comparison was not available because the in-app browser runtime could not start. The first-pass review therefore compared the implementation against the current public structure, the recent closed-header screenshot, and the requested modal contracts rather than claiming a pixel comparison.

The three largest risks were speculative menu content, an edge-to-edge sheet that would hide any backdrop, and a modal remaining logically open after resizing to desktop. The implementation limits content to the four currently evidenced categories, leaves 48 px of backdrop until the 360 px width cap, and now closes local dialog state when the viewport reaches the existing 768 px desktop breakpoint.

Drawer width, open-state typography, backdrop opacity, motion, and the presence of a visible `Menu` top row remain approximations. These should be rechecked against the live consumer drawer when browser access is available.
