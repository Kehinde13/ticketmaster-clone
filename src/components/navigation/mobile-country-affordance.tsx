"use client";

import { CountrySelector } from "@/components/filters/country-selector";
import { useCountry } from "@/components/providers/country-provider";
import { CountryFlag } from "@/components/navigation/country-flag";

export function MobileCountryAffordance() {
  const { selectedCountry } = useCountry();
  return (
    <CountrySelector
      triggerLabel={`Change country, currently ${selectedCountry.name}`}
      triggerClassName="flex h-[47px] w-full items-center gap-2.5 bg-[#111111] px-3 text-left text-[17px] leading-none font-normal text-white outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white active:bg-[#242424] md:hidden"
      trigger={<><CountryFlag country={selectedCountry} size="mobile" /><span>{selectedCountry.code}</span></>}
    />
  );
}
