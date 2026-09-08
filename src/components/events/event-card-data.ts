import type { Event, EventCardData } from "@/types/event";

const dayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short", month: "short", day: "numeric", timeZone: "UTC",
});
const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric", minute: "2-digit", hour12: true, timeZone: "UTC",
});

function dateLabel({ dates }: Event): string {
  if (dates.dateTbd || dates.dateTba || !dates.start.localDate) return "DATE TBA";
  // Local calendar fields are displayed as supplied, independent of server TZ.
  const date = new Date(`${dates.start.localDate}T00:00:00Z`);
  if (!Number.isFinite(date.getTime())) return "DATE TBA";
  const day = dayFormatter.format(date).toUpperCase();
  if (dates.noSpecificTime) return day;
  if (dates.timeTba) return `${day} • TIME TBA`;
  if (!dates.start.localTime) return day;
  const time = new Date(`2000-01-01T${dates.start.localTime}Z`);
  return Number.isFinite(time.getTime()) ? `${day} • ${timeFormatter.format(time)}` : day;
}

export function toEventCardData(event: Event): EventCardData {
  const location = event.venue?.location;
  const parts = [location?.city, location?.stateCode || location?.state];
  const place = parts.filter(Boolean).join(", ");
  return {
    id: event.id,
    name: event.name,
    dateLabel: dateLabel(event),
    venue: event.venue?.name || "Venue TBA",
    location: place || location?.country || location?.countryCode || "Location TBA",
    category: event.classification?.subGenre?.name || event.classification?.genre?.name ||
      event.classification?.segment?.name || "Concerts",
  };
}
