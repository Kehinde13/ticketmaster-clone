import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DiscoverSearchFilterShell } from "@/components/filters/discover-search-filter-shell";

describe("DiscoverSearchFilterShell", () => {
  it("renders the location and default date shells accessibly", () => {
    render(<DiscoverSearchFilterShell />);

    expect(screen.getByLabelText("Location")).toHaveAttribute(
      "placeholder",
      "City or Zip Code",
    );
    expect(
      screen.getByRole("button", { name: "Current location" }),
    ).toBeEnabled();
    expect(
      screen.getByRole("button", { name: "Change date range: All Dates" }),
    ).toHaveTextContent("All Dates");
  });

  it("renders one event search input and an inert search action", () => {
    render(<DiscoverSearchFilterShell />);

    const searchInput = screen.getByRole("searchbox", { name: "Search" });
    const searchAction = screen.getByRole("button", { name: "Search" });

    expect(searchInput).toHaveAttribute(
      "placeholder",
      "Artist, Event or Venue",
    );
    expect(searchInput.closest("form")).toBeNull();
    expect(searchAction).toHaveAttribute("type", "button");
  });

  it("provides the compact mobile location heading affordance", () => {
    render(<DiscoverSearchFilterShell />);

    expect(
      screen.getByRole("heading", {
        name: "What's Happening in All of United States",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "All of United States" }),
    ).toBeEnabled();
  });
});
