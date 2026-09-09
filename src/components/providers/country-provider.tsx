"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

import {
  COUNTRY_COOKIE_MAX_AGE,
  COUNTRY_COOKIE_NAME,
  getSupportedCountry,
} from "@/lib/countries";
import type { CountryCode, SupportedCountry } from "@/lib/countries";

type CountryContextValue = Readonly<{
  selectedCountry: SupportedCountry;
  setSelectedCountry: (code: CountryCode) => void;
}>;

const CountryContext = createContext<CountryContextValue | null>(null);

export function CountryProvider({
  initialCountryCode,
  children,
}: Readonly<{ initialCountryCode: unknown; children: ReactNode }>) {
  const router = useRouter();
  const [selectedCountry, setCountry] = useState(() =>
    getSupportedCountry(initialCountryCode),
  );

  function setSelectedCountry(code: CountryCode) {
    const country = getSupportedCountry(code);
    if (country.code === selectedCountry.code) return;

    setCountry(country);
    document.cookie = `${COUNTRY_COOKIE_NAME}=${country.code}; Path=/; SameSite=Lax; Max-Age=${COUNTRY_COOKIE_MAX_AGE}`;
    router.refresh();
  }

  return (
    <CountryContext.Provider value={{ selectedCountry, setSelectedCountry }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (!context) throw new Error("useCountry must be used within CountryProvider");
  return context;
}
