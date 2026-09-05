const highlights = [
  {
    id: "live-music",
    eyebrow: "Live Music",
    title: "Find your next live show",
    surface: "from-[#201166] via-[#6536c9] to-[#d654ba]",
  },
  {
    id: "big-games",
    eyebrow: "Sports",
    title: "Be there for the big games",
    surface: "from-[#002c5f] via-[#0062a8] to-[#02a8d8]",
  },
  {
    id: "stage-shows",
    eyebrow: "Arts & Theater",
    title: "See what's taking the stage",
    surface: "from-[#6f1026] via-[#bd3045] to-[#f1844e]",
  },
  {
    id: "family-events",
    eyebrow: "Family",
    title: "Make memories together",
    surface: "from-[#005a50] via-[#168f78] to-[#8fcf6b]",
  },
] as const;

export function DiscoverHighlights() {
  return (
    <section
      aria-labelledby="discover-highlights-heading"
      className="bg-background py-8 md:py-10"
    >
      <div className="mx-auto max-w-[1120px] px-4 md:px-6 xl:px-0">
        <h2
          id="discover-highlights-heading"
          className="mb-4 text-[22px] leading-7 font-bold text-foreground md:mb-5 md:text-[24px] md:leading-8"
        >
          Highlights
        </h2>

        <ul className="flex touch-pan-x snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] md:gap-4 [&::-webkit-scrollbar]:hidden">
          {highlights.map((highlight) => (
            <li
              key={highlight.id}
              className="aspect-video max-w-[336px] shrink-0 basis-[82vw] snap-start overflow-hidden rounded-[4px] sm:basis-[304px] md:max-w-none md:basis-[calc((100%-2rem)/3)] xl:basis-[calc((100%-3rem)/4)]"
            >
              <article
                className={`relative isolate h-full overflow-hidden bg-gradient-to-br ${highlight.surface}`}
              >
                <div
                  aria-hidden="true"
                  className="absolute -top-10 -right-8 size-36 rounded-full border-[24px] border-white/15"
                />
                <div
                  aria-hidden="true"
                  className="absolute -right-7 -bottom-14 size-44 rotate-12 rounded-[36px] bg-white/10"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-4 text-white md:p-5">
                  <p className="mb-1 text-[12px] leading-4 font-bold tracking-[0.06em] uppercase text-white/85">
                    {highlight.eyebrow}
                  </p>
                  <h3 className="max-w-[15rem] text-[19px] leading-6 font-bold tracking-[-0.01em] text-white md:text-[20px] md:leading-6">
                    {highlight.title}
                  </h3>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
