import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MobileCountryAffordance } from "@/components/navigation/mobile-country-affordance";
import { CountryProvider } from "@/components/providers/country-provider";

describe("MobileCountryAffordance", () => {
  it("identifies the current market and the deferred action accessibly", () => {
    render(<CountryProvider initialCountryCode="US"><MobileCountryAffordance /></CountryProvider>);

    const control = screen.getByRole("button", {
      name: "Change country, currently United States",
    });

    expect(within(control).getByText("US")).toBeInTheDocument();
    expect(within(control).queryByRole("img")).not.toBeInTheDocument();
  });
});
