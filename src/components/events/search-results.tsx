import { EventCard } from "@/components/events/event-card";
import { toEventCardData } from "@/components/events/event-card-data";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import type { EventSearchResult } from "@/types/event";

type SearchResultsProps = Readonly<{
  keyword: string;
  result?: EventSearchResult;
  isPending: boolean;
  isError: boolean;
}>;

const artwork = [
  "from-[#171042] via-[#5339a6] to-[#ce52ab]",
  "from-[#00335f] via-[#006ca8] to-[#31c4d7]",
  "from-[#7c2415] via-[#d05425] to-[#f6b641]",
  "from-[#091d62] via-[#174db2] to-[#7678ed]",
] as const;

export function SearchResults({
  keyword,
  result,
  isPending,
  isError,
}: SearchResultsProps) {
  return (
    <section
      aria-labelledby="search-results-heading"
      className="border-b border-border bg-surface"
    >
      <div className="mx-auto max-w-[1120px] px-4 py-7 md:px-0 md:py-10">
        <h2
          id="search-results-heading"
          className="text-[22px] leading-7 font-bold text-foreground md:text-[24px] md:leading-8"
        >
          Search Results for &ldquo;{keyword}&rdquo;
        </h2>

        <div className="mt-5 md:mt-6">
          {isPending ? (
            <LoadingState compact message="Loading search results…" />
          ) : isError ? (
            <ErrorState
              compact
              title="Search results unavailable"
              description="We couldn't load search results right now."
            />
          ) : result?.events.length === 0 ? (
            <EmptyState
              compact
              title="No events found"
              description={`No events found for “${keyword}”.`}
            />
          ) : result ? (
            <div
              data-testid="search-results-grid"
              className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              {result.events.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={toEventCardData(event, "event")}
                  artworkClassName={artwork[index % artwork.length] ?? artwork[0]}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
