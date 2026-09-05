# Discover Popular Near You reference

Researched on 2026-09-05.

## Evidence

- The current Ticketmaster US homepage places `Popular Near You` immediately after `Highlights`, with `Concerts` as its first row and category/name content for each item.
- Current Ticketmaster concert and sports discovery output confirms the event hierarchy of date/time, event name, city/state, and venue. It does not expose prices for these cards.
- Current public visual references support dense landscape media with information beneath it and minimal outer card chrome.
- Live browser rendering was unavailable. Exact current homepage media, hover behavior, and smaller-screen measurements remain approximate.

## Card and row structure

- Card anatomy: original 3:2 media, category, blue date/time, two-line event name, then venue and location.
- No price, favorite, badge, arrow, or destination link is included because these were not verified for the current row or cannot yet be wired honestly.
- Six neutral prototype concerts represent local UI data; they are not current Ticketmaster listings.
- Wide desktop: four approximately 268 px cards inside a maximum 1120 px container with 16 px gaps.
- Mobile: cards use approximately 72vw up to 280 px, expose part of the next card, and use native touch scrolling with scroll snap.

## Implementation comparison

A static comparison of the first layout values found that 16:9 media looked too shallow, mobile cards were too wide, and metadata spacing was too loose. The refinement uses a 3:2 image ratio, caps mobile cards at 280 px with a 72vw basis, and tightens the category/date/title/venue stack to 4–12 px gaps. Exact current imagery and viewport-specific behavior remain approximations.

## Phase 3.5 comparison

- Current public output confirms the order Concerts, Sports, Arts, Theater & Comedy, then Family; the implementation now matches it.
- The first pass lacked per-row `See All` treatment and made later rows feel disconnected. Each row now has one aligned, category-labeled non-interactive shell while routing is deferred.
- Initial vertical spacing made four rows too tall. Consistent 40 px mobile and 48 px desktop row gaps preserve grouping without stretching the section.
