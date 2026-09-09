import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CountryProvider, useCountry } from "@/components/providers/country-provider";

function Consumer() {
  const { selectedCountry, setSelectedCountry } = useCountry();
  return <><span>{selectedCountry.name}</span><button onClick={() => setSelectedCountry("CA")}>Select Canada</button></>;
}

describe("CountryProvider", () => {
  it.each([["GB", "United Kingdom"], ["ZZ", "United States"], [undefined, "United States"]])("initializes %s safely", (initial, name) => {
    render(<CountryProvider initialCountryCode={initial}><Consumer /></CountryProvider>);
    expect(screen.getByText(name)).toBeInTheDocument();
  });

  it("updates state and writes a scoped preference cookie", async () => {
    const user = userEvent.setup();
    render(<CountryProvider initialCountryCode="US"><Consumer /></CountryProvider>);
    await user.click(screen.getByRole("button", { name: "Select Canada" }));
    expect(screen.getByText("Canada")).toBeInTheDocument();
    expect(document.cookie).toContain("ticketmaster-country=CA");
  });
});
