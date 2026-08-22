import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { MobileNavigation } from "@/components/navigation/mobile-navigation";

let desktopMatches = false;
const desktopListeners = new Set<() => void>();

beforeEach(() => {
  desktopMatches = false;
  desktopListeners.clear();

  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn(() => ({
      get matches() {
        return desktopMatches;
      },
      addEventListener: (_type: string, listener: () => void) =>
        desktopListeners.add(listener),
      removeEventListener: (_type: string, listener: () => void) =>
        desktopListeners.delete(listener),
    })),
  });
});

describe("MobileNavigation", () => {
  it("opens the drawer with the observed primary navigation labels", async () => {
    const user = userEvent.setup();
    render(<MobileNavigation />);

    const trigger = screen.getByRole("button", { name: "Menu" });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);

    const dialog = await screen.findByRole("dialog", { name: "Menu" });
    const navigation = within(dialog).getByRole("navigation", {
      name: "Primary navigation",
    });

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(
      within(navigation).getAllByRole("button").map((item) => item.textContent),
    ).toEqual(["Concerts", "Sports", "Arts, Theater & Comedy", "Family"]);
  });

  it("closes with the close control and restores focus to Menu", async () => {
    const user = userEvent.setup();
    render(<MobileNavigation />);

    const trigger = screen.getByRole("button", { name: "Menu" });
    await user.click(trigger);

    const close = await screen.findByRole("button", { name: "Close menu" });
    await waitFor(() => expect(close).toHaveFocus());
    await user.click(close);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(trigger).toHaveFocus();
    });
  });

  it("closes with Escape and restores focus to Menu", async () => {
    const user = userEvent.setup();
    render(<MobileNavigation />);

    const trigger = screen.getByRole("button", { name: "Menu" });
    await user.click(trigger);
    await screen.findByRole("dialog", { name: "Menu" });

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(trigger).toHaveFocus();
    });
  });

  it("closes when the viewport crosses into the desktop breakpoint", async () => {
    const user = userEvent.setup();
    render(<MobileNavigation />);

    await user.click(screen.getByRole("button", { name: "Menu" }));
    await screen.findByRole("dialog", { name: "Menu" });

    act(() => {
      desktopMatches = true;
      desktopListeners.forEach((listener) => listener());
    });

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });
});
