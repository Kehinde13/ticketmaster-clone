import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DesktopHeader } from "@/components/navigation/desktop-header";

describe("DesktopHeader", () => {
  it("renders the desktop banner, branding, and labeled navigation landmarks", () => {
    render(<DesktopHeader />);

    const header = screen.getByRole("banner");

    expect(
      within(header).getByRole("link", { name: "Ticketmaster home" }),
    ).toHaveAttribute("href", "/");
    expect(
      within(header).getByRole("navigation", { name: "Utility navigation" }),
    ).toBeInTheDocument();
    expect(
      within(header).getByRole("navigation", { name: "Primary navigation" }),
    ).toBeInTheDocument();
  });

  it("renders the supported utility and category controls", () => {
    render(<DesktopHeader />);

    const utility = screen.getByRole("navigation", {
      name: "Utility navigation",
    });
    const primary = screen.getByRole("navigation", {
      name: "Primary navigation",
    });

    expect(within(utility).getAllByRole("button").map((item) => item.textContent)).toEqual([
      "Hotels",
      "Sell",
      "Gift Cards",
      "Help",
      "VIP",
    ]);
    expect(within(primary).getAllByRole("button").map((item) => item.textContent?.trim())).toEqual([
      "Concerts",
      "Sports",
      "Arts, Theater & Comedy",
      "Family",
      "Cities",
      "More",
    ]);
  });

  it("gives shell-only global actions meaningful accessible names", () => {
    render(<DesktopHeader />);

    expect(
      screen.getByRole("button", {
        name: "Change country, currently United States",
      }),
    ).toBeEnabled();
    expect(screen.getByRole("button", { name: "Search" })).toBeEnabled();
    expect(
      screen.getByRole("button", { name: "Sign In/Register" }),
    ).toBeEnabled();
    expect(
      screen.getByRole("button", { name: "More navigation options" }),
    ).toBeEnabled();
  });
});
