# Design-system foundation

Research date: August 19, 2026.

## Public references

- [Ticketmaster US homepage](https://www.ticketmaster.com/)
- [Concert discovery and listing](https://www.ticketmaster.com/discover/concerts)
- [Search results](https://www.ticketmaster.com/search?q=concerts)

The pages were inspected for their visible hierarchy and recurring presentation. Exact computed styles were not available in the current browser environment, so numeric values below are independent approximations rather than extracted proprietary CSS.

## Findings and token mapping

- **Typography:** The reference uses a compact modern sans-serif with regular body copy and bold headings. Its production face may be proprietary, so `--font-family-sans` uses the system-safe Arial/Helvetica stack. Body text is 16px/1.5; the initial heading hierarchy is 32px, 24px, and 20px with restrained negative tracking.
- **Colors:** White content surfaces, a very light cool-gray secondary surface, near-black primary text, gray supporting text, and a vivid blue accent recur across the references. These map to `--background`, `--surface(-subtle)`, `--foreground(-secondary/-muted)`, `--primary`, and `--link`. Status colors are accessible foundation values, not reference measurements.
- **Spacing:** Pages favor compact controls and cards inside generous section spacing. The foundation uses 16px mobile and 24px larger-screen gutters, 48px sections and controls, 16px card spacing, and an approximate 1280px application container.
- **Radii:** Controls appear modestly rounded, while larger surfaces and overlays are softer. Approximate tokens are 8px, 12px, and 16px respectively.
- **Borders and elevation:** Light-gray dividers do most separation work. Surface shadow is intentionally subtle; a stronger shadow is reserved for future overlays.
- **Responsive behavior:** The public pages condense multi-column discovery/listing content and controls on narrow screens. Tailwind's standard breakpoints are retained because no reliable evidence justified a custom breakpoint.

## Accessibility decisions

The chosen foreground, supporting text, blue link/primary, and status colors maintain strong contrast on white. White text on `--primary` exceeds the normal-text contrast target. The focus ring uses a darker blue than the primary accent for visibility, remains present for keyboard focus, and is offset from component edges.

Semantic CSS custom properties are the source of truth. Tailwind 4 `@theme inline` exposes only useful utility-facing colors, layout measurements, radii, and shadows; unique future reference measurements may still use local values when they are not system decisions.

## shadcn token mapping

shadcn primitives reuse the existing `background`, `foreground`, `primary`, `primary-foreground`, and `border` tokens directly. Its `card` and `popover` roles map to `surface`; `secondary`, `muted`, and `accent` map to `surface-subtle`; `input`, `ring`, and `destructive` map to `border`, `focus-ring`, and `error`. No separate dark theme or competing palette is defined.
