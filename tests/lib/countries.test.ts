import { describe, expect, it } from "vitest";

import { defaultCountry, getSupportedCountry, isSupportedCountryCode } from "@/lib/countries";

describe("country preferences", () => {
  it.each(["US", "CA", "GB", "AU", "IE", "NZ"])("accepts supported code %s", (code) => {
    expect(isSupportedCountryCode(code)).toBe(true);
  });

  it.each(["", "gb", "ZZ", "USA", null])("rejects unsupported value %s", (value) => {
    expect(isSupportedCountryCode(value)).toBe(false);
    expect(getSupportedCountry(value)).toBe(defaultCountry);
  });

  it("returns canonical country data", () => {
    expect(getSupportedCountry("GB")).toMatchObject({ code: "GB", name: "United Kingdom" });
  });
});
