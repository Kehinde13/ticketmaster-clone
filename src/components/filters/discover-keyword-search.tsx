"use client";

import { useQuery } from "@tanstack/react-query";
import {
  CalendarDays,
  ChevronDown,
  LocateFixed,
  Search,
} from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import { useState } from "react";

import { SearchResults } from "@/components/events/search-results";
import { eventSearchQueryOptions } from "@/lib/queries/event-search";

const focusClassName =
  "outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus-ring";

export function DiscoverKeywordSearch({
  categoryNavigation,
}: Readonly<{ categoryNavigation: ReactNode }>) {
  const [inputValue, setInputValue] = useState("");
  const [submittedKeyword, setSubmittedKeyword] = useState<string | null>(null);
  const query = useQuery({
    ...eventSearchQueryOptions({
      keyword: submittedKeyword ?? undefined,
      countryCode: "US",
      page: 0,
      pageSize: 20,
    }),
    enabled: submittedKeyword !== null,
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const keyword = inputValue.trim();
    if (!keyword) {
      setSubmittedKeyword(null);
      return;
    }
    setSubmittedKeyword(keyword);
  }

  return (
    <>
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

          <form
            role="search"
            aria-label="Find events"
            onSubmit={submit}
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
              <label htmlFor="discover-location" className="sr-only">Location</label>
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
              <CalendarDays aria-hidden="true" className="size-5 text-primary" strokeWidth={1.75} />
              <span>All Dates</span>
              <ChevronDown aria-hidden="true" className="ml-auto size-5" strokeWidth={1.75} />
            </button>

            <div className="flex h-[52px] min-w-0 items-center rounded-[3px] border border-border bg-white md:h-full md:flex-1 md:rounded-none md:border-0">
              <Search
                aria-hidden="true"
                className="ml-4 hidden size-5 shrink-0 text-foreground-secondary md:block"
                strokeWidth={1.75}
              />
              <label htmlFor="discover-event-search" className="sr-only">Search</label>
              <input
                id="discover-event-search"
                type="search"
                value={inputValue}
                onChange={(event) => {
                  setInputValue(event.target.value);
                  if (!event.target.value) setSubmittedKeyword(null);
                }}
                placeholder="Artist, Event or Venue"
                className={`h-full min-w-0 flex-1 bg-transparent px-3 text-[16px] text-foreground placeholder:text-foreground-secondary ${focusClassName}`}
              />
              <button
                type="submit"
                aria-label="Search events"
                disabled={!inputValue.trim()}
                className={`order-2 mr-4 flex size-5 shrink-0 items-center justify-center text-foreground-secondary enabled:hover:text-primary md:hidden ${focusClassName}`}
              >
                <Search aria-hidden="true" className="size-5" strokeWidth={1.75} />
              </button>
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className={`m-1 hidden h-[50px] w-[116px] shrink-0 items-center justify-center rounded-[3px] bg-primary text-[16px] font-bold text-primary-foreground enabled:hover:bg-primary-hover disabled:cursor-not-allowed md:inline-flex ${focusClassName}`}
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {categoryNavigation}

      {submittedKeyword ? (
        <SearchResults
          keyword={submittedKeyword}
          result={query.data}
          isPending={query.isPending}
          isError={query.isError}
        />
      ) : null}
    </>
  );
}
