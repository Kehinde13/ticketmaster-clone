# Server-state foundation

TanStack Query 5 provides client-side server-state caching when interactive features need background refetching, invalidation, mutations, optimistic updates, or paginated/infinite loading. The application-wide `QueryClientProvider` lives in `src/app/providers.tsx`.

`src/lib/query/get-query-client.ts` creates a fresh `QueryClient` for every server render so requests cannot share cache data. In the browser it reuses one client across renders, including initial Suspense retries. Queries default to a 60-second `staleTime` to avoid immediately refetching server-prefetched data after hydration; other TanStack defaults remain unchanged.

## Data ownership

- Prefer Server Components and framework-native fetching when data is naturally server-owned and does not need rich client cache behavior.
- Use TanStack Query for interactive server state that benefits from caching and client-driven lifecycle behavior.
- TanStack Query is not the default answer for every data fetch.
- Zustand must not duplicate server state owned by TanStack Query.

When server prefetching becomes useful, use `QueryClient` → `prefetchQuery` → `dehydrate` → `HydrationBoundary`. Avoid rendering independently owned copies of changing data on the server and in a client query. No prefetching or hydration boundary exists yet because there are no application queries.

Client query functions should use appropriate HTTP, API, or provider boundaries rather than treating Next.js Server Actions as a general fetching mechanism. Invalidation should follow successful domain mutations and target only affected query data.

Event search options own a canonical `["events", "search", url]` key and pass
TanStack Query's `AbortSignal` to the client-safe `/api/events` fetcher. Retry is
disabled explicitly because a 503 may represent configuration, authorization,
quota, or network failure; the global 60-second stale-time policy remains the
single source of truth. Server-rendered homepage rows continue to call
`EventProvider` directly, while future interactive search uses this HTTP query
layer. URL shaping is client-owned, but validation remains server-authoritative.

Query cache persistence is disabled. Account, ticket, and transactional data require a deliberate security and PWA caching design before any browser persistence is introduced.

The non-sensitive country preference is separate from query-cache persistence. The server validates the `ticketmaster-country` cookie before initializing `CountryProvider` and before loading Popular Near You. A real selection persists the cookie, updates client context, and calls `router.refresh()` once so Server Components use the new country without discarding active client search state. Submitted keyword queries include the selected code in `EventSearchParams`, naturally separating country-specific cache entries.
