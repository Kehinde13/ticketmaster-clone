import { Suspense, type ReactNode } from "react";

import { eventCategoryLabels } from "@/components/events/event-card-data";
import { PopularEventRow } from "@/components/events/popular-event-row";
import { LoadingState } from "@/components/ui/loading-state";
import type { CountryCode } from "@/lib/countries";
import type { EventCategory } from "@/types/event";

const categories: readonly EventCategory[] = [
  "concerts",
  "sports",
  "arts-theater-comedy",
  "family",
];

type EventRowShellProps = { title: string; children: ReactNode };

function EventRowShell({ title, children }: EventRowShellProps) {
  const headingId = `popular-${title.toLowerCase().replaceAll(/[^a-z]+/g, "-")}-heading`;

  return (
    <section aria-labelledby={headingId} className="@container">
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
      {children}
    </section>
  );
}

export function PopularNearYou({ countryCode }: Readonly<{ countryCode: CountryCode }>) {
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
          {categories.map((category) => {
            const title = eventCategoryLabels[category];
            return (
              <EventRowShell key={category} title={title}>
                <div
                  data-testid={`popular-${category}-results`}
                  className="grid min-h-[calc(min(72vw,280px)*2/3+104px)] min-w-0 items-center md:min-h-[calc((100cqw-2rem)/3*2/3+104px)] lg:min-h-[calc((100cqw-3rem)/4*2/3+104px)]"
                >
                  <Suspense
                    fallback={(
                      <LoadingState
                        compact
                        message={`Loading ${title.toLowerCase()}…`}
                      />
                    )}
                  >
                    <PopularEventRow category={category} countryCode={countryCode} />
                  </Suspense>
                </div>
              </EventRowShell>
            );
          })}
        </div>
      </div>
    </section>
  );
}
