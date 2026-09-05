# Discover category navigation reference

Researched on 2026-09-05.

## Evidence

- Ticketmaster US homepage (`https://www.ticketmaster.com/`) and concerts discovery (`https://www.ticketmaster.com/discover/concerts`) confirm the labels Concerts, Sports, Arts, Theater & Comedy, and Family.
- Current US desktop captures expose these categories as restrained text navigation rather than pill controls.
- Ticketmaster's public mobile material shows compact outlined category controls following the event-search field. The available complete mobile visual is older and from the UK, so US labels come from current US output while dimensions remain approximate.
- No current evidence establishes an `All Categories` control or selected category on the general homepage, so neither is invented.
- Live browser rendering was unavailable.

## Responsive treatment

- Mobile: one horizontal, touch-scrollable row with outlined rectangular controls, nowrap labels, and approximately 44 px targets.
- Desktop: centered text controls in a white row, without mobile borders; approximately 48 px high with wider gaps.
- The navigation sits immediately after the Discover search/filter shell and does not change category state or navigate.

## Implementation comparison

The first pass made the mobile targets 40 px, kept the desktop row too close to the blue search band, and used overly tight desktop spacing. The refinement increases mobile targets to 44 px, adds 16 px mobile and 20 px desktop vertical breathing room, and widens desktop gaps to 32 px. Exact current mobile spacing and hover treatment remain approximations.
