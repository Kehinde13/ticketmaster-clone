import { SearchX } from "lucide-react";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EmptyState } from "@/components/ui/empty-state";

describe("EmptyState", () => {
  it("renders supplied content in a labelled region", () => {
    render(
      <EmptyState
        title="Nothing to show"
        description="Try changing your selection."
      />,
    );

    const region = screen.getByRole("region", { name: "Nothing to show" });

    expect(within(region).getByRole("heading", { name: "Nothing to show" })).toBeVisible();
    expect(within(region).getByText("Try changing your selection.")).toBeVisible();
  });

  it("renders an action while keeping a supplied icon decorative", () => {
    render(
      <EmptyState
        title="Nothing to show"
        icon={<SearchX />}
        action={<button type="button">Clear selection</button>}
      />,
    );

    const region = screen.getByRole("region", { name: "Nothing to show" });

    expect(within(region).getByRole("button", { name: "Clear selection" })).toBeVisible();
    expect(within(region).queryByRole("img")).not.toBeInTheDocument();
  });
});
