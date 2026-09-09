export const COUNTRY_COOKIE_NAME = "ticketmaster-country";
export const COUNTRY_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const supportedCountries = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "IE", name: "Ireland", flag: "🇮🇪" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
] as const;

export type CountryCode = (typeof supportedCountries)[number]["code"];
export type SupportedCountry = (typeof supportedCountries)[number];

export const defaultCountry = supportedCountries[0];

export function isSupportedCountryCode(value: unknown): value is CountryCode {
  return typeof value === "string" &&
    supportedCountries.some((country) => country.code === value);
}

export function getSupportedCountry(value: unknown): SupportedCountry {
  if (!isSupportedCountryCode(value)) return defaultCountry;
  return supportedCountries.find((country) => country.code === value) ?? defaultCountry;
}
