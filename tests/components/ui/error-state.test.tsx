import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ErrorState } from "@/components/ui/error-state";

describe("ErrorState", () => {
  it("renders safe fallback copy with alert semantics", () => {
    render(<ErrorState />);

    const alert = screen.getByRole("alert");

    expect(within(alert).getByRole("heading", { name: "Something went wrong" })).toBeVisible();
    expect(alert).toHaveTextContent("We couldn't complete that request. Please try again.");
    expect(alert).toHaveAttribute("aria-atomic", "true");
    expect(within(alert).queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders safe custom content, a reference, and an action", () => {
    render(
      <ErrorState
        title="Unable to continue"
        description="Please return and try again."
        reference="REQ-123"
        action={<button type="button">Return</button>}
      />,
    );

    const alert = screen.getByRole("alert");

    expect(within(alert).getByRole("heading", { name: "Unable to continue" })).toBeVisible();
    expect(within(alert).getByText("Please return and try again.")).toBeVisible();
    expect(within(alert).getByText("Reference: REQ-123")).toBeVisible();
    expect(within(alert).getByRole("button", { name: "Return" })).toBeVisible();
  });
});
