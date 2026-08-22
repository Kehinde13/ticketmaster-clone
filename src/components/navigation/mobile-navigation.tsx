"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import {
  MobileHeader,
  mobileHeaderActionClassName,
} from "@/components/navigation/mobile-header";
import { MobileCountryAffordance } from "@/components/navigation/mobile-country-affordance";

const primaryNavigationItems = [
  "Concerts",
  "Sports",
  "Arts, Theater & Comedy",
  "Family",
] as const;

export function MobileNavigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const closeAtDesktop = () => {
      if (desktopQuery.matches) {
        setOpen(false);
      }
    };

    closeAtDesktop();
    desktopQuery.addEventListener("change", closeAtDesktop);

    return () => desktopQuery.removeEventListener("change", closeAtDesktop);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <MobileCountryAffordance />
      <MobileHeader
        menuControl={
          <Dialog.Trigger
            className={mobileHeaderActionClassName}
            aria-label="Menu"
          >
            <Menu
              aria-hidden="true"
              className="size-[26px]"
              strokeWidth={1.75}
            />
          </Dialog.Trigger>
        }
      />

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-black/40 opacity-100 transition-opacity duration-[220ms] ease-out data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 motion-reduce:transition-none md:hidden" />
        <Dialog.Popup className="fixed inset-y-0 left-0 z-50 flex h-dvh w-[calc(100%-48px)] max-w-[360px] -translate-x-0 flex-col bg-surface text-foreground shadow-[8px_0_24px_rgb(18_18_18/18%)] outline-none transition-transform duration-[220ms] ease-out data-[ending-style]:-translate-x-full data-[starting-style]:-translate-x-full motion-reduce:transition-none md:hidden">
          <div className="flex h-[52px] shrink-0 items-center justify-between border-b border-border px-1">
            <Dialog.Title className="pl-5 text-[18px] leading-none font-bold">
              Menu
            </Dialog.Title>
            <Dialog.Close
              className="inline-flex size-11 items-center justify-center rounded-sm outline-none hover:bg-surface-subtle focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 active:bg-surface-subtle"
              aria-label="Close menu"
            >
              <X aria-hidden="true" className="size-[26px]" strokeWidth={1.75} />
            </Dialog.Close>
          </div>

          <nav
            aria-label="Primary navigation"
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-2"
          >
            {primaryNavigationItems.map((item) => (
              <button
                key={item}
                type="button"
                className="flex min-h-14 w-full items-center px-6 text-left text-[16px] leading-6 font-semibold outline-none hover:bg-surface-subtle focus-visible:bg-surface-subtle focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus-ring active:bg-surface-subtle"
              >
                {item}
              </button>
            ))}
          </nav>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
