import type { EventCardData } from "@/types/event";

type EventCardProps = {
  event: EventCardData;
  artworkClassName: string;
};

export function EventCard({ event, artworkClassName }: EventCardProps) {
  const titleId = `event-card-${event.id}-title`;

  return (
    <article aria-labelledby={titleId} className="min-w-0">
      <div
        aria-hidden="true"
        className={`relative aspect-[3/2] overflow-hidden rounded-[4px] bg-gradient-to-br ${artworkClassName}`}
      >
        <div className="absolute top-[18%] -left-[8%] h-[38%] w-[72%] -rotate-6 rounded-full border-[16px] border-white/15" />
        <div className="absolute -right-[6%] -bottom-[30%] size-[70%] rotate-12 rounded-[28px] bg-black/15" />
        <div className="absolute right-4 bottom-4 flex items-end gap-1 opacity-70">
          <span className="h-7 w-1.5 rounded-full bg-white" />
          <span className="h-11 w-1.5 rounded-full bg-white" />
          <span className="h-8 w-1.5 rounded-full bg-white" />
          <span className="h-14 w-1.5 rounded-full bg-white" />
        </div>
      </div>

      <div className="pt-3">
        <p className="text-[12px] leading-4 font-semibold text-foreground-muted">
          {event.category}
        </p>
        <p className="mt-1 text-[14px] leading-5 font-bold text-primary">
          {event.dateLabel}
        </p>
        <h4
          id={titleId}
          className="mt-1 line-clamp-2 text-[16px] leading-5 font-bold text-foreground"
        >
          {event.name}
        </h4>
        <p className="mt-1 line-clamp-2 text-[14px] leading-5 text-foreground-secondary">
          {event.venue} <span aria-hidden="true">&bull;</span>{" "}
          {event.location}
        </p>
      </div>
    </article>
  );
}
