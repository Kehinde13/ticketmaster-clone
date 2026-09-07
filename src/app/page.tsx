import { DiscoverHighlights } from "@/components/events/discover-highlights";
import { DiscoverMore } from "@/components/events/discover-more";
import { EntertainmentGuides } from "@/components/events/entertainment-guides";
import { PopularCities } from "@/components/events/popular-cities";
import { PopularNearYou } from "@/components/events/popular-near-you";
import { DiscoverCategoryNavigation } from "@/components/filters/discover-category-navigation";
import { DiscoverSearchFilterShell } from "@/components/filters/discover-search-filter-shell";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <DiscoverSearchFilterShell />
      <DiscoverCategoryNavigation />
      <DiscoverHighlights />
      <PopularNearYou />
      <EntertainmentGuides />
      <DiscoverMore />
      <PopularCities />
      <div aria-hidden="true" className="min-h-80" />
    </main>
  );
}
