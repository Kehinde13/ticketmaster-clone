const editorialItems = [
  {
    id: "mlb-schedule",
    category: "Sports",
    title: "A Look at the 2026 MLB Schedule and New Rules",
    description:
      "Explore the season's key dates, format updates, and changes baseball fans should know.",
    artwork: "baseball",
  },
  {
    id: "concert-packing",
    category: "Ticket Tips",
    title: "What to Bring to a Concert",
    description:
      "Use this quick checklist to pack the essentials for a smooth night at the show.",
    artwork: "concert",
  },
  {
    id: "mls-season",
    category: "Sports",
    title: "MLS 2026 Season FAQs",
    description:
      "Get familiar with the season format, important matchups, and what to expect at the stadium.",
    artwork: "soccer",
  },
  {
    id: "account-guide",
    category: "General Info",
    title: "Get the Most Out of Your Ticketmaster Account",
    description:
      "Learn practical ways to manage your profile, saved events, and ticket activity in one place.",
    artwork: "account",
  },
  {
    id: "us-open",
    category: "Sports",
    title: "US Open Ticket Buying Guide",
    description:
      "Understand session options, seating choices, and useful planning details before tournament day.",
    artwork: "tennis",
  },
  {
    id: "broadway-summer",
    category: "Local Guide",
    title: "6 Broadway Shows to See This Summer in NYC",
    description:
      "Find a memorable musical or play for your next summer evening in New York City.",
    artwork: "broadway",
  },
] as const;

type EditorialArtworkProps = {
  kind: (typeof editorialItems)[number]["artwork"];
};

function EditorialArtwork({ kind }: EditorialArtworkProps) {
  if (kind === "baseball") {
    return (
      <div className="relative h-full overflow-hidden bg-linear-to-br from-[#061f4a] via-[#0d5b9f] to-[#f0643c]">
        <div className="absolute -right-[8%] -bottom-[42%] size-[88%] rotate-45 rounded-[18px] border-[22px] border-white/14" />
        <div className="absolute top-[13%] right-[13%] aspect-square w-[33%] rounded-full bg-[#fff9e8] shadow-[0_12px_30px_rgba(1,18,48,0.35)]" />
        <div className="absolute top-[15%] right-[28%] h-[29%] border-l-2 border-dashed border-[#d94a42]" />
        <div className="absolute top-[15%] right-[18%] h-[29%] border-l-2 border-dashed border-[#d94a42]" />
      </div>
    );
  }

  if (kind === "concert") {
    return (
      <div className="relative h-full overflow-hidden bg-linear-to-br from-[#24105f] via-[#823ab0] to-[#ec5679]">
        <div className="absolute inset-x-[12%] top-[18%] h-[16%] rounded-full border-[10px] border-white/18" />
        <div className="absolute right-[19%] bottom-[14%] left-[19%] h-[49%] rounded-t-[28px] bg-[#160b39]/48 shadow-[0_14px_30px_rgba(22,5,45,0.3)]" />
        <div className="absolute right-[28%] bottom-[28%] left-[28%] space-y-3">
          <div className="h-2 rounded-full bg-white/75" />
          <div className="h-2 w-4/5 rounded-full bg-white/55" />
          <div className="h-2 w-3/5 rounded-full bg-white/40" />
        </div>
      </div>
    );
  }

  if (kind === "soccer") {
    return (
      <div className="relative h-full overflow-hidden bg-linear-to-br from-[#053c36] via-[#00866c] to-[#76c55b]">
        <div className="absolute inset-[11%] border-2 border-white/55" />
        <div className="absolute top-[11%] bottom-[11%] left-1/2 border-l-2 border-white/55" />
        <div className="absolute top-1/2 left-1/2 aspect-square w-[31%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/55" />
        <div className="absolute top-[39%] left-[45%] size-[11%] rotate-12 bg-white/85 [clip-path:polygon(50%_0,100%_38%,82%_100%,18%_100%,0_38%)]" />
      </div>
    );
  }

  if (kind === "account") {
    return (
      <div className="relative h-full overflow-hidden bg-linear-to-br from-[#031d55] via-[#075ac4] to-[#36c1dc]">
        <div className="absolute -top-[31%] -right-[7%] size-[83%] rounded-full border-[24px] border-white/12" />
        <div className="absolute -bottom-[36%] -left-[5%] size-[86%] rounded-full border-[22px] border-white/10" />
        <div className="absolute top-[22%] left-[17%] h-[57%] w-[47%] rounded-[8px] bg-white/88 shadow-[0_14px_32px_rgba(1,25,68,0.32)]">
          <div className="mx-auto mt-[15%] size-[22%] rounded-full bg-[#0878cc]" />
          <div className="mx-auto mt-[9%] h-[7%] w-[58%] rounded-full bg-[#b4dff1]" />
          <div className="mx-auto mt-[6%] h-[7%] w-[42%] rounded-full bg-[#d0ebf5]" />
        </div>
      </div>
    );
  }

  if (kind === "tennis") {
    return (
      <div className="relative h-full overflow-hidden bg-linear-to-br from-[#081c57] via-[#1644a1] to-[#0f9c80]">
        <div className="absolute inset-[10%] border-2 border-white/55" />
        <div className="absolute top-[10%] bottom-[10%] left-1/2 border-l-2 border-white/55" />
        <div className="absolute top-1/2 right-[10%] left-[10%] border-t-2 border-white/55" />
        <div className="absolute top-[21%] right-[19%] aspect-square w-[18%] rounded-full bg-[#dafa38] shadow-[0_0_24px_rgba(218,250,56,0.5)]" />
        <div className="absolute top-[23%] right-[21%] aspect-square w-[14%] rounded-full border border-white/65" />
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-hidden bg-linear-to-br from-[#3b0b51] via-[#a22655] to-[#f49b37]">
      <div className="absolute -top-[15%] left-[8%] h-[130%] w-[18%] rotate-[14deg] bg-linear-to-b from-[#fff5b6]/75 to-transparent blur-[2px]" />
      <div className="absolute -top-[15%] right-[8%] h-[130%] w-[18%] -rotate-[14deg] bg-linear-to-b from-[#fff5b6]/75 to-transparent blur-[2px]" />
      <div className="absolute right-[13%] bottom-[14%] left-[13%] rounded-t-[28px] border-x-[12px] border-t-[12px] border-[#471144]/75 pt-[24%]" />
      <div className="absolute right-[20%] bottom-[17%] left-[20%] flex justify-between">
        {Array.from({ length: 7 }, (_, index) => (
          <span key={index} className="size-[5px] rounded-full bg-[#ffe28a]" />
        ))}
      </div>
    </div>
  );
}

export function DiscoverMore() {
  return (
    <section aria-labelledby="discover-more-heading" className="bg-background">
      <div className="mx-auto max-w-[1120px] border-t border-[#bfbfbf] px-4 py-8 md:px-6 xl:px-0">
        <h2
          id="discover-more-heading"
          className="text-[22px] leading-6 font-bold tracking-[0.02em] text-foreground uppercase"
        >
          Discover More
        </h2>

        <ul className="mt-8 grid touch-pan-x snap-x snap-mandatory auto-cols-[calc(100%-8px)] grid-flow-col gap-x-2 gap-y-4 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] min-[720px]:auto-cols-[calc(50%-8px)] min-[900px]:grid-flow-row min-[900px]:grid-cols-[repeat(3,calc((100%/3)-8px))] min-[900px]:auto-cols-auto [&::-webkit-scrollbar]:hidden">
          {editorialItems.map((item) => {
            const titleId = `discover-more-${item.id}-title`;

            return (
              <li key={item.id} className="snap-start">
                <article aria-labelledby={titleId} className="min-w-0">
                  <div
                    aria-hidden="true"
                    className="aspect-video overflow-hidden rounded-[4px] shadow-[0_1px_4px_rgba(18,18,18,0.15)]"
                  >
                    <EditorialArtwork kind={item.artwork} />
                  </div>
                  <div className="mt-2">
                    <p className="mb-1 text-[12px] leading-5 font-semibold tracking-[0.02em] text-[#646464] uppercase">
                      {item.category}
                    </p>
                    <h3
                      id={titleId}
                      className="line-clamp-2 text-[16px] leading-[22px] font-semibold tracking-[0.02em] text-foreground"
                    >
                      {item.title}
                    </h3>
                    <p className="mt-1 line-clamp-4 text-[16px] leading-[22px] tracking-[0.02em] text-[#646464]">
                      {item.description}
                    </p>
                    <span className="mt-1 block text-[12px] leading-5 font-semibold tracking-[0.02em] text-[#024ddf] uppercase">
                      Discover More
                    </span>
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
