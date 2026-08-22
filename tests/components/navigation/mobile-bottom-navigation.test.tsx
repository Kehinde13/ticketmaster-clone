import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MobileBottomNavigation } from "@/components/navigation/mobile-bottom-navigation";

describe("MobileBottomNavigation", () => {
  it("renders the five primary application destinations in order", () => {
    render(<MobileBottomNavigation />);

    const navigation = screen.getByRole("navigation", {
      name: "Primary mobile navigation",
    });
    const destinations = within(navigation).getAllByRole("button");

    expect(destinations.map((destination) => destination.textContent)).toEqual([
      "Discover",
      "For You",
      "My Tickets",
      "Sell",
      "My Account",
    ]);
  });

  it("represents Discover as the current shell destination", () => {
    render(<MobileBottomNavigation />);

    expect(screen.getByRole("button", { name: "Discover" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(
      screen
        .getAllByRole("button")
        .filter((destination) => destination.hasAttribute("aria-current")),
    ).toHaveLength(1);
  });
});
