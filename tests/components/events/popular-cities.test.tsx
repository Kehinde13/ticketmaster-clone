import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PopularCities } from "@/components/events/popular-cities";

const expectedCityNames = [
  "New York City",
  "Los Angeles",
  "Las Vegas",
  "Chicago",
  "Atlanta",
  "Nashville",
  "Denver",
  "Miami",
];

describe("PopularCities", () => {
  it("renders eight cities in the verified current order", () => {
    render(<PopularCities />);

    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Popular Cities",
    });
    const section = heading.closest("section");

    expect(section).not.toBeNull();

    const cards = within(section!).getAllByRole("article");
    const names = cards.map(
      (card) => within(card).getByRole("heading", { level: 3 }).textContent,
    );

    expect(cards).toHaveLength(8);
    expect(names).toEqual(expectedCityNames);
    expect(within(section!).getByText("See All")).toBeInTheDocument();
  });

  it("associates every city article with a unique title", () => {
    const { container } = render(<PopularCities />);

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
