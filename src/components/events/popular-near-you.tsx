import { EventCard } from "@/components/events/event-card";
import type { EventCardData } from "@/types/event";

type RepresentativeEvent = {
  event: EventCardData;
  artworkClassName: string;
};

const concertEvents: readonly RepresentativeEvent[] = [
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

const sportsEvents: readonly RepresentativeEvent[] = [
  {
    event: {
      id: "city-hoops-showdown",
      name: "City Hoops Showdown",
      category: "Basketball",
      dateLabel: "SAT, OCT 10 • 7:00 PM",
      venue: "Metro Center",
      location: "Atlanta, GA",
    },
    artworkClassName: "from-[#071d4a] via-[#0756a5] to-[#16a7d4]",
  },
  {
    event: {
      id: "gridiron-weekend",
      name: "Gridiron Weekend",
      category: "Football",
      dateLabel: "SUN, OCT 18 • 1:00 PM",
      venue: "Union Field",
      location: "Philadelphia, PA",
    },
    artworkClassName: "from-[#102d20] via-[#197447] to-[#58b15c]",
  },
  {
    event: {
      id: "championship-hockey-night",
      name: "Championship Hockey Night",
      category: "Hockey",
      dateLabel: "TUE, OCT 27 • 7:30 PM",
      venue: "Northstar Arena",
      location: "Minneapolis, MN",
    },
    artworkClassName: "from-[#092341] via-[#246f9d] to-[#b6e8ed]",
  },
  {
    event: {
      id: "rivals-on-the-court",
      name: "Rivals on the Court",
      category: "Basketball",
      dateLabel: "FRI, NOV 6 • 8:00 PM",
      venue: "Pacific Forum",
      location: "Los Angeles, CA",
    },
    artworkClassName: "from-[#38114e] via-[#8b3198] to-[#e05f83]",
  },
  {
    event: {
      id: "stadium-soccer-series",
      name: "Stadium Soccer Series",
      category: "Soccer",
      dateLabel: "SAT, NOV 14 • 4:00 PM",
      venue: "Gateway Stadium",
      location: "St. Louis, MO",
    },
    artworkClassName: "from-[#0a403b] via-[#008d7c] to-[#7bcc87]",
  },
  {
    event: {
      id: "final-lap-live",
      name: "Final Lap Live",
      category: "Motorsports",
      dateLabel: "SUN, NOV 22 • 3:00 PM",
      venue: "Desert Raceway",
      location: "Las Vegas, NV",
    },
    artworkClassName: "from-[#42170e] via-[#ad3019] to-[#f18b22]",
  },
];

const artsEvents: readonly RepresentativeEvent[] = [
  {
    event: {
      id: "lights-of-broadway",
      name: "Lights of Broadway",
      category: "Musical",
      dateLabel: "WED, OCT 14 • 7:30 PM",
      venue: "Majestic Theatre",
      location: "New York, NY",
    },
    artworkClassName: "from-[#4b1125] via-[#a62849] to-[#e98055]",
  },
  {
    event: {
      id: "the-great-illusion",
      name: "The Great Illusion",
      category: "Magic",
      dateLabel: "FRI, OCT 23 • 8:00 PM",
      venue: "Crown Theater",
      location: "Las Vegas, NV",
    },
    artworkClassName: "from-[#24104d] via-[#6b2aa0] to-[#c869d2]",
  },
  {
    event: {
      id: "laugh-lines-live",
      name: "Laugh Lines Live",
      category: "Comedy",
      dateLabel: "SAT, OCT 31 • 9:00 PM",
      venue: "Civic Playhouse",
      location: "Boston, MA",
    },
    artworkClassName: "from-[#6b2510] via-[#c85e1c] to-[#f6bd4a]",
  },
  {
    event: {
      id: "the-winter-tale",
      name: "The Winter Tale",
      category: "Drama",
      dateLabel: "THU, NOV 12 • 7:00 PM",
      venue: "Regency Stage",
      location: "Seattle, WA",
    },
    artworkClassName: "from-[#142444] via-[#345a8d] to-[#91a6cb]",
  },
  {
    event: {
      id: "rhythm-in-motion",
      name: "Rhythm in Motion",
      category: "Dance",
      dateLabel: "SAT, NOV 21 • 7:30 PM",
      venue: "Arts District Hall",
      location: "Dallas, TX",
    },
    artworkClassName: "from-[#4a1047] via-[#ae356f] to-[#f17e77]",
  },
  {
    event: {
      id: "the-final-act",
      name: "The Final Act",
      category: "Play",
      dateLabel: "SUN, NOV 29 • 6:30 PM",
      venue: "Orpheum Theatre",
      location: "San Francisco, CA",
    },
    artworkClassName: "from-[#222222] via-[#5c3b2c] to-[#ba8650]",
  },
];

const familyEvents: readonly RepresentativeEvent[] = [
  {
    event: {
      id: "adventure-on-ice",
      name: "Adventure on Ice",
      category: "Ice Show",
      dateLabel: "SAT, OCT 17 • 11:00 AM",
      venue: "Capital Arena",
      location: "Washington, DC",
    },
    artworkClassName: "from-[#065179] via-[#20a3c2] to-[#9ce5da]",
  },
  {
    event: {
      id: "world-of-wonders",
      name: "World of Wonders",
      category: "Family Show",
      dateLabel: "SUN, OCT 25 • 1:00 PM",
      venue: "Discovery Center",
      location: "Orlando, FL",
    },
    artworkClassName: "from-[#713114] via-[#d66f21] to-[#f4d04e]",
  },
  {
    event: {
      id: "harbor-city-circus",
      name: "Harbor City Circus",
      category: "Circus",
      dateLabel: "SAT, NOV 7 • 2:00 PM",
      venue: "Bay Arena",
      location: "Baltimore, MD",
    },
    artworkClassName: "from-[#64193c] via-[#c83062] to-[#f39169]",
  },
  {
    event: {
      id: "science-live",
      name: "Science Live!",
      category: "Educational",
      dateLabel: "SUN, NOV 15 • 12:00 PM",
      venue: "Civic Auditorium",
      location: "San Diego, CA",
    },
    artworkClassName: "from-[#123572] via-[#2878bb] to-[#69ced2]",
  },
  {
    event: {
      id: "holiday-lantern-festival",
      name: "Holiday Lantern Festival",
      category: "Festival",
      dateLabel: "FRI, NOV 27 • 5:00 PM",
      venue: "Riverfront Gardens",
      location: "Nashville, TN",
    },
    artworkClassName: "from-[#183f2b] via-[#398a50] to-[#e2b54a]",
  },
  {
    event: {
      id: "heroes-in-action",
      name: "Heroes in Action",
      category: "Family Entertainment",
      dateLabel: "SAT, DEC 5 • 1:30 PM",
      venue: "Summit Center",
      location: "Denver, CO",
    },
    artworkClassName: "from-[#2c185f] via-[#624cc3] to-[#42b5d1]",
  },
];

const eventGroups = [
  { title: "Concerts", events: concertEvents },
  { title: "Sports", events: sportsEvents },
  { title: "Arts, Theater & Comedy", events: artsEvents },
  { title: "Family", events: familyEvents },
] as const;

type EventRowProps = (typeof eventGroups)[number];

function EventRow({ title, events }: EventRowProps) {
  const headingId = `popular-${title.toLowerCase().replaceAll(/[^a-z]+/g, "-")}-heading`;

  return (
    <section aria-labelledby={headingId}>
      <div className="mb-4 flex items-start justify-between gap-4 md:mb-5 md:items-center">
        <h3
          id={headingId}
          className="text-[18px] leading-6 font-bold text-foreground md:text-[20px]"
        >
          {title}
        </h3>
        <span
          aria-label={`See All ${title}`}
          className="shrink-0 pt-0.5 text-[14px] leading-5 font-semibold text-primary md:pt-0 md:text-[15px]"
        >
          See All
        </span>
      </div>

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
    </section>
  );
}

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
        <div className="mt-5 space-y-10 md:mt-6 md:space-y-12">
          {eventGroups.map((group) => (
            <EventRow key={group.title} {...group} />
          ))}
        </div>
      </div>
    </section>
  );
}
