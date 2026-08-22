import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MobileHeader } from "@/components/navigation/mobile-header";

describe("MobileHeader", () => {
  it("renders the global header and home branding", () => {
    render(<MobileHeader />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Ticketmaster home" }),
    ).toHaveAttribute("href", "/");
  });

  it("provides accessible names for the observed icon actions", () => {
    render(<MobileHeader />);

    expect(screen.getByRole("button", { name: "Menu" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Account" })).toBeEnabled();
  });
});
