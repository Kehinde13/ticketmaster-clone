import {
  Banknote,
  CircleUserRound,
  Heart,
  Search,
  Ticket,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

type MobileDestination = {
  label: string;
  icon: LucideIcon;
  current?: boolean;
};

const destinations: readonly MobileDestination[] = [
  { label: "Discover", icon: Search, current: true },
  { label: "For You", icon: Heart },
  { label: "My Tickets", icon: Ticket },
  { label: "Sell", icon: Banknote },
  { label: "My Account", icon: CircleUserRound },
];

export function MobileBottomNavigation() {
  return (
    <nav
      aria-label="Primary mobile navigation"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <div className="grid h-16 grid-cols-5">
        {destinations.map(({ current, icon: Icon, label }) => (
          <button
            key={label}
            type="button"
            aria-current={current ? "page" : undefined}
            className={cn(
              "flex min-w-0 flex-col items-center justify-center gap-1 px-0.5 text-[12px] leading-[14px] font-normal whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus-ring",
              current ? "text-primary" : "text-[#767676]",
            )}
          >
            <Icon
              aria-hidden="true"
              className={cn(
                "shrink-0",
                current ? "size-[28px]" : "size-[25px]",
              )}
              strokeWidth={current ? 2.25 : 1.75}
            />
            <span className="truncate">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
