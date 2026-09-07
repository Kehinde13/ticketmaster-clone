# Discover Featured reference

Research date: September 7, 2026

## Reference

- Source: current public `https://www.ticketmaster.com/` homepage output.
- Direct Playwright navigation at 390 × 844 and 1440 × 900 returned HTTP 403.
- Fresh server-rendered public HTML was saved and rendered in Playwright at both viewports. The isolated Featured section was captured and measured.
- Verified order: Hotels, Ticket Deals, VIP Packages, Sell on Ticketmaster.

## Observed structure

Each entry is a 16:9 promotional image followed by its title. Artwork uses a 4px rounded container, a subtle `0 1px 4px` shadow, and an 8px title gap. Titles are 16px semibold with approximately 22–24px line height. The section has a 1px gray top divider and an uppercase heading.

At 390px, the four cards stack. The measured image was 358 × 201px; entries used 32px bottom spacing. At 1440px, Ticketmaster placed Featured in a 332px desktop side rail, producing one 300 × 169px card per row with 24px between entries. The wider project Discover flow is retained here, so the same card anatomy is adapted to four compact columns rather than introducing a new page-wide side rail during final polish.

Uncertain details: remote source images did not load in the local HTML render, so their structure and sizing were observed but their current color treatment was not used. Destination functionality is intentionally deferred.

## Implementation comparison

The first local full-page render exposed three primary differences from the isolated current reference: the Featured heading lacked its 32 × 4px rule, the section used a 32px vertical inset instead of the measured 24px, and desktop title line-height was 22px instead of 24px. The heading rule, section inset, and responsive title line-height were corrected. The remaining desktop approximation is intentional: cards use a four-column 1120px content grid because introducing Ticketmaster's separate 332px page rail would require redesigning completed Discover sections.

The same full-page review found one page-level defect: a 320px placeholder spacer produced an unfinished ending. It was removed. Existing section gutters and dividers align at the 1120px desktop container; horizontal tracks remain clipped to their section, and the root shell retains safe-area-aware mobile bottom-navigation clearance.
