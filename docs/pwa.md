# PWA foundation

The application uses the native Next.js App Router manifest at `src/app/manifest.ts`. Next.js exposes it as `/manifest.webmanifest` and links it from rendered documents. Install icons live under `public/icons`; App Router metadata icons live at `src/app/icon.png` and `src/app/apple-icon.png`.

`Ticketmaster` is the temporary competition-project application identity required for this phase. It does not claim official status, ownership, authorization, or affiliation. The local icon is an original abstract ticket mark informed only by the public reference's simple, high-contrast blue direction; it does not copy the official wordmark or icon asset.

The manifest's `#026cdf` theme color maps to the design system's `--primary`, while `#ffffff` maps to `--background`. These concrete values must remain synchronized because manifests cannot consume CSS custom properties. The root layout exports theme color through the current `Viewport` API and supplies minimal Apple web-app metadata without restricting zoom.

## Installability

Supporting browsers can promote an application with a valid linked manifest and required fields/icons when it is served over HTTPS. Browsers treat `localhost` and loopback addresses specially for development. Browser and platform policies still determine whether installation is offered; no custom install prompt is included.

Modern installation does not require offline support. Service worker and offline caching are intentionally deferred until Phase 12. Connectivity banners, online/offline hooks, and retry coordination are also deferred until real network-backed features provide concrete requirements.

## Future caching policy

- **Safe / likely static:** stable application-shell assets, versioned static files, and stable icons may be candidates for caching.
- **Freshness-sensitive:** event availability, pricing, ticket inventory, search results, and account information require carefully bounded freshness rules.
- **Sensitive / transactional:** authentication, checkout, ticket ownership, barcode or entry information, selling operations, and POST or mutation responses must never be casually cached by a service worker.

The Phase 12 offline design must define expiry, invalidation, privacy, logout, and failure behavior before adding any fetch interception.
