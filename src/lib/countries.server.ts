import "server-only";

import { cookies } from "next/headers";

import {
  COUNTRY_COOKIE_NAME,
  getSupportedCountry,
} from "@/lib/countries";

export async function getServerCountry() {
  const cookieStore = await cookies();
  return getSupportedCountry(cookieStore.get(COUNTRY_COOKIE_NAME)?.value);
}
