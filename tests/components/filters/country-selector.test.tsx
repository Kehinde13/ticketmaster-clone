import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CountrySelector } from "@/components/filters/country-selector";
import { CountryProvider } from "@/components/providers/country-provider";

function Selector() {
  return <CountrySelector triggerLabel="Change country, currently United States" triggerClassName="" trigger="US" />;
}

describe("CountrySelector", () => {
  it("filters, exposes selection, and closes after choosing a country", async () => {
    const user = userEvent.setup();
    render(<CountryProvider initialCountryCode="US"><Selector /></CountryProvider>);
    const trigger = screen.getByRole("button", { name: /Change country/ });
    await user.click(trigger);
    const dialog = await screen.findByRole("dialog", { name: "Select your country" });
    expect(screen.getByRole("button", { name: /United States/ })).toHaveAttribute("aria-current", "true");
    await user.type(screen.getByRole("textbox", { name: "Search countries" }), "gb");
    expect(screen.getByRole("button", { name: /United Kingdom/ })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Canada/ })).not.toBeInTheDocument();
    await user.clear(screen.getByRole("textbox", { name: "Search countries" }));
    await user.type(screen.getByRole("textbox", { name: "Search countries" }), "zzz");
    expect(screen.getByText("No countries found")).toBeInTheDocument();
    await user.clear(screen.getByRole("textbox", { name: "Search countries" }));
    await user.click(screen.getByRole("button", { name: /Canada/ }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(document.cookie).toContain("ticketmaster-country=CA");
    expect(dialog).not.toBeInTheDocument();
  });
});
