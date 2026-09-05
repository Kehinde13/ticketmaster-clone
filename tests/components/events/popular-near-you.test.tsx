import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PopularNearYou } from "@/components/events/popular-near-you";

describe("PopularNearYou", () => {
  it("renders the first Popular Near You row with six events", () => {
    render(<PopularNearYou />);

    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Popular Near You",
    });
    const section = heading.closest("section");

    expect(section).not.toBeNull();
    expect(
      within(section!).getByRole("heading", { level: 3, name: "Concerts" }),
    ).toBeInTheDocument();
    expect(within(section!).getAllByRole("article")).toHaveLength(6);
  });

  it("renders unique representative event names", () => {
    render(<PopularNearYou />);

    const names = screen
      .getAllByRole("heading", { level: 4 })
      .map((heading) => heading.textContent);

    expect(names).toHaveLength(6);
    expect(new Set(names).size).toBe(names.length);
  });
});
