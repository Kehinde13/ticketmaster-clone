"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Check, Search, X } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

import { useCountry } from "@/components/providers/country-provider";
import { supportedCountries } from "@/lib/countries";

type CountrySelectorProps = Readonly<{
  trigger: ReactNode;
  triggerClassName: string;
  triggerLabel: string;
}>;

export function CountrySelector({ trigger, triggerClassName, triggerLabel }: CountrySelectorProps) {
  const { selectedCountry, setSelectedCountry } = useCountry();
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const countries = supportedCountries.filter((country) =>
    `${country.name} ${country.code}`.toLowerCase().includes(normalized),
  );

  return (
    <Dialog.Root onOpenChange={(open) => { if (!open) setQuery(""); }}>
      <Dialog.Trigger aria-label={triggerLabel} className={triggerClassName}>
        {trigger}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/55 transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 motion-reduce:transition-none" />
        <Dialog.Popup className="fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] rounded-t-[8px] bg-white text-foreground shadow-[0_-8px_32px_rgb(0_0_0/20%)] outline-none transition-transform data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full motion-reduce:transition-none md:top-1/2 md:bottom-auto md:left-1/2 md:w-[520px] md:max-w-[calc(100vw-32px)] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-[8px] md:data-[ending-style]:-translate-y-[45%] md:data-[starting-style]:-translate-y-[45%]">
          <div className="flex h-16 items-center justify-between border-b border-border px-5">
            <Dialog.Title className="text-[20px] font-bold">Select your country</Dialog.Title>
            <Dialog.Close aria-label="Close country selector" className="flex size-11 items-center justify-center rounded-sm outline-none hover:bg-surface-subtle focus-visible:ring-2 focus-visible:ring-focus-ring">
              <X aria-hidden="true" className="size-6" />
            </Dialog.Close>
          </div>
          <div className="p-4 md:p-5">
            <label htmlFor="country-search" className="sr-only">Search countries</label>
            <div className="flex h-12 items-center gap-3 rounded-[3px] border border-border px-3 focus-within:ring-2 focus-within:ring-focus-ring">
              <Search aria-hidden="true" className="size-5 text-foreground-secondary" />
              <input id="country-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search countries" className="h-full min-w-0 flex-1 outline-none" />
            </div>
            <div className="mt-3 max-h-[52dvh] overflow-y-auto overscroll-contain">
              {countries.length ? countries.map((country) => (
                <Dialog.Close
                  key={country.code}
                  aria-current={country.code === selectedCountry.code ? "true" : undefined}
                  onClick={() => setSelectedCountry(country.code)}
                  className="flex min-h-14 w-full items-center gap-3 rounded-[3px] px-3 text-left outline-none hover:bg-surface-subtle focus-visible:bg-surface-subtle focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus-ring"
                >
                  <span aria-hidden="true" className="text-[24px] leading-none">{country.flag}</span>
                  <span className="flex-1 text-[16px] font-semibold">{country.name}</span>
                  {country.code === selectedCountry.code ? <Check aria-label="Selected" className="size-5 text-primary" /> : null}
                </Dialog.Close>
              )) : <p className="py-8 text-center text-foreground-secondary">No countries found</p>}
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
