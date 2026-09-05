# Discover Entertainment Guides reference

Research date: September 5, 2026

## Reference

- Page inspected: current Ticketmaster US homepage (`https://www.ticketmaster.com/`).
- Required viewports: 390 x 844 and 1440 x 900.
- Direct Playwright navigation reached Ticketmaster but received HTTP 403 after the cookie surface. The current public server-rendered HTML was then retrieved with a desktop browser user agent and rendered with Playwright at both viewports for structural screenshots and computed measurements.
- Current public output directly verified five guide labels and their order: NBA Basketball Tickets, NHL Hockey Tickets, MLS Soccer Tickets, MLB Baseball Tickets, and Broadway Tickets.
- The screenshots reproduced layout and typography from current inline styles but not remote guide images. Media composition and image-specific details therefore remain intentionally original.

## Observed structure

- The section follows Popular Near You and precedes Discover More.
- A 1px `#bfbfbf` top divider and approximately 32px vertical section padding are measured.
- The heading is uppercase, bold, approximately 22px/24px, with 0.02em tracking; the card track starts 24px below it.
- Media uses a measured 16:9 ratio, 4px outer radius, and subtle `0 1px 4px` shadow.
- Titles and descriptions use approximately 16px/22px type. Descriptions are muted and begin 4px below their title.
- At 720px and above, all five cards form equal columns with a measured 24px gap.
- Below 720px, the cards remain in one horizontal scrolling row with a measured 16px gap. At 390px, the 358px content track produced approximately 240px cards, leaving a useful partial next-card preview.
- The live cards are links with stronger media elevation and linked-title treatment on hover/focus. Destination wiring is deferred in this prototype, so the implementation uses honest, non-interactive articles rather than fake or broken links.

## Implementation comparison

The first local production capture was compared with the Playwright-rendered public reference at 390 x 844 and 1440 x 900. The three largest first-pass differences were:

1. Supporting-copy line lengths were too uniform, while the reference produces taller sports summaries and a notably shorter Broadway summary. The original copy was retuned to recover that hierarchy without copying Ticketmaster text.
2. The shared muted token was slightly cooler than the measured reference `#646464`. The section now uses the local measured value for guide summaries.
3. The initial artwork had inconsistent visual weight across the track. Focal shapes were sized and positioned per card so the five original 16:9 compositions read with comparable density at both responsive sizes.

The final capture retains the previously verified 1120px application content alignment. Ticketmaster's server-rendered desktop capture reserved a right-side rail and exposed a 1012px guide region, so its resulting approximately 183px cards are documented rather than imposed on the rest of the established Discover shell. Mobile card width, track overflow, spacing, heading, divider, typography, and 16:9 media treatment closely match the measured reference. Remote Ticketmaster artwork and destination-linked hover behavior intentionally remain unmatched.
