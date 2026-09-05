# Discover Highlights reference

Researched on 2026-09-05.

## Evidence

- The current Ticketmaster US homepage places `Highlights` after the discovery controls and before `Popular Near You`.
- Current public output consistently exposes four otherwise unlabeled highlight items. It does not reveal the current US campaign artwork or enough semantics to support arrow controls.
- Ticketmaster's current UK homepage confirms the same section ordering and uses promotional highlight content, but serves only as secondary structural evidence.
- Live browser rendering was unavailable, so exact media, card measurements, and mobile spacing remain visual approximations.

## Responsive structure

- Wide desktop: four dense 16:9 promotional cards in a maximum 1120 px content area, separated by approximately 16 px gaps.
- Tablet: three cards fit within the visible row, with native horizontal overflow for the remainder.
- Mobile: one approximately 82vw card plus a visible portion of the next card, using touch scrolling and scroll snap.
- Original CSS gradients and geometric decoration stand in for campaign artwork. Neutral prototype labels are not presented as current Ticketmaster promotions.
- No arrows or pagination are included because current US evidence does not verify them.

## Implementation comparison

A static comparison of the first layout values found that the cards were too tall, mobile cards were nearly full-width, and the heading had excessive space above it. The refinement uses a denser 16:9 ratio, reduces mobile cards to 82vw to reveal the next item, and sets the section spacing to 32 px on mobile and 40 px on desktop. Exact artwork and current campaign typography remain approximations.
