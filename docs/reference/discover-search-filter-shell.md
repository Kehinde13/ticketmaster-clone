# Discover search and filter shell reference

Researched on 2026-09-04.

## Evidence

- Ticketmaster US homepage (`https://www.ticketmaster.com/`), search results (`https://www.ticketmaster.com/search?q=concert`), and concerts discovery (`https://www.ticketmaster.com/discover/concerts`) confirm Location, City or Zip Code, Current location, Dates, All Dates, and Artist, Event or Venue semantics.
- A public 2025 US desktop capture shows a centered white control rail on Ticketmaster blue: location, date, event search, then a blue Search button.
- Ticketmaster's public mobile material supports a compact `What's Happening in …` heading followed by one full-width event-search field. The available complete mobile capture is older and from the UK, so exact current US colors and measurements remain approximate.
- Live browser rendering was unavailable.

## Responsive structure

- Desktop: blue full-width band; approximately 1120 px maximum control width; 60 px white control rail; location and date segments followed by a flexible search segment and inset Search button.
- Mobile: white surface; location heading/affordance followed by a 52 px bordered search field. Desktop location/date segments and the separate submit button are hidden.
- Controls use square-to-subtle corners, light gray dividers, 16 px body text, and approximately 20 px Lucide icons.

## Implementation comparison

The first implementation placed the mobile search icon on the left, used a 20 px mobile heading that wrapped too readily at 320 px, and made the desktop blue band too vertically compressed and symmetric. The refinement moves the mobile icon to the reference-supported right edge while retaining its desktop-left position, reduces the mobile heading to 18 px, and uses 28 px above plus 48 px below the 60 px desktop rail. Exact live breakpoints, current US mobile background treatment, and icon artwork remain approximations.
