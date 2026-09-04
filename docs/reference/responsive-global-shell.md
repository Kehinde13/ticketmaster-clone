# Responsive global shell audit

Audited on 2026-09-04.

Browser rendering was unavailable. Static CSS/layout behavior was checked at 320, 375, 390, 430, 600, 700, 767, 768, 769, 820, 900, 980, 1024, 1280, 1440, and 1920 px, then verified through the production build and HTTP runtime.

## Problems and fixes

- At 900 px, category type, the full 244 px search shell, and account text expanded together and could exceed the primary row. Category type now increases at 1024 px, search expands to 200 px at 900 px and 244 px at 944 px, and account text appears at 1100 px.
- No mobile overflow, clearance, or layering defect was found. Five equal bottom-navigation columns remain bounded by `min-w-0`; page clearance exactly matches the 64 px bar plus the safe-area inset; the drawer/backdrop remain above the bottom bar.

## Final boundary

- Mobile shell: below 768 px.
- Desktop shell: 768 px and above.

The 768 px boundary is retained because the compact desktop treatment fits there, the drawer closes at the same media query, and every mobile/desktop visibility rule uses the same boundary. CSS `display: none` keeps the inactive shell out of layout and the accessibility tree. Exact browser font metrics and visual comparison remain pending a working browser connection.
