import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";

import { DiscoverSearchFilterShell } from "@/components/filters/discover-search-filter-shell";

function renderShell(ui: ReactElement = <DiscoverSearchFilterShell />) {
  return render(
    <QueryClientProvider client={new QueryClient()}>{ui}</QueryClientProvider>,
  );
}

describe("DiscoverSearchFilterShell", () => {
  it("renders the location and default date shells accessibly", () => {
    renderShell();

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

  it("renders one event search input inside a search form", () => {
    renderShell();

    const searchInput = screen.getByRole("searchbox", { name: "Search" });
    const searchAction = screen.getByRole("button", { name: "Search" });

    expect(searchInput).toHaveAttribute(
      "placeholder",
      "Artist, Event or Venue",
    );
    expect(searchInput.closest("form")).toHaveAttribute("role", "search");
    expect(searchAction).toHaveAttribute("type", "submit");
    expect(searchAction).toBeDisabled();
  });

  it("provides the compact mobile location heading affordance", () => {
    renderShell();

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
