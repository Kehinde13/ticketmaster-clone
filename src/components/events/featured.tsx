const featuredItems = [
  { id: "hotels", title: "Hotels", artwork: "hotels" },
  { id: "ticket-deals", title: "Ticket Deals", artwork: "deals" },
  { id: "vip-packages", title: "VIP Packages", artwork: "vip" },
  {
    id: "sell-on-ticketmaster",
    title: "Sell on Ticketmaster",
    artwork: "sell",
  },
] as const;

type FeaturedArtworkProps = {
  kind: (typeof featuredItems)[number]["artwork"];
};

function FeaturedArtwork({ kind }: FeaturedArtworkProps) {
  if (kind === "hotels") {
    return (
      <div className="relative h-full overflow-hidden bg-linear-to-br from-[#22104f] via-[#7447ba] to-[#d99bdc]">
        <div className="absolute top-[13%] right-[10%] size-[29%] rounded-full bg-[#ffd879]/90 shadow-[0_0_28px_rgba(255,216,121,0.45)]" />
        <div className="absolute right-[12%] bottom-0 left-[12%] flex h-[67%] items-end gap-[4%]">
          {[52, 78, 63, 88, 59].map((height, index) => (
            <span
              key={index}
              className="relative flex-1 rounded-t-[3px] bg-[#241441]/72 after:absolute after:inset-[16%_24%_10%] after:bg-[repeating-linear-gradient(to_bottom,rgba(255,224,141,0.85)_0_4px,transparent_4px_12px)]"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (kind === "deals") {
    return (
      <div className="relative h-full overflow-hidden bg-linear-to-br from-[#071f5e] via-[#075bc2] to-[#47c7df]">
        <div className="absolute top-[16%] left-[10%] h-[66%] w-[80%] -rotate-6 rounded-[10px] border-2 border-white/65 bg-white/14 shadow-[0_14px_30px_rgba(1,25,73,0.32)]" />
        <div className="absolute top-1/2 left-1/2 h-[47%] w-px -translate-x-1/2 -translate-y-1/2 rotate-[-6deg] border-l-2 border-dashed border-white/70" />
        <div className="absolute top-[38%] left-[19%] h-2 w-[22%] -rotate-6 rounded-full bg-white/80" />
        <div className="absolute top-[51%] left-[20%] h-2 w-[15%] -rotate-6 rounded-full bg-white/45" />
      </div>
    );
  }

  if (kind === "vip") {
    return (
      <div className="relative h-full overflow-hidden bg-linear-to-br from-[#240b3f] via-[#721a62] to-[#ef7857]">
        <div className="absolute -top-[18%] left-[8%] h-[136%] w-[18%] rotate-[13deg] bg-linear-to-b from-[#ffe9a8]/75 to-transparent blur-[2px]" />
        <div className="absolute -top-[18%] right-[8%] h-[136%] w-[18%] -rotate-[13deg] bg-linear-to-b from-[#ffe9a8]/75 to-transparent blur-[2px]" />
        <div className="absolute top-[26%] left-1/2 flex aspect-square w-[37%] -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#ffe598]/85 bg-[#4e164d]/55 text-[clamp(18px,4vw,34px)] font-bold tracking-[0.08em] text-[#ffe9ad] shadow-[0_10px_28px_rgba(40,5,48,0.35)]">
          VIP
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-hidden bg-linear-to-br from-[#083a4f] via-[#087f87] to-[#75cf9d]">
      <div className="absolute top-[16%] left-[14%] h-[67%] w-[72%] rotate-3 rounded-[9px] bg-white/88 shadow-[0_14px_30px_rgba(2,42,49,0.3)]">
        <div className="absolute top-[18%] left-[12%] h-2 w-[48%] rounded-full bg-[#08737f]" />
        <div className="absolute top-[35%] left-[12%] h-2 w-[31%] rounded-full bg-[#9fd9d2]" />
        <div className="absolute right-[12%] bottom-[16%] grid size-[28%] place-items-center rounded-full bg-[#024ddf] text-[clamp(18px,3vw,28px)] font-bold text-white">
          $
        </div>
      </div>
    </div>
  );
}

export function Featured() {
  return (
    <section aria-labelledby="featured-heading" className="bg-background">
      <div className="mx-auto max-w-[1120px] border-t border-[#bfbfbf] px-4 py-6 md:px-6 xl:px-0">
        <h2
          id="featured-heading"
          className="before:mb-2 before:block before:h-1 before:w-8 before:bg-current text-[22px] leading-6 font-bold tracking-[0.02em] text-foreground uppercase"
        >
          Featured
        </h2>

        <ul className="mt-8 grid grid-cols-1 gap-x-4 gap-y-8 min-[720px]:grid-cols-2 min-[900px]:grid-cols-4">
          {featuredItems.map((item) => {
            const titleId = `featured-${item.id}-title`;

            return (
              <li key={item.id}>
                <article aria-labelledby={titleId}>
                  <div
                    aria-hidden="true"
                    className="aspect-video overflow-hidden rounded-[4px] shadow-[0_1px_4px_rgba(18,18,18,0.15)] transition-shadow duration-300 motion-reduce:transition-none"
                  >
                    <FeaturedArtwork kind={item.artwork} />
                  </div>
                  <h3
                    id={titleId}
                    className="mt-2 text-[16px] leading-[22px] font-semibold tracking-[0.02em] text-foreground min-[900px]:leading-6"
                  >
                    {item.title}
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
