import { ChevronDown, Search, UserRound } from "lucide-react";
import Link from "next/link";

const utilityItems = ["Hotels", "Sell", "Gift Cards", "Help", "VIP"] as const;

const categoryItems = [
  "Concerts",
  "Sports",
  "Arts, Theater & Comedy",
  "Family",
  "Cities",
] as const;

const darkFocusClassName =
  "outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-[#111111]";

const blueFocusClassName =
  "outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary";

function DesktopCountryAffordance() {
  return (
    <button
      type="button"
      aria-label="Change country, currently United States"
      className={`flex h-full items-center gap-1.5 text-[12px] text-white hover:text-white/80 ${darkFocusClassName}`}
    >
      <span
        aria-hidden="true"
        className="relative size-3.5 overflow-hidden rounded-full border border-white/50 bg-[repeating-linear-gradient(to_bottom,#b22234_0_7.69%,#fff_7.69%_15.38%)]"
      >
        <span className="absolute top-0 left-0 h-[54%] w-[53%] bg-[#3c3b6e]" />
      </span>
      <span>US</span>
    </button>
  );
}

export function DesktopHeader() {
  return (
    <header className="hidden text-white md:block">
      <div className="h-6 bg-[#111111]">
        <div className="flex h-full items-center justify-between pl-4">
          <DesktopCountryAffordance />

          <nav
            aria-label="Utility navigation"
            className="flex h-full items-center gap-4"
          >
            {utilityItems.map((item) => (
              <button
                key={item}
                type="button"
                className={`h-full text-[12px] font-normal whitespace-nowrap text-white hover:text-white/80 ${darkFocusClassName}`}
              >
                {item}
              </button>
            ))}

            <span
              aria-label="PayPal Preferred Payments Partner"
              className="hidden h-6 items-center gap-1 bg-white px-2 text-[#111111] min-[900px]:flex"
            >
              <span className="text-[12px] font-bold tracking-[-0.04em]">
                PayPal
              </span>
              <span className="max-w-[44px] text-[7px] leading-[7px]">
                Preferred Payments Partner
              </span>
            </span>
          </nav>
        </div>
      </div>

      <div className="h-[70px] bg-primary">
        <div className="flex h-full min-w-0 items-center gap-3 px-4">
          <Link
            href="/"
            aria-label="Ticketmaster home"
            className={`inline-flex h-6 w-[120px] shrink-0 items-center text-[22px] leading-none font-black tracking-[-0.075em] italic ${blueFocusClassName}`}
          >
            ticketmaster
            <sup aria-hidden="true" className="ml-0.5 text-[6px] not-italic">
              {"\u00ae"}
            </sup>
          </Link>

          <nav
            aria-label="Primary navigation"
            className="flex min-w-0 items-center gap-0.5 lg:gap-1 xl:gap-2"
          >
            {categoryItems.map((item) => (
              <button
                key={item}
                type="button"
                className={`h-11 px-1.5 text-[12px] font-semibold whitespace-nowrap text-white hover:bg-black/10 lg:text-[13px] ${blueFocusClassName}`}
              >
                {item}
              </button>
            ))}
            <button
              type="button"
              aria-label="More navigation options"
              className={`flex h-11 items-center gap-0.5 px-1.5 text-[12px] font-semibold whitespace-nowrap text-white hover:bg-black/10 lg:text-[13px] ${blueFocusClassName}`}
            >
              More
              <ChevronDown aria-hidden="true" className="size-3.5" />
            </button>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label="Search"
              className={`flex size-11 items-center justify-center border border-white/50 text-white hover:bg-black/10 min-[900px]:h-[42px] min-[900px]:w-[200px] min-[900px]:justify-between min-[900px]:px-2 min-[944px]:w-[244px] ${blueFocusClassName}`}
            >
              <span className="hidden min-w-0 flex-col items-start min-[900px]:flex">
                <span className="text-[9px] leading-[11px] font-semibold uppercase">
                  Search
                </span>
                <span className="truncate text-[12px] leading-4 font-normal">
                  Artist, Event or Venue
                </span>
              </span>
              <Search aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.75} />
            </button>

            <button
              type="button"
              aria-label="Sign In/Register"
              className={`flex h-11 items-center gap-1.5 px-1.5 text-[13px] font-normal whitespace-nowrap text-white hover:bg-black/10 ${blueFocusClassName}`}
            >
              <UserRound aria-hidden="true" className="size-5" strokeWidth={1.75} />
              <span className="hidden min-[1100px]:inline">
                Sign In/Register
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
