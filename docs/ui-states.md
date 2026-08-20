# Shared UI states

`LoadingState`, `EmptyState`, and `ErrorState` are reusable presentation primitives in `components/ui`. Feature code supplies contextual content and composed actions; the primitives do not fetch data, retry requests, or contain domain logic.

## Usage

- Use `LoadingState` while content is pending. It provides a visible message and polite status announcement, with default and compact layouts.
- Use `EmptyState` when a successful response has no content to present. A title is required; description, decorative icon, and action slots are optional.
- Use `ErrorState` when content cannot be presented safely. It provides neutral fallback copy, an optional safe reference, and an action slot. Never pass raw exception messages, stacks, database errors, or provider responses to the component.

Actions are `ReactNode` slots so feature code can provide a link or Button without coupling these primitives to routing, networking, or retry behavior. All three remain Server Component-compatible; an interactive Client Component may be passed as rendered action content.

The loading icon is decorative because adjacent text communicates status. Its animation uses Tailwind's `motion-safe` and `motion-reduce` variants. Errors use `role="alert"`, while loading uses a polite, atomic `role="status"` region. Empty content is a labelled section and is not announced as an error.

Feature-specific skeletons are deferred until the real components exist, because useful skeletons should reproduce their final layout rather than introduce generic placeholder geometry.

## Reference observations

Public Ticketmaster event availability errors observed on August 20, 2026 use a short prominent heading, a single supporting sentence, an optional technical reference, and a direct retry action. Public event listings also use compact result counts and end-of-results messaging with a reload action. These observations informed the hierarchy and composable action slot, not universal copy.

Exact visual measurements, loading animation behavior, and narrow-screen spacing were not reliably observable in the available browser environment. The centered alignment, spacing, icon sizes, and compact variant are therefore independent approximations based on this project's existing semantic tokens and typography.
