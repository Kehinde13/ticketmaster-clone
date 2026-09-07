# Popular Cities reference

Research date: September 7, 2026

## Reference

- Source: current Ticketmaster US homepage (`https://www.ticketmaster.com/`).
- Direct Playwright navigation was attempted at 390 x 844 and 1440 x 900 and returned HTTP 403.
- Fresh public server-rendered HTML was retrieved with a desktop browser user agent, rendered with Playwright at both required viewports, measured, and captured successfully.
- Eight cities were directly verified in this order: New York City, Los Angeles, Las Vegas, Chicago, Atlanta, Nashville, Denver, and Miami.
- No state abbreviations are rendered. The section includes a top-right `See All` link shell whose accessible name is `See All Cities` in the reference.

## Observed structure

- Popular Cities follows Discover More and precedes Featured.
- A measured 1px `#bfbfbf` divider and 32px vertical padding match the preceding homepage sections.
- The uppercase heading is approximately 22px/24px with 0.02em tracking. A 44px-tall, bordered `See All` control shares its header row.
- Cards contain 16:9 photography with a 4px radius and subtle `0 1px 4px` shadow, followed by an 8px gap and a 16px/22px semibold city name. There are no state labels or descriptions.
- The row scrolls horizontally at both required viewports with a 16px gap and snap alignment.
- At 390px, the 358px content track produces approximately 240px cards, showing about 1.4 cards.
- At 1440px, the server-rendered 1012px reference rail produces approximately 190px cards and shows five complete cards. Current CSS switches to the five-card density from 720px.
- City cards and `See All` are links in the public reference. Local destination routes are deferred, so the prototype presents non-interactive articles and an honest static CTA shell instead of broken links.
- Ticketmaster city photography, linked hover elevation, and navigation behavior are intentionally not copied.

## Implementation comparison

The first local production capture was inspected at 390 x 844 and 1440 x 900. The new content was isolated below Discover More, and all previously approved sections remained visually unchanged. The three largest refinements were:

1. The original skyline glows carried too much visual weight at the compact mobile card size. Their opacity was reduced and a softer halo was added.
2. The first-pass building silhouettes and window marks were overly dense compared with the reference photography's softer tonal balance. Their contrast was reduced while preserving readable city-inspired forms.
3. The track retained approximately 4px more bottom space than the measured reference wrapper/list combination. Bottom padding was reduced to match the section rhythm.

The final implementation preserves the established 1120px application container. This yields approximately 211px cards at 1440px rather than the approximately 190px cards in Ticketmaster's captured 1012px content rail, while retaining the observed five-card density and alignment with every existing Discover section. The measured mobile width, 16px gaps, 16:9 media, title placement, heading/CTA row, and horizontal overflow behavior are closely reproduced. Photography, linked hover elevation, and city navigation remain intentionally deferred.
