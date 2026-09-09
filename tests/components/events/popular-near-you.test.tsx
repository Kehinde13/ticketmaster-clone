import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { PopularNearYou } from "@/components/events/popular-near-you";

vi.mock("@/components/events/popular-event-row", () => ({
  PopularEventRow: ({ category, countryCode }: { category: string; countryCode: string }) => (
    <article aria-label={`${category} ${countryCode} live row`}>
      {category} {countryCode} live row
    </article>
  ),
}));

describe("PopularNearYou", () => {
  it("renders all four event rows in the current order", () => {
    const { container } = render(<PopularNearYou countryCode="GB" />);

    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Popular Near You",
    });
    const section = heading.closest("section");

    expect(section).not.toBeNull();
    if (!section) throw new Error("Popular Near You section is required.");
    const categoryHeadings = within(section).getAllByRole("heading", {
      level: 3,
    });

    expect(categoryHeadings.map((category) => category.textContent)).toEqual([
      "Concerts",
      "Sports",
      "Arts, Theater & Comedy",
      "Family",
    ]);
    expect(within(section).getAllByRole("article")).toHaveLength(4);
    expect(within(section).getAllByText("See All")).toHaveLength(4);

    const semanticIds = Array.from(
      container.querySelectorAll('[id^="event-card-"][id$="-title"]'),
      (element) => element.id,
    );

    expect(semanticIds).toHaveLength(0);
  });

  it("renders all four rows through the live row architecture", () => {
    render(<PopularNearYou countryCode="GB" />);

    expect(screen.getByText("concerts GB live row")).toBeInTheDocument();
    expect(screen.getByText("sports GB live row")).toBeInTheDocument();
    expect(screen.getByText("arts-theater-comedy GB live row")).toBeInTheDocument();
    expect(screen.getByText("family GB live row")).toBeInTheDocument();
  });
});
