import { Menu, UserRound } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export const mobileHeaderActionClassName =
  "inline-flex size-11 shrink-0 items-center justify-center text-primary-foreground outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary";

type MobileHeaderProps = {
  menuControl?: ReactNode;
};

export function MobileHeader({ menuControl }: MobileHeaderProps) {
  return (
    <header className="h-[52px] bg-primary text-primary-foreground md:hidden">
      <div className="flex h-full items-center justify-between px-1">
        <div className="flex min-w-0 items-center gap-1.5">
          {menuControl ?? (
            <button
              className={mobileHeaderActionClassName}
              type="button"
              aria-label="Menu"
            >
              <Menu
                aria-hidden="true"
                className="size-[26px]"
                strokeWidth={1.75}
              />
            </button>
          )}

          <Link
            href="/"
            aria-label="Ticketmaster home"
            className="truncate text-[24px] leading-none font-black tracking-[-0.075em] italic outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            ticketmaster
            <sup aria-hidden="true" className="ml-0.5 text-[7px] not-italic">
              ®
            </sup>
          </Link>
        </div>

        <button
          className={mobileHeaderActionClassName}
          type="button"
          aria-label="Account"
        >
          <UserRound
            aria-hidden="true"
            className="size-[27px]"
            strokeWidth={1.75}
          />
        </button>
      </div>
    </header>
  );
}
