# Testing foundation

Vitest runs deterministic unit and component tests. React Testing Library renders components and queries them through user-observable content and accessible semantics; jsdom supplies the lightweight DOM environment. Tests live under `tests/` in folders that mirror the application area, such as `tests/components/ui`.

## Commands

- `npm test` runs the suite once and exits for CI and automation.
- `npm run test:watch` starts Vitest watch mode for local development.
- `npm run playwright:install` installs the pinned Chromium build after dependency installation or a Playwright upgrade.
- `npm run test:e2e` runs the Chromium visual suite at 390 x 844 and 1440 x 900.
- `npm run test:e2e:ui` opens Playwright UI mode for local inspection.
- `npm run test:visual:update` deliberately regenerates screenshot baselines; review every image diff before committing it.

Tests prefer role, label, and visible-text queries over DOM structure, CSS classes, or test IDs. Assertions describe public behavior rather than implementation details. Snapshots are not the default strategy and should be introduced only when they add clear value. Mocks stay local and minimal; do not mock databases, networks, routers, or providers unless a real test requires that boundary.

No shared render wrapper is needed yet. When query-driven components arrive, each test must receive a fresh TanStack `QueryClient` so cached state cannot leak between tests.

Vitest is not this project's strategy for async React Server Components. Synchronous Server Components and Client Components can be unit-tested, while complete App Router flows belong in the Playwright E2E layer. Components must not be converted to Client Components merely to make testing easier.

## Browser and visual tests

Playwright builds and starts the local Next.js production server on `127.0.0.1:3136` unless `PLAYWRIGHT_BASE_URL` points to an already-running environment. The initial suite uses Chromium projects at the project's primary mobile and desktop reference sizes. Failure traces, screenshots, and HTML reports are generated locally and ignored by Git.

Visual baselines are stored under `tests/visual/__screenshots__` and are intentionally committed. Because browser screenshots can vary across operating systems, baseline names include the project and platform. Update baselines only after reviewing the rendered page and confirming that the change is intentional.

## Test levels

- **UNIT:** Small functions and synchronous logic in isolation.
- **COMPONENT:** Component output and interactions from the user's perspective.
- **INTEGRATION:** Multiple application units working together where that provides useful confidence.
- **E2E:** Real browser application flows, owned by the future Playwright foundation.

jsdom tests validate content, semantics, conditional behavior, and interactions. They do not establish visual fidelity or require a browser, database, `DATABASE_URL`, or external network.
