# Discover More reference

Research date: September 7, 2026

## Reference

- Source: current Ticketmaster US homepage (`https://www.ticketmaster.com/`).
- Direct Playwright navigation was attempted at 390 x 844 and 1440 x 900 and returned HTTP 403.
- Fresh public server-rendered HTML was retrieved with a desktop browser user agent, rendered with Playwright at both required viewports, measured, and captured successfully.
- Current output exposes six editorial cards in this order: A Look at the 2026 MLB Schedule and New Rules; What to Bring to a Concert; MLS 2026 Season FAQs; Get the Most Out of Your Ticketmaster Account; US Open Ticket Buying Guide; and 6 Broadway Shows to See This Summer in NYC.
- Categories are Sports, Ticket Tips, Sports, General Info, Sports, and Local Guide.

## Observed structure

- The section follows Entertainment Guides and precedes Popular Cities.
- A measured 1px `#bfbfbf` divider and 32px vertical section padding match the adjacent guide section.
- The uppercase heading is approximately 22px/24px with 0.02em tracking. Cards begin 32px below it.
- Each card contains 16:9 media, a 12px uppercase category, a two-line-clamped 16px/22px headline, a four-line-clamped 16px/22px muted summary, and a 12px uppercase `Discover More` CTA.
- Media has a measured 4px radius and subtle `0 1px 4px` shadow.
- At 1440px, the reference renders a 3 x 2 grid: approximately 329px cards inside the observed 1012px content rail, 8px horizontal gaps, and 16px vertical gaps.
- At 390px, cards are approximately 350px inside the 358px content width and scroll horizontally with an 8px gap. At 720px the current CSS exposes roughly two cards; at 900px it switches to three columns and two rows.
- Linked hover/focus treatments increase image elevation and underline/color the headline. Because local article routes are intentionally deferred, the prototype uses non-interactive articles and static CTA labels rather than false links.
- Ticketmaster artwork was not loaded or copied. Image content and destination behavior remain intentionally approximate.

## Implementation comparison

The first local production capture was inspected at 390 x 844 and 1440 x 900. Earlier Discover sections remained pixel-stable above the intentional addition. The three largest refinements were:

1. Percentage-based height and width values made the baseball, soccer, and tennis circles slightly elliptical in wide 16:9 media. Their geometry now derives from width with an explicit square aspect ratio.
2. The initial CTA inherited a brighter shared primary blue. It now uses the measured reference `#024ddf` locally.
3. The first track retained approximately 4px more bottom space than the reference wrapper/list combination. Bottom padding was reduced to reproduce the observed section rhythm.

The final implementation preserves the application's established 1120px centered content area. At 1440px this produces approximately 365px media cards rather than the approximately 329px cards in Ticketmaster's captured 1012px content rail; shrinking this section alone would break alignment with the completed Discover shell. The reference column formula, 8px horizontal and 16px vertical gaps, 16:9 media, type hierarchy, CTA placement, and responsive scrolling behavior are otherwise reproduced closely. Ticketmaster artwork and linked hover behavior remain intentionally unmatched.
