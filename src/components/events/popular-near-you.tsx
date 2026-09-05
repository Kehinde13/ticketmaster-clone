import { EventCard } from "@/components/events/event-card";
import type { EventCardData } from "@/types/event";

type RepresentativeEvent = {
  event: EventCardData;
  artworkClassName: string;
};

const representativeEvents: readonly RepresentativeEvent[] = [
  {
    event: {
      id: "midnight-echo-tour",
      name: "Midnight Echo Tour",
      category: "Alternative Rock",
      dateLabel: "FRI, OCT 9 • 8:00 PM",
      venue: "Harbor Arena",
      location: "Chicago, IL",
    },
    artworkClassName: "from-[#171042] via-[#5339a6] to-[#ce52ab]",
  },
  {
    event: {
      id: "northern-lights-live",
      name: "Northern Lights Live",
      category: "Pop",
      dateLabel: "SAT, OCT 17 • 7:30 PM",
      venue: "Riverside Pavilion",
      location: "Austin, TX",
    },
    artworkClassName: "from-[#00335f] via-[#006ca8] to-[#31c4d7]",
  },
  {
    event: {
      id: "city-sounds-festival",
      name: "City Sounds Festival",
      category: "Music Festival",
      dateLabel: "SUN, OCT 25 • 2:00 PM",
      venue: "Lakeside Park",
      location: "Denver, CO",
    },
    artworkClassName: "from-[#7c2415] via-[#d05425] to-[#f6b641]",
  },
  {
    event: {
      id: "blue-room-sessions",
      name: "The Blue Room Sessions",
      category: "R&B",
      dateLabel: "THU, NOV 5 • 8:00 PM",
      venue: "The Grand Hall",
      location: "New York, NY",
    },
    artworkClassName: "from-[#091d62] via-[#174db2] to-[#7678ed]",
  },
  {
    event: {
      id: "open-road-live",
      name: "Open Road Live",
      category: "Country",
      dateLabel: "SAT, NOV 14 • 7:00 PM",
      venue: "Canyon Amphitheater",
      location: "Phoenix, AZ",
    },
    artworkClassName: "from-[#3b3114] via-[#88711d] to-[#e4b644]",
  },
  {
    event: {
      id: "electric-nights",
      name: "Electric Nights",
      category: "Dance/Electronic",
      dateLabel: "FRI, NOV 20 • 9:00 PM",
      venue: "Bayfront Center",
      location: "Miami, FL",
    },
    artworkClassName: "from-[#321052] via-[#8b1b8c] to-[#e74477]",
  },
];

export function PopularNearYou() {
  return (
    <section
      aria-labelledby="popular-near-you-heading"
      className="bg-background pb-10 md:pb-14"
    >
      <div className="mx-auto max-w-[1120px] px-4 md:px-6 xl:px-0">
        <h2
          id="popular-near-you-heading"
          className="text-[22px] leading-7 font-bold text-foreground md:text-[24px] md:leading-8"
        >
          Popular Near You
        </h2>
        <h3 className="mt-5 mb-4 text-[18px] leading-6 font-bold text-foreground md:mt-6 md:mb-5 md:text-[20px]">
          Concerts
        </h3>

        <ul className="flex touch-pan-x snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] md:gap-4 [&::-webkit-scrollbar]:hidden">
          {representativeEvents.map(({ event, artworkClassName }) => (
            <li
              key={event.id}
              className="max-w-[280px] shrink-0 basis-[72vw] snap-start md:max-w-none md:basis-[calc((100%-2rem)/3)] lg:basis-[calc((100%-3rem)/4)]"
            >
              <EventCard
                event={event}
                artworkClassName={artworkClassName}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
