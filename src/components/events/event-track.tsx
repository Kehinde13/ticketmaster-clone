import { EventCard } from "@/components/events/event-card";
import type { EventCardData } from "@/types/event";

export type RepresentativeEvent = {
  event: EventCardData;
  artworkClassName: string;
};

export function EventTrack({ events }: { events: readonly RepresentativeEvent[] }) {
  return (
    <ul className="flex touch-pan-x snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] md:gap-4 [&::-webkit-scrollbar]:hidden">
      {events.map(({ event, artworkClassName }) => (
        <li
          key={event.id}
          className="max-w-[280px] shrink-0 basis-[72vw] snap-start md:max-w-none md:basis-[calc((100%-2rem)/3)] lg:basis-[calc((100%-3rem)/4)]"
        >
          <EventCard event={event} artworkClassName={artworkClassName} />
        </li>
      ))}
    </ul>
  );
}
