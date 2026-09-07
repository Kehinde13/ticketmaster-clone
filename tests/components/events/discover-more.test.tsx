import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DiscoverMore } from "@/components/events/discover-more";

const expectedHeadlines = [
  "A Look at the 2026 MLB Schedule and New Rules",
  "What to Bring to a Concert",
  "MLS 2026 Season FAQs",
  "Get the Most Out of Your Ticketmaster Account",
  "US Open Ticket Buying Guide",
  "6 Broadway Shows to See This Summer in NYC",
];

describe("DiscoverMore", () => {
  it("renders six editorial cards in the current order", () => {
    render(<DiscoverMore />);

    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Discover More",
    });
    const section = heading.closest("section");

    expect(section).not.toBeNull();

    const cards = within(section!).getAllByRole("article");
    const headlines = cards.map(
      (card) => within(card).getByRole("heading", { level: 3 }).textContent,
    );

    expect(cards).toHaveLength(6);
    expect(headlines).toEqual(expectedHeadlines);
    expect(
      within(section!).getAllByText("Discover More", { selector: "span" }),
    ).toHaveLength(6);
  });

  it("preserves categories and unique article title relationships", () => {
    const { container } = render(<DiscoverMore />);

    expect(screen.getAllByText("Sports")).toHaveLength(3);
    expect(screen.getByText("Ticket Tips")).toBeInTheDocument();
    expect(screen.getByText("General Info")).toBeInTheDocument();
    expect(screen.getByText("Local Guide")).toBeInTheDocument();

    const articles = screen.getAllByRole("article");
    const labelledByValues = articles.map((article) =>
      article.getAttribute("aria-labelledby"),
    );

    expect(new Set(labelledByValues).size).toBe(articles.length);

    for (const labelledBy of labelledByValues) {
      expect(labelledBy).not.toBeNull();
      expect(container.querySelector(`#${labelledBy}`)).not.toBeNull();
    }
  });
});
