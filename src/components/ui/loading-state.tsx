import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

type LoadingStateProps = {
  message?: string;
  compact?: boolean;
  className?: string;
};

function LoadingState({
  message = "Loading…",
  compact = false,
  className,
}: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "text-foreground-secondary flex min-w-0 items-center justify-center text-center",
        compact ? "gap-2 py-3 text-sm" : "flex-col gap-3 px-4 py-10",
        className,
      )}
    >
      <LoaderCircle
        aria-hidden="true"
        className={cn(
          "text-primary motion-safe:animate-spin motion-reduce:animate-none",
          compact ? "size-4" : "size-6",
        )}
      />
      <span>{message}</span>
    </div>
  );
}

export { LoadingState };
export type { LoadingStateProps };
