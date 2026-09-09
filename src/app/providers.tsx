"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { CountryProvider } from "@/components/providers/country-provider";
import type { CountryCode } from "@/lib/countries";
import { getQueryClient } from "@/lib/query/get-query-client";

export function Providers({ children, initialCountryCode }: Readonly<{ children: ReactNode; initialCountryCode: CountryCode }>) {
  const queryClient = getQueryClient();

  return (
    <CountryProvider initialCountryCode={initialCountryCode}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </CountryProvider>
  );
}
