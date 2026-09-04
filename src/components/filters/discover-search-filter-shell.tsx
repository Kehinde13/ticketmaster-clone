import {
  CalendarDays,
  ChevronDown,
  LocateFixed,
  Search,
} from "lucide-react";

const focusClassName =
  "outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus-ring";

export function DiscoverSearchFilterShell() {
  return (
    <section
      aria-label="Event discovery"
      className="bg-surface md:bg-primary md:px-gutter md:pt-7 md:pb-12"
    >
      <div className="mx-auto max-w-[1120px]">
        <h1 className="px-4 pt-5 text-[18px] leading-6 font-bold md:sr-only">
          What&apos;s Happening in{" "}
          <button
            type="button"
            className={`inline text-left text-primary underline decoration-1 underline-offset-4 ${focusClassName}`}
          >
            All of United States
          </button>
        </h1>

        <div
          role="search"
          aria-label="Find events"
          className="px-4 pt-4 pb-6 md:flex md:h-[60px] md:overflow-hidden md:rounded-[3px] md:border md:border-[#c7c9cc] md:bg-white md:p-0"
        >
          <div className="hidden h-full w-[250px] shrink-0 items-center border-r border-[#d5d7da] md:flex">
            <button
              type="button"
              aria-label="Current location"
              className={`flex size-12 shrink-0 items-center justify-center text-primary ${focusClassName}`}
            >
              <LocateFixed aria-hidden="true" className="size-5" strokeWidth={1.75} />
            </button>
            <label htmlFor="discover-location" className="sr-only">
              Location
            </label>
            <input
              id="discover-location"
              type="text"
              placeholder="City or Zip Code"
              className={`h-full min-w-0 flex-1 bg-transparent pr-4 text-[16px] text-foreground placeholder:text-foreground-secondary ${focusClassName}`}
            />
          </div>

          <button
            type="button"
            aria-label="Change date range: All Dates"
            className={`hidden h-full w-[245px] shrink-0 items-center gap-3 border-r border-[#d5d7da] px-4 text-[16px] text-foreground md:flex ${focusClassName}`}
          >
            <CalendarDays
              aria-hidden="true"
              className="size-5 text-primary"
              strokeWidth={1.75}
            />
            <span>All Dates</span>
            <ChevronDown
              aria-hidden="true"
              className="ml-auto size-5"
              strokeWidth={1.75}
            />
          </button>

          <div className="flex h-[52px] min-w-0 items-center rounded-[3px] border border-border bg-white md:h-full md:flex-1 md:rounded-none md:border-0">
            <Search
              aria-hidden="true"
              className="order-2 mr-4 size-5 shrink-0 text-foreground-secondary md:order-none md:mr-0 md:ml-4"
              strokeWidth={1.75}
            />
            <label htmlFor="discover-event-search" className="sr-only">
              Search
            </label>
            <input
              id="discover-event-search"
              type="search"
              placeholder="Artist, Event or Venue"
              className={`h-full min-w-0 flex-1 bg-transparent px-3 text-[16px] text-foreground placeholder:text-foreground-secondary ${focusClassName}`}
            />
            <button
              type="button"
              className={`m-1 hidden h-[50px] w-[116px] shrink-0 items-center justify-center rounded-[3px] bg-primary text-[16px] font-bold text-primary-foreground hover:bg-primary-hover md:inline-flex ${focusClassName}`}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
