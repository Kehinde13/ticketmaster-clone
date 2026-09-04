# Desktop More navigation reference

Researched on 2026-09-04.

## Sources and method

- Ticketmaster US homepage (`https://www.ticketmaster.com/`): current public output confirms a `More` button immediately after `Cities` in primary navigation.
- Ticketmaster US concerts discovery (`https://www.ticketmaster.com/discover/concerts`): current public output confirms the same ordering and button semantics across another page.
- Current public web and image searches were reviewed for an opened desktop `More` surface. Results showed closed headers, unrelated account menus, or old navigation designs; none reliably established the current US open state.
- Live desktop inspection was attempted for the requested 1280 x 800, 1366 x 768, 1440 x 900, and 1536 x 864 targets, but no browser connection was available. Consequently, none of those viewports was directly inspected and no open-state screenshot was captured.

## Reference confidence

**UNVERIFIED**

The current trigger and its position are supported by Ticketmaster's current public page output. The opened surface, contents, layout, and interaction could not be observed or established from reliable current public evidence.

## Findings

| Detail | Finding | Classification |
| --- | --- | --- |
| Trigger text | `More` | Directly supported by current public output |
| Trigger position | Immediately after `Cities` in primary navigation | Directly supported by current public output |
| Trigger semantics | Button | Directly supported by current public output |
| Trigger typography | Existing Phase 2.5 treatment is approximately 12-13 px semibold white text | Visually estimated from the previously inspected closed-header reference |
| Trigger chevron | Existing shell uses a downward chevron; the current public text output does not verify it | Uncertain |
| Trigger hover/focus/open treatment | Could not be exercised | Uncertain |
| Opening mechanism | Could not be exercised | Uncertain |
| Surface position and trigger alignment | Not observed | Uncertain |
| Surface width and height | Not observed | Uncertain |
| Background, border, radius, and shadow | Not observed | Uncertain |
| Internal padding and row height | Not observed | Uncertain |
| Visible labels and order | Not observed | Uncertain |
| Grouping, separators, icons, and chevrons | Not observed | Uncertain |
| Menu typography and row hover/focus states | Not observed | Uncertain |
| Opening and closing motion | Not observed | Uncertain |
| Outside-click dismissal | Not observed | Uncertain |
| Escape dismissal | Not observed | Uncertain |
| Keyboard navigation and focus restoration | Not observed | Uncertain |
| Tall-menu scrolling behavior | Not observed | Uncertain |

## Verified menu content

Current Ticketmaster desktop `More` menu contents could not be verified confidently.

Footer links, utility links, mobile drawer entries, and historical navigation screenshots were excluded because they do not establish the current US desktop `More` contents.

## Implementation decision

No dropdown is implemented. Adding a generic surface, dimensions, interaction model, or inferred destinations would violate the reference gate and risk reproducing outdated or unrelated information architecture. The existing Phase 2.5 `More` trigger remains unchanged until the current open state can be directly observed or supported by reliable current public evidence.
