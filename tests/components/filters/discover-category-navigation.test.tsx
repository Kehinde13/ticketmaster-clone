import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DiscoverCategoryNavigation } from "@/components/filters/discover-category-navigation";

describe("DiscoverCategoryNavigation", () => {
  it("renders the supported event categories in order", () => {
    render(<DiscoverCategoryNavigation />);

    const navigation = screen.getByRole("navigation", {
      name: "Event categories",
    });
    const controls = within(navigation).getAllByRole("button");

    expect(controls.map((control) => control.textContent)).toEqual([
      "Concerts",
      "Sports",
      "Arts, Theater & Comedy",
      "Family",
    ]);
  });

  it("does not invent a selected category or duplicate labels", () => {
    render(<DiscoverCategoryNavigation />);

    const controls = screen.getAllByRole("button");

    expect(controls).toHaveLength(4);
    expect(
      controls.every((control) => !control.hasAttribute("aria-current")),
    ).toBe(true);
    expect(new Set(controls.map((control) => control.textContent)).size).toBe(4);
  });
});
