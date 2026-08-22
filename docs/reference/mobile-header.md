# Mobile header reference

Inspected on 2026-08-20.

## Sources and confidence

- Ticketmaster US homepage (`https://www.ticketmaster.com/`) and concerts discovery page (`https://www.ticketmaster.com/discover/concerts`): current public page structure confirmed the home branding and account entry point. The available text representation did not expose a reliable mobile layout.
- Publicly indexed Ticketmaster US mobile homepage screenshot published in October 2025: visually inspected at its native 492 px width. This is the strongest available visual reference, but it is not a live 2026 capture.
- Requested live viewport inspection at 390 x 844 and 375 x 812 was attempted, but the in-app browser runtime was unavailable. All pixel values below are therefore visually estimated rather than measured from current live rendering.

## Observed header

| Detail | Observation | Confidence |
| --- | --- | --- |
| Overall height | 52 px in the 492 px-wide saved screenshot | Measured from screenshot; current live value uncertain |
| Rows | One blue global-header row; the black country strip and white location/date/search region are separate UI | Visually observed |
| Background | Solid Ticketmaster blue, close to the existing `primary` token (`#026cdf`) | Visually estimated |
| Border/shadow | No visible divider or shadow | Visually observed |
| Horizontal padding | About 12 px from viewport edge to visible icon stroke | Measured approximately from screenshot |
| Left controls | Menu icon followed by the Ticketmaster wordmark | Visually observed |
| Wordmark | White, italic, about 158 x 25 px in the 492 px reference | Measured approximately from screenshot |
| Right controls | Outline account/profile icon | Visually observed |
| Search control | Not inside the blue global-header row; search is in the separate content region below | Visually observed |
| Country/location | Country is in a separate black strip above; location is in the content region below | Visually observed |
| Icon size | Menu about 26 px; account about 27 px | Measured approximately from screenshot |
| Control gaps | About 12 px between the menu's visible stroke and wordmark | Measured approximately from screenshot |
| Touch targets | Visual icons are compact; implementation should retain at least 44 x 44 px interactive targets | Accessibility-derived approximation |
| Typography | Lowercase white italic wordmark with a heavy sans-serif treatment | Visually estimated |
| Positioning | Static; sticky/fixed or scroll-altered behavior could not be reliably inspected | Uncertain; least-speculative choice |
| Focus/active behavior | Not observable in the available screenshot | Uncertain |
| Safe area | No inset treatment visible in ordinary mobile-browser rendering | Visually observed |

## Scope decision

The component will reproduce only the blue global-header row. Menu and account controls will remain presentational buttons with accessible names. The country strip, location/date controls, search panel, menu drawer, and account behavior belong to later tasks.

## Implementation comparison

Live side-by-side browser rendering was unavailable because the in-app browser runtime could not start. A source-image proportion check was performed instead; no claim of live screenshot comparison is made.

The three largest first-pass differences were a missing registered mark in the textual wordmark, a menu-to-wordmark gap that was too tight, and visible icon strokes sitting too far from the viewport edges. The refinement added the registered mark, changed the structural gap to 6 px (approximately 12 px between visible shapes), and reduced container padding to 4 px while retaining 44 px targets.

The final shell uses a 52 px height, 24 px textual wordmark, 26/27 px icons, and no divider or shadow. The wordmark's exact proprietary script shape, current-live viewport measurements, sticky behavior, and interactive pressed states remain approximations pending working live-browser inspection.
