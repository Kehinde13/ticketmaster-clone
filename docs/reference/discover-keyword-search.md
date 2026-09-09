# Discover keyword search reference

Research date: 2026-09-08

## Reference

- Current Ticketmaster US homepage: confirmed the `Artist, Event or Venue` search affordance.
- Current Ticketmaster US `/search?q=...` output: confirmed a submitted keyword produces an `Events` result region with date, event name, venue, and city/state hierarchy.
- Ticketmaster Discovery API documentation: confirmed keyword event search as the provider capability behind the normalized application contract.
- Automated access exposed current public structure and content, but not dependable pixel measurements. Layout measurements below are implementation estimates.

## Integration decision

Phase 4.9 adds an inline Discover result region after category navigation and before Highlights. The existing homepage discovery sections remain visible. The form submits only a trimmed keyword with the fixed US/page context; location, date, and category controls remain inert.

## Responsive results

- Mobile: one scan-friendly card per row with a 32px row gap (implementation value), avoiding a horizontal carousel and page overflow.
- Small/medium screens: two columns from the existing `sm` breakpoint.
- Wide desktop: four columns within the established 1120px content container, with 20px column gaps and 32px row gaps (implementation values).
- Cards reuse the established `EventCard` image, date, name, venue, and location hierarchy.

## States

Loading, empty, and error feedback is isolated beneath the results heading. Errors use generic application copy; missing provider configuration and API error codes are not exposed. Clearing the field removes the entire result region and does not submit a blank query.

## Implementation comparison

The three largest first-pass differences were:

1. Ticketmaster's dedicated search route favors dense vertical result rows; the inline Discover context needed image-led cards. The implementation retains accepted Discover cards but uses a non-carousel grid for faster scanning.
2. A four-column layout became too compressed at intermediate widths. The grid now steps from one to two to four columns.
3. Result feedback initially risked displacing the whole page. Loading, empty, and error states now stay compact within the dedicated section while the search shell and all homepage content remain present.

Remaining approximation: the inline result section has no exact current Ticketmaster counterpart, so its grid density and spacing are adapted from the project's accepted Discover card system.
