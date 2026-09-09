# Discover country selector reference

Research date: 2026-09-09

## Current evidence

Current Ticketmaster US public output confirms a global `United States selected, change country` control before utility navigation. Ticketmaster Help confirms active international markets including the six initially supported here. Static HTML did not expose dependable open-state geometry, so the selector surface is an accessible, reference-informed approximation rather than a directly measured copy.

- Mobile: the existing black country strip remains the opener; selection uses a bottom-anchored sheet.
- Desktop: the existing compact utility-bar country control remains the opener; selection uses a centered dialog.
- Both: titled modal, dim backdrop, close control, searchable flag/name/code rows, one checkmark for the current selection, Escape/backdrop dismissal, and focus restoration through Base UI.

## Implementation comparison

1. A desktop-sized centered modal was too tall on mobile; it becomes an 85dvh-capped bottom sheet below 768px.
2. Plain text rows made markets hard to scan; concise emoji flags and right-aligned codes were added without an asset dependency.
3. Multiple selected cues were visually noisy; the final treatment uses only one trailing checkmark plus `aria-current`.

Dimensions are implementation values: 520px desktop width, 64px header, 48px search field, and minimum 56px country rows. Open-state dimensions remain approximate.
