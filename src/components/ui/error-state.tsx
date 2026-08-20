import { CircleAlert } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ErrorStateProps = {
  title?: string;
  description?: string;
  reference?: string;
  action?: ReactNode;
  compact?: boolean;
  className?: string;
};

function ErrorState({
  title = "Something went wrong",
  description = "We couldn't complete that request. Please try again.",
  reference,
  action,
  compact = false,
  className,
}: ErrorStateProps) {
  return (
    <section
      role="alert"
      aria-atomic="true"
      className={cn(
        "flex min-w-0 flex-col items-center justify-center text-center",
        compact ? "gap-2 py-4" : "gap-3 px-4 py-10",
        className,
      )}
    >
      <CircleAlert
        aria-hidden="true"
        className={cn("text-error", compact ? "size-5" : "size-6")}
      />
      <div className="min-w-0 max-w-prose">
        <h2 className={cn("text-foreground", compact ? "text-base" : "text-xl")}>
          {title}
        </h2>
        {description ? (
          <p className="text-foreground-secondary mt-1 text-sm text-pretty">
            {description}
          </p>
        ) : null}
        {reference ? (
          <p className="text-foreground-muted mt-2 break-words text-xs">
            Reference: {reference}
          </p>
        ) : null}
      </div>
      {action ? <div className="flex max-w-full flex-wrap justify-center gap-2">{action}</div> : null}
    </section>
  );
}

export { ErrorState };
export type { ErrorStateProps };
