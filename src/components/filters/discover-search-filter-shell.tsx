import type { ReactNode } from "react";

import { DiscoverKeywordSearch } from "@/components/filters/discover-keyword-search";

export function DiscoverSearchFilterShell({
  categoryNavigation = null,
}: Readonly<{ categoryNavigation?: ReactNode }>) {
  return <DiscoverKeywordSearch categoryNavigation={categoryNavigation} />;
}
