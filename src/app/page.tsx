import { DiscoverCategoryNavigation } from "@/components/filters/discover-category-navigation";
import { DiscoverSearchFilterShell } from "@/components/filters/discover-search-filter-shell";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <DiscoverSearchFilterShell />
      <DiscoverCategoryNavigation />
      <div aria-hidden="true" className="min-h-80" />
    </main>
  );
}
