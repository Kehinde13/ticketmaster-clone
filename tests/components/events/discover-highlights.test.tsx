import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DiscoverHighlights } from "@/components/events/discover-highlights";

describe("DiscoverHighlights", () => {
  it("renders the Highlights section and its representative cards", () => {
    render(<DiscoverHighlights />);

    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Highlights",
    });
    const section = heading.closest("section");

    expect(section).not.toBeNull();
    expect(within(section!).getAllByRole("listitem")).toHaveLength(4);
    expect(
      within(section!).getByRole("heading", {
        level: 3,
        name: "Find your next live show",
      }),
    ).toBeInTheDocument();
    expect(
      within(section!).getByRole("heading", {
        level: 3,
        name: "Make memories together",
      }),
    ).toBeInTheDocument();
  });

  it("renders unique highlight labels", () => {
    render(<DiscoverHighlights />);

    const cards = screen.getAllByRole("article");
    const labels = cards.map((card) => card.textContent?.trim());

    expect(cards).toHaveLength(4);
    expect(new Set(labels).size).toBe(cards.length);
  });
});
