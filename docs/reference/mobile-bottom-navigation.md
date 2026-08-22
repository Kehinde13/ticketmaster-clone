# Mobile bottom navigation reference

Inspected on 2026-08-21.

## Sources and confidence

- Ticketmaster US Help, “How do I use the Ticketmaster App?”: current official documentation states that Apple users navigate with buttons at the bottom, while Android users use the upper-left menu. The same page currently describes Discover, favorites/personalization, ticket management, Sell, and Account areas.
- Apple App Store listing for Ticketmaster version 273.6, released 2026-08-11: current official listing confirms the app and its Discover, ticket access, and Sell functions. Its six current marketing screenshots were inspected, but they do not expose a complete bottom bar.
- Ticketmaster US Help, “How do I search for an event?”: current official article attachment shows an iOS five-item bottom bar. The screenshot date is not stated and its styling/labels must be treated as historical rather than proven current-2026 presentation.
- Google Play listing updated 2026-05-14: current Android listing was inspected for platform context. It does not contradict Ticketmaster Help’s statement that Android navigation uses an upper-left menu rather than the iOS bottom-button model.
- Direct app and local viewport inspection was attempted, but the in-app browser runtime could not start.

## Reference confidence

**PARTIALLY VERIFIED**

Current official evidence verifies the iOS bottom-navigation model and the five functional areas. Current exact tab artwork, measurements, and every visible label are not exposed together in a 2026 screenshot. The strongest complete official visual is older and is used cautiously for proportions only.

## Navigation structure

| Position | Older official visual | Current/project shell | Evidence |
| --- | --- | --- | --- |
| 1 | Home | Discover | Current Help uses “Discover”; project destination |
| 2 | For You | For You | Official visual and current personalization description |
| 3 | My Events | My Tickets | Project terminology; current Help describes ticket management without exposing the tab label |
| 4 | Sell | Sell | Current Help explicitly describes the Sell section |
| 5 | My Account | My Account | Older official visual; current Help calls the area Account |

## Visual findings

| Detail | Finding | Classification |
| --- | --- | --- |
| Tab count/order | Five equal-width destinations in the order above | Directly observed in older official iOS screenshot; current functions supported |
| Position | Fixed to the bottom and remains visible over scrolling content | Directly observed in official iOS screenshot |
| Background | Opaque white, edge-to-edge | Directly observed in official iOS screenshot |
| Navigation content height | Approximately 60–64 px before safe area | Measured approximately from 375 px-equivalent screenshot |
| Safe area | White region containing the iPhone home indicator, approximately 34 px in the reference device | Directly observed; implementation should use dynamic safe-area inset, not a fixed 34 px |
| Divider | Thin gray top border; no floating-card treatment | Directly observed |
| Shadow | None or visually negligible | Visually estimated |
| Icons | Discovery/search, heart, ticket, sell/money, account/person | Directly observed semantic concepts; exact current artwork uncertain |
| Icon size | Approximately 24–28 px | Measured approximately |
| Labels | Always visible | Directly observed |
| Label typography | Approximately 11–12 px, regular weight | Measured approximately |
| Icon/label gap | Approximately 2–4 px | Measured approximately |
| Active state | Blue icon and blue label; no pill or top indicator | Directly observed in older official screenshot |
| Inactive state | Medium-gray icon and label | Directly observed in older official screenshot |
| Distribution | Five equal-width centered controls | Directly observed |
| Scroll behavior | Bar remains attached to viewport bottom | Directly observed in static app screenshot; exact dynamic behavior uncertain |

## Platform difference

This PWA intentionally adopts the iOS-style persistent bottom navigation as its application shell. Current Ticketmaster Help says Android uses the upper-left hamburger menu instead; the existing project drawer already represents that separate global/category-navigation pattern.

## Scope decision

Render five non-routing button shells using project terminology: Discover, For You, My Tickets, Sell, and My Account. Discover is the visual current destination for `/`. Future route state—not local or global UI state—will determine the selected destination when feature routes exist.

## Implementation comparison

Direct live-app and local browser screenshot comparison was unavailable because the in-app browser runtime could not start. The implementation was compared against the strongest complete official Help screenshot at its 375 px-equivalent scale, with the current App Store listing and current Help text used to constrain terminology and platform behavior.

The three largest first-pass differences were an undersized selected discovery icon, labels that appeared slightly too small, and icon-to-label spacing that was too tight. The refinement increased the selected icon from 25 px to 28 px, labels from 11 px to 12 px, and the gap from 2 px to 4 px.

The exact current-2026 icon artwork, whether current inactive icons are filled, and subtle color/elevation details remain approximations. At 320 px the five equal controls still fit, but the longest labels intentionally truncate rather than overlap if platform font metrics exceed the available width.
