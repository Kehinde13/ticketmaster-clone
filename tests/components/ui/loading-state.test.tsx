import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LoadingState } from "@/components/ui/loading-state";

describe("LoadingState", () => {
  it("renders its accessible default status", () => {
    render(<LoadingState />);

    const status = screen.getByRole("status");

    expect(status).toHaveTextContent("Loading…");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveAttribute("aria-atomic", "true");
    expect(within(status).queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders a custom loading message", () => {
    render(<LoadingState message="Preparing results…" />);

    expect(screen.getByRole("status")).toHaveTextContent("Preparing results…");
  });
});
