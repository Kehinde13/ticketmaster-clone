# Application architecture

The App Router in `src/app` owns routes, layouts, and route-level data composition. Shared presentation, infrastructure, state, and domain contracts live in the dedicated `src` areas documented alongside this file structure.

`components/ui` contains low-level shadcn-based primitives that this project may visually refine. These primitives must remain reusable and free of feature or business logic.

`components/ui/*-state` contains reusable presentation-only loading, empty, and error states. They perform no data fetching or domain logic; feature-level code supplies contextual content and composed actions.

`lib/env` owns typed environment access. Server environment modules are protected as server-only and must never be imported into client code.

`lib/db` owns server-only database infrastructure and the reusable Prisma Client entry point; it must not be imported into Client Components. `generated/prisma` contains generated client code only and no application business logic.

TanStack Query manages client-side server state through the application provider boundary. It complements rather than replaces Server Components for naturally server-owned data.

Vitest and React Testing Library cover unit and component behavior without live infrastructure. Future Playwright coverage will own browser-level App Router behavior and critical user flows, including async Server Components.

Mobile navigation interaction uses local state within a focused Client Component and an accessible modal primitive. It introduces no global state, server dependency, or feature/business logic; the root layout remains a Server Component.

The mobile drawer owns category and global utility navigation. The mobile bottom navigation represents primary application destinations. Its active destination will eventually derive from App Router route state rather than a separate global store.

The desktop shell uses a Server Component-compatible global header with separate utility and primary-category navigation. Mobile and desktop shells share a single responsive visibility boundary while keeping their different information structures independent.

Country/market preference is distinct from event location. The current mobile shell exposes only a static market affordance; a future selector will own switching and persistence, and feature data should consume normalized country codes when that work is introduced.

The App Router manifest owns installability metadata. Service-worker behavior is deferred until caching requirements are known; any future offline policy must distinguish static assets from freshness-sensitive and transactional data.

## Module boundaries

1. UI components consume internal domain types, never raw third-party API response shapes.
2. Provider adapters normalize external data into internal domain types before application features use it.
3. Secrets, database access, and other privileged logic remain in server-only modules.
4. Global client state is reserved for genuinely cross-cutting interactive state; prefer local or server state otherwise.
5. Feature-specific components stay in their matching feature folder.
6. Low-level, reusable visual primitives belong in `components/ui`.
7. Dependencies should flow from features toward shared internal contracts and utilities, without circular imports.
8. Avoid broad barrel exports; add a focused public entry point only when it creates a clear boundary.
9. Components are Server Components by default and become Client Components only when interactivity or browser APIs require it.
10. Application features depend on internal abstractions, not directly on external providers.

## Foundation top-level areas

`prisma` contains the Prisma schema and is the future home of reviewed migrations; no application models or migrations exist yet. `tests` contains the Vitest unit/component suite organized by application area. Browser-level end-to-end coverage remains deferred to the future Playwright foundation.
