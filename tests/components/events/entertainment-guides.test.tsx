import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EntertainmentGuides } from "@/components/events/entertainment-guides";

const expectedGuideTitles = [
  "NBA Basketball Tickets",
  "NHL Hockey Tickets",
  "MLS Soccer Tickets",
  "MLB Baseball Tickets",
  "Broadway Tickets",
];

describe("EntertainmentGuides", () => {
  it("renders exactly five guides in the verified order", () => {
    render(<EntertainmentGuides />);

    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Entertainment Guides",
    });
    const section = heading.closest("section");

    expect(section).not.toBeNull();

    const cards = within(section!).getAllByRole("article");
    const titles = cards.map(
      (card) => within(card).getByRole("heading", { level: 3 }).textContent,
    );

    expect(cards).toHaveLength(5);
    expect(titles).toEqual(expectedGuideTitles);
    expect(new Set(titles).size).toBe(expectedGuideTitles.length);
  });

  it("associates every guide article with a unique title", () => {
    const { container } = render(<EntertainmentGuides />);

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
