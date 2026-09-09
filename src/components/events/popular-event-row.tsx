import { connection } from "next/server";

import {
  eventCategoryLabels,
  toEventCardData,
} from "@/components/events/event-card-data";
import { EventTrack } from "@/components/events/event-track";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { loadPopularEvents } from "@/lib/api/events/discover";
import type { CountryCode } from "@/lib/countries";
import type { Event, EventCategory } from "@/types/event";

const artworkByCategory: Readonly<Record<EventCategory, readonly string[]>> = {
  concerts: [
    "from-[#171042] via-[#5339a6] to-[#ce52ab]",
    "from-[#00335f] via-[#006ca8] to-[#31c4d7]",
    "from-[#7c2415] via-[#d05425] to-[#f6b641]",
    "from-[#091d62] via-[#174db2] to-[#7678ed]",
    "from-[#3b3114] via-[#88711d] to-[#e4b644]",
    "from-[#321052] via-[#8b1b8c] to-[#e74477]",
  ],
  sports: [
    "from-[#071d4a] via-[#0756a5] to-[#16a7d4]",
    "from-[#102d20] via-[#197447] to-[#58b15c]",
    "from-[#092341] via-[#246f9d] to-[#b6e8ed]",
    "from-[#38114e] via-[#8b3198] to-[#e05f83]",
    "from-[#0a403b] via-[#008d7c] to-[#7bcc87]",
    "from-[#42170e] via-[#ad3019] to-[#f18b22]",
  ],
  "arts-theater-comedy": [
    "from-[#4b1125] via-[#a62849] to-[#e98055]",
    "from-[#24104d] via-[#6b2aa0] to-[#c869d2]",
    "from-[#6b2510] via-[#c85e1c] to-[#f6bd4a]",
    "from-[#142444] via-[#345a8d] to-[#91a6cb]",
    "from-[#4a1047] via-[#ae356f] to-[#f17e77]",
    "from-[#222222] via-[#5c3b2c] to-[#ba8650]",
  ],
  family: [
    "from-[#065179] via-[#20a3c2] to-[#9ce5da]",
    "from-[#713114] via-[#d66f21] to-[#f4d04e]",
    "from-[#64193c] via-[#c83062] to-[#f39169]",
    "from-[#123572] via-[#2878bb] to-[#69ced2]",
    "from-[#183f2b] via-[#398a50] to-[#e2b54a]",
    "from-[#2c185f] via-[#624cc3] to-[#42b5d1]",
  ],
};

type PopularEventRowProps = {
  category: EventCategory;
  countryCode: CountryCode;
  loadEvents?: (
    category: EventCategory,
    countryCode: CountryCode,
  ) => Promise<readonly Event[]>;
};

const copy: Readonly<Record<EventCategory, { empty: string; unavailable: string }>> = {
  concerts: { empty: "No concerts found", unavailable: "Concert events are temporarily unavailable." },
  sports: { empty: "No sports events found", unavailable: "Sports events are temporarily unavailable." },
  "arts-theater-comedy": { empty: "No arts events found", unavailable: "Arts events are temporarily unavailable." },
  family: { empty: "No family events found", unavailable: "Family events are temporarily unavailable." },
};

export async function PopularEventRow({
  category,
  countryCode,
  loadEvents = loadPopularEvents,
}: PopularEventRowProps) {
  await connection();
  let events: readonly Event[];

  try {
    events = await loadEvents(category, countryCode);
  } catch {
    return (
      <ErrorState compact title={copy[category].unavailable} description="Please try again later." />
    );
  }

  if (events.length === 0) {
    return (
      <EmptyState
        compact
        title={copy[category].empty}
        description={`Check back soon for upcoming ${eventCategoryLabels[category].toLowerCase()}.`}
      />
    );
  }

  const artwork = artworkByCategory[category];
  return (
    <EventTrack
      events={events.slice(0, 6).map((event, index) => ({
        event: toEventCardData(event, category),
        artworkClassName: artwork[index] ?? artwork[0],
      }))}
    />
  );
}
