const cities = [
  {
    id: "new-york-city",
    name: "New York City",
    surface: "from-[#172758] via-[#395e9f] to-[#f06f59]",
    glow: "bg-[#ffcc73]",
    skyline: [44, 70, 52, 84, 63, 76, 48],
  },
  {
    id: "los-angeles",
    name: "Los Angeles",
    surface: "from-[#4c2b72] via-[#d36e87] to-[#f7b764]",
    glow: "bg-[#ffe09a]",
    skyline: [37, 55, 43, 68, 50, 61, 40],
  },
  {
    id: "las-vegas",
    name: "Las Vegas",
    surface: "from-[#1d0d45] via-[#7d2376] to-[#e94d75]",
    glow: "bg-[#77e5ff]",
    skyline: [45, 73, 56, 82, 47, 69, 58],
  },
  {
    id: "chicago",
    name: "Chicago",
    surface: "from-[#052e56] via-[#27759d] to-[#9cc9cf]",
    glow: "bg-[#eaf7e9]",
    skyline: [48, 61, 78, 55, 86, 67, 51],
  },
  {
    id: "atlanta",
    name: "Atlanta",
    surface: "from-[#2d174d] via-[#795485] to-[#d78875]",
    glow: "bg-[#f8be65]",
    skyline: [38, 60, 47, 70, 55, 65, 42],
  },
  {
    id: "nashville",
    name: "Nashville",
    surface: "from-[#27354f] via-[#775c69] to-[#dc895d]",
    glow: "bg-[#f6d283]",
    skyline: [41, 58, 46, 72, 53, 63, 39],
  },
  {
    id: "denver",
    name: "Denver",
    surface: "from-[#14365c] via-[#447c91] to-[#d09d79]",
    glow: "bg-[#fff0b3]",
    skyline: [35, 49, 40, 62, 45, 54, 38],
  },
  {
    id: "miami",
    name: "Miami",
    surface: "from-[#053b6d] via-[#087da1] to-[#f2a56b]",
    glow: "bg-[#ffcf78]",
    skyline: [42, 66, 49, 74, 58, 69, 45],
  },
] as const;

type CityArtworkProps = {
  city: (typeof cities)[number];
};

function CityArtwork({ city }: CityArtworkProps) {
  return (
    <div
      className={`relative h-full overflow-hidden bg-linear-to-br ${city.surface}`}
    >
      <div
        className={`absolute top-[15%] right-[12%] aspect-square w-[22%] rounded-full opacity-75 shadow-[0_0_20px_rgba(255,225,145,0.35)] blur-[1px] ${city.glow}`}
      />
      <div className="absolute -right-[14%] -bottom-[64%] aspect-square w-[76%] rounded-full border-[18px] border-white/10" />
      <div className="absolute inset-x-0 bottom-0 flex h-[72%] items-end justify-center gap-[3%] px-[7%]">
        {city.skyline.map((height, index) => (
          <span
            key={`${city.id}-building-${index}`}
            className="relative w-[11%] rounded-t-[2px] bg-[#111827]/70 shadow-[0_0_12px_rgba(8,15,32,0.18)] after:absolute after:top-[14%] after:right-[24%] after:left-[24%] after:h-[3px] after:bg-white/24"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <div className="absolute right-0 bottom-0 left-0 h-[12%] bg-[#0c1426]/78" />
    </div>
  );
}

export function PopularCities() {
  return (
    <section aria-labelledby="popular-cities-heading" className="bg-background">
      <div className="mx-auto max-w-[1120px] border-t border-[#bfbfbf] px-4 py-8 md:px-6 xl:px-0">
        <div className="flex items-center justify-between gap-4">
          <h2
            id="popular-cities-heading"
            className="text-[22px] leading-6 font-bold tracking-[0.02em] text-foreground uppercase"
          >
            Popular Cities
          </h2>
          <span className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-[4px] border border-[#c3c3c3] px-4 py-2 text-[16px] leading-[1.4] font-semibold text-foreground">
            <span className="sr-only">See All Cities</span>
            <span aria-hidden="true">See All</span>
          </span>
        </div>

        <ul className="mt-8 grid touch-pan-x snap-x snap-mandatory auto-cols-[calc((100%/1.4)-16px)] grid-flow-col gap-4 overflow-x-auto overscroll-x-contain pb-3 [scrollbar-width:none] min-[720px]:auto-cols-[calc((100%+16px)/5-16px)] [&::-webkit-scrollbar]:hidden">
          {cities.map((city) => {
            const titleId = `popular-city-${city.id}-title`;

            return (
              <li key={city.id} className="snap-start pb-2">
                <article aria-labelledby={titleId} className="min-w-0">
                  <div
                    aria-hidden="true"
                    className="aspect-video overflow-hidden rounded-[4px] shadow-[0_1px_4px_rgba(18,18,18,0.15)]"
                  >
                    <CityArtwork city={city} />
                  </div>
                  <h3
                    id={titleId}
                    className="mt-2 text-[16px] leading-[22px] font-semibold tracking-[0.02em] text-foreground"
                  >
                    {city.name}
                  </h3>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
