import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  compact?: boolean;
  className?: string;
};

function EmptyState({
  title,
  description,
  icon,
  action,
  compact = false,
  className,
}: EmptyStateProps) {
  return (
    <section
      aria-label={title}
      className={cn(
        "flex min-w-0 flex-col items-center justify-center text-center",
        compact ? "gap-2 py-4" : "gap-3 px-4 py-10",
        className,
      )}
    >
      {icon ? (
        <div aria-hidden="true" className="text-foreground-muted [&_svg]:size-6">
          {icon}
        </div>
      ) : null}
      <div className="min-w-0 max-w-prose">
        <h2 className={cn("text-foreground", compact ? "text-base" : "text-xl")}>
          {title}
        </h2>
        {description ? (
          <p className="text-foreground-secondary mt-1 text-sm text-pretty">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="flex max-w-full flex-wrap justify-center gap-2">{action}</div> : null}
    </section>
  );
}

export { EmptyState };
export type { EmptyStateProps };
