import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CountryProvider, useCountry } from "@/components/providers/country-provider";

const { refresh } = vi.hoisted(() => ({ refresh: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh }),
}));

function Consumer() {
  const { selectedCountry, setSelectedCountry } = useCountry();
  return <><span>{selectedCountry.name}</span><button onClick={() => setSelectedCountry("CA")}>Select Canada</button><button onClick={() => setSelectedCountry(selectedCountry.code)}>Select current</button></>;
}

describe("CountryProvider", () => {
  beforeEach(() => {
    refresh.mockClear();
    document.cookie = "ticketmaster-country=; Max-Age=0; Path=/";
  });

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
    expect(refresh).toHaveBeenCalledTimes(1);
  });

  it("does not persist or refresh when selecting the active country", async () => {
    const user = userEvent.setup();
    render(<CountryProvider initialCountryCode="US"><Consumer /></CountryProvider>);
    await user.click(screen.getByRole("button", { name: "Select current" }));
    expect(document.cookie).not.toContain("ticketmaster-country");
    expect(refresh).not.toHaveBeenCalled();
  });
});
