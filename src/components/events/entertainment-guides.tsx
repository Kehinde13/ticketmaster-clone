const guides = [
  {
    id: "nba-basketball",
    title: "NBA Basketball Tickets",
    description:
      "Plan a night in the stands and find matchups featuring basketball's biggest teams.",
    artwork: "basketball",
  },
  {
    id: "nhl-hockey",
    title: "NHL Hockey Tickets",
    description:
      "Follow the season on the ice and catch every fast-paced shift with your favorite team live.",
    artwork: "hockey",
  },
  {
    id: "mls-soccer",
    title: "MLS Soccer Tickets",
    description:
      "Explore the season's fixtures and experience every goal, save, and rivalry from the stands.",
    artwork: "soccer",
  },
  {
    id: "mlb-baseball",
    title: "MLB Baseball Tickets",
    description:
      "Get ready for baseball season and find the right game to see your favorite team.",
    artwork: "baseball",
  },
  {
    id: "broadway",
    title: "Broadway Tickets",
    description:
      "Explore Broadway performances and find your next show.",
    artwork: "broadway",
  },
] as const;

type GuideArtworkProps = {
  kind: (typeof guides)[number]["artwork"];
};

function GuideArtwork({ kind }: GuideArtworkProps) {
  if (kind === "basketball") {
    return (
      <div className="relative h-full overflow-hidden bg-linear-to-br from-[#30106d] via-[#6836b5] to-[#e24e8b]">
        <div className="absolute top-[7%] right-[8%] aspect-square w-[52%] rounded-full bg-[#f7932f] shadow-[0_10px_28px_rgba(25,7,57,0.35)]" />
        <div className="absolute top-[7%] right-[33%] h-[52%] w-[2px] rotate-[18deg] bg-[#4f235b]/70" />
        <div className="absolute top-[31%] right-[8%] h-[2px] w-[52%] -rotate-6 bg-[#4f235b]/70" />
        <div className="absolute -bottom-[24%] -left-[7%] size-[70%] rounded-full border-[18px] border-white/12" />
      </div>
    );
  }

  if (kind === "hockey") {
    return (
      <div className="relative h-full overflow-hidden bg-linear-to-br from-[#042d5e] via-[#147bb3] to-[#a7e6ec]">
        <div className="absolute inset-y-0 left-[24%] w-[17%] -skew-x-12 bg-white/18" />
        <div className="absolute inset-y-0 left-[48%] w-[7%] -skew-x-12 bg-white/25" />
        <div className="absolute right-[10%] bottom-[15%] h-[20%] w-[38%] rounded-[50%] bg-[#091d38] shadow-[0_9px_14px_rgba(2,14,30,0.45)]" />
      </div>
    );
  }

  if (kind === "soccer") {
    return (
      <div className="relative h-full overflow-hidden bg-linear-to-br from-[#063d36] via-[#008b6a] to-[#76c854]">
        <div className="absolute inset-[12%] rounded-[2px] border-2 border-white/55" />
        <div className="absolute top-[12%] bottom-[12%] left-1/2 border-l-2 border-white/55" />
        <div className="absolute top-1/2 left-1/2 size-[29%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/55 bg-white/12" />
        <div className="absolute top-[33%] left-[44%] size-[12%] rotate-12 bg-white/85 [clip-path:polygon(50%_0,100%_38%,82%_100%,18%_100%,0_38%)]" />
      </div>
    );
  }

  if (kind === "baseball") {
    return (
      <div className="relative h-full overflow-hidden bg-linear-to-br from-[#25113e] via-[#8b2348] to-[#ee6847]">
        <div className="absolute top-[14%] left-[35%] size-[48%] rounded-full bg-[#fff7e7] shadow-[0_10px_28px_rgba(40,8,27,0.32)]" />
        <div className="absolute top-[16%] left-[45%] h-[44%] w-[2px] rotate-[28deg] border-l-2 border-dashed border-[#d34c45]" />
        <div className="absolute top-[20%] left-[62%] h-[39%] w-[2px] rotate-[28deg] border-l-2 border-dashed border-[#d34c45]" />
        <div className="absolute -bottom-[45%] -left-[4%] size-[90%] rotate-45 rounded-[20px] border-[18px] border-white/10" />
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-hidden bg-linear-to-br from-[#29114f] via-[#9d3568] to-[#efa241]">
      <div className="absolute -top-[12%] left-[9%] h-[132%] w-[20%] rotate-[16deg] bg-linear-to-b from-[#fff6bd]/75 to-transparent blur-[2px]" />
      <div className="absolute -top-[12%] right-[9%] h-[132%] w-[20%] -rotate-[16deg] bg-linear-to-b from-[#fff6bd]/75 to-transparent blur-[2px]" />
      <div className="absolute right-[10%] bottom-[13%] left-[10%] h-[19%] rounded-[50%] bg-[#310c3f]/75 shadow-[0_0_24px_rgba(255,220,134,0.38)]" />
      <div className="absolute right-[22%] bottom-[19%] left-[22%] border-t-2 border-[#ffd986]/70" />
    </div>
  );
}

export function EntertainmentGuides() {
  return (
    <section
      aria-labelledby="entertainment-guides-heading"
      className="bg-background"
    >
      <div className="mx-auto max-w-[1120px] border-t border-[#bfbfbf] px-4 py-8 md:px-6 xl:px-0">
        <h2
          id="entertainment-guides-heading"
          className="text-[22px] leading-6 font-bold tracking-[0.02em] text-foreground uppercase"
        >
          Entertainment Guides
        </h2>

        <ul className="mt-6 grid touch-pan-x snap-x snap-mandatory auto-cols-[calc((100%/1.4)-16px)] grid-flow-col gap-4 overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:none] md:auto-cols-auto md:grid-flow-row md:grid-cols-5 md:gap-6 [&::-webkit-scrollbar]:hidden">
          {guides.map((guide) => {
            const titleId = `guide-${guide.id}-title`;

            return (
              <li key={guide.id} className="snap-start pb-2">
                <article aria-labelledby={titleId} className="min-w-0">
                  <div
                    aria-hidden="true"
                    className="aspect-video overflow-hidden rounded-[4px] shadow-[0_1px_4px_rgba(18,18,18,0.15)]"
                  >
                    <GuideArtwork kind={guide.artwork} />
                  </div>
                  <div className="mt-2">
                    <h3
                      id={titleId}
                      className="text-[16px] leading-[22px] font-semibold tracking-[0.02em] text-foreground"
                    >
                      {guide.title}
                    </h3>
                    <p className="mt-1 text-[16px] leading-[22px] tracking-[0.02em] text-[#646464]">
                      {guide.description}
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
