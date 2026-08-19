# Ticketmaster-Style PWA — Codex Instructions

## Project Goal

Build a highly faithful Ticketmaster-style Progressive Web App from scratch.

This is a competition project. The objective is to reproduce the publicly observable Ticketmaster experience as closely as practical in:

- layout
- navigation
- responsive behavior
- search
- country/location/date filtering
- event discovery
- event details
- ticket selection
- pricing
- seat information
- add-ons
- My Tickets
- Sell
- My Account
- loading/error/empty states
- animations
- mobile interactions
- PWA behavior

Use independently written code.

Do not attempt to obtain private Ticketmaster source code, credentials, internal APIs, restricted data, or private systems.

Public Ticketmaster webpages, publicly visible browser behavior, public documentation, public APIs, and screenshots supplied to the project may be studied as references.

---

# Golden Rule

NEVER build the entire application or an entire major phase in one task.

Always work in small, independently testable increments.

For every implementation task follow:

RESEARCH → PLAN → IMPLEMENT ONE SMALL FEATURE → RUN → TEST → COMPARE → FIX → VERIFY → STOP

Do not automatically start the next major feature.

Quality and fidelity are more important than amount of code.

---

# Before Changing Code

Before making changes:

1. Read this `AGENTS.md`.
2. Inspect the relevant repository files.
3. Understand the current implementation.
4. Identify the smallest reasonable scope for the requested task.
5. Research the current public Ticketmaster experience if the task involves Ticketmaster-facing UI or behavior.
6. Prefer current official documentation when checking framework or library behavior.

Do not make speculative architecture changes without first inspecting the repository.

Do not rewrite working code unnecessarily.

---

# Reference Research

Before implementing any Ticketmaster-facing feature, study only the relevant portion of the current public experience.

Research may include:

- publicly accessible Ticketmaster webpages
- supplied screenshots
- responsive layouts
- browser inspection of publicly visible behavior
- public Ticketmaster documentation
- public API documentation

Study details such as:

- layout
- dimensions
- spacing
- typography
- colors
- borders
- shadows
- icons
- card proportions
- button sizes
- sticky elements
- bottom sheets
- modals
- filters
- hover states
- active states
- disabled states
- loading states
- transitions
- animations
- desktop behavior
- tablet behavior
- mobile behavior

Do not settle for a generic ticket marketplace design when the public reference can be studied more accurately.

---

# Screenshot Workflow

When a screenshot is supplied:

1. Inspect the screenshot carefully.
2. Break the screen into components.
3. Analyze proportions and hierarchy.
4. Estimate spacing, dimensions, typography, and colors.
5. Implement the smallest requested section.
6. Run the application.
7. Compare the implementation with the screenshot.
8. Identify the largest visual differences.
9. Fix those differences.
10. Repeat until convincing.
11. Stop when the requested scope is complete.

A screen should not be considered complete merely because the same elements exist.

Visual similarity matters.

---

# Fidelity Priority

When refining UI, prioritize in this order:

1. layout
2. positioning
3. navigation
4. component dimensions
5. spacing
6. typography
7. colors
8. responsive behavior
9. buttons and cards
10. icons
11. borders and shadows
12. animations
13. micro-interactions

Fix large visible differences before minor details.

---

# Preferred Stack

Use the following unless the existing implementation or a strong technical reason requires otherwise:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide icons
- React Hook Form
- Zod
- TanStack Query for server state
- Zustand only when justified for global client state
- PostgreSQL
- Prisma
- Vitest
- React Testing Library
- Playwright

Use current stable mutually compatible versions.

Do not introduce a dependency simply because it appears in this list.

Add dependencies only when the current task requires them.

---

# Application Structure

Prefer this structure as the application grows:

```text
src/
  app/
  components/
    ui/
    layout/
    navigation/
    events/
    filters/
    tickets/
    account/
    selling/
  lib/
    api/
    auth/
    db/
    validation/
    utils/
  hooks/
  stores/
  types/

prisma/
tests/

# Engineering Rules

Keep changes narrowly scoped to the current task.

Before creating a new component, utility, hook, store, service, route, or abstraction, check whether an existing one should be extended.

Prefer Server Components by default. Use Client Components only when browser APIs, client state, effects, event handlers, or interactive behavior require them.

Keep external API credentials and sensitive operations server-side.

Do not hard-code data that should eventually come from an API or database unless the current task explicitly requires temporary mock data.

When mock data is necessary, isolate it so it can be replaced without rewriting UI components.

Do not introduce premature abstractions.

Do not refactor unrelated code while implementing a feature.

Do not silently change architecture, dependencies, configuration, or database design outside the scope of the task.

Preserve responsive behavior and accessibility while matching the visual reference.

# Verification

After implementation, run the checks relevant to the change. As the project grows these may include:

- lint
- type checking
- unit tests
- component tests
- Playwright tests
- production build

If a check fails because of your changes, fix it before finishing.

Never claim a test passed unless it was actually executed successfully.

For visual tasks, running the build is not enough. Inspect the rendered result when possible.

# Task Completion

At the end of every implementation task report:

Changed: files created or modified.
Implemented: what was completed.
Tested: commands/tests actually executed.
Result: pass/fail and relevant issues.
Remaining: intentionally unfinished work.
Next: the smallest recommended next task.

Do not begin Next automatically.

# Git

Keep changes small and logically grouped.

Do not create commits unless explicitly asked.

Do not discard or overwrite user changes unrelated to the current task.

# Final Rule

The goal is not maximum code generation. The goal is a progressively built, tested, visually faithful application.

Research → inspect → plan → implement → run → test → compare → fix → verify → stop.