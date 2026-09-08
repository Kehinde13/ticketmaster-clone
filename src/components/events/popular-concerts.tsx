import { connection } from "next/server";

import { toEventCardData } from "@/components/events/event-card-data";
import { EventTrack } from "@/components/events/event-track";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { loadPopularConcertEvents } from "@/lib/api/events/discover";

const artwork = [
  "from-[#171042] via-[#5339a6] to-[#ce52ab]",
  "from-[#00335f] via-[#006ca8] to-[#31c4d7]",
  "from-[#7c2415] via-[#d05425] to-[#f6b641]",
  "from-[#091d62] via-[#174db2] to-[#7678ed]",
  "from-[#3b3114] via-[#88711d] to-[#e4b644]",
  "from-[#321052] via-[#8b1b8c] to-[#e74477]",
];

type PopularConcertsProps = {
  loadEvents?: typeof loadPopularConcertEvents;
};

export async function PopularConcerts({
  loadEvents = loadPopularConcertEvents,
}: PopularConcertsProps = {}) {
  // Keep request-time rendering outside the provider catch boundary.
  await connection();
  let events;

  try {
    events = await loadEvents();
  } catch {
    return (
      <ErrorState
        compact
        title="Concert events are temporarily unavailable."
        description="Please try again later."
      />
    );
  }

  if (events.length === 0) {
    return (
      <EmptyState
        compact
        title="No concerts found"
        description="Check back soon for upcoming concerts."
      />
    );
  }

  return (
    <EventTrack
      events={events.slice(0, 6).map((event, index) => ({
        event: toEventCardData(event),
        artworkClassName: artwork[index] ?? artwork[0],
      }))}
    />
  );
}
