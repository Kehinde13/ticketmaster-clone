import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PopularNearYou } from "@/components/events/popular-near-you";

describe("PopularNearYou", () => {
  it("renders all four event rows in the current order", () => {
    const { container } = render(<PopularNearYou />);

    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Popular Near You",
    });
    const section = heading.closest("section");

    expect(section).not.toBeNull();
    const categoryHeadings = within(section!).getAllByRole("heading", {
      level: 3,
    });

    expect(categoryHeadings.map((category) => category.textContent)).toEqual([
      "Concerts",
      "Sports",
      "Arts, Theater & Comedy",
      "Family",
    ]);
    expect(within(section!).getAllByRole("article")).toHaveLength(24);
    expect(within(section!).getAllByText("See All")).toHaveLength(4);

    const semanticIds = Array.from(
      container.querySelectorAll('[id^="event-card-"][id$="-title"]'),
      (element) => element.id,
    );

    expect(new Set(semanticIds).size).toBe(24);
  });

  it("renders representative events from every category", () => {
    render(<PopularNearYou />);

    expect(screen.getByText("Midnight Echo Tour")).toBeInTheDocument();
    expect(screen.getByText("City Hoops Showdown")).toBeInTheDocument();
    expect(screen.getByText("Lights of Broadway")).toBeInTheDocument();
    expect(screen.getByText("Adventure on Ice")).toBeInTheDocument();
  });
});
