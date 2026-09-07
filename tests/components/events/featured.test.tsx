import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Featured } from "@/components/events/featured";

const expectedTitles = [
  "Hotels",
  "Ticket Deals",
  "VIP Packages",
  "Sell on Ticketmaster",
];

describe("Featured", () => {
  it("renders the four verified entries in order", () => {
    render(<Featured />);

    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Featured",
    });
    const section = heading.closest("section");

    expect(section).not.toBeNull();

    const articles = within(section!).getAllByRole("article");
    const titles = articles.map(
      (article) => within(article).getByRole("heading", { level: 3 }).textContent,
    );

    expect(articles).toHaveLength(4);
    expect(titles).toEqual(expectedTitles);

    for (const title of expectedTitles) {
      expect(within(section!).getByText(title)).toBeInTheDocument();
    }
  });

  it("associates each article with one unique title id", () => {
    const { container } = render(<Featured />);
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
