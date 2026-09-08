import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EventCard } from "@/components/events/event-card";
import type { EventCardData } from "@/types/event";

const event: EventCardData = {
  id: "midnight-echo-tour",
  name: "Midnight Echo Tour",
  category: "Alternative Rock",
  dateLabel: "FRI, OCT 9 • 8:00 PM",
  venue: "Harbor Arena",
  location: "Chicago, IL",
  image: null,
};

describe("EventCard", () => {
  it("renders the event information with accessible card semantics", () => {
    render(
      <EventCard
        event={event}
        artworkClassName="from-blue-800 to-violet-500"
      />,
    );

    expect(
      screen.getByRole("article", { name: "Midnight Echo Tour" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Alternative Rock")).toBeInTheDocument();
    expect(screen.getByText("FRI, OCT 9 • 8:00 PM")).toBeInTheDocument();
    expect(screen.getByText(/Harbor Arena/)).toHaveTextContent(
      "Harbor Arena • Chicago, IL",
    );
  });

  it("renders a selected remote image lazily with useful alternative text", () => {
    render(
      <EventCard
        event={{
          ...event,
          image: {
            src: "https://s1.ticketm.net/dam/event.jpg",
            alt: "Midnight Echo Tour",
            width: 640,
            height: 427,
          },
        }}
        artworkClassName="from-blue-800 to-violet-500"
      />,
    );

    const artwork = screen.getByRole("img", { name: "Midnight Echo Tour" });
    expect(artwork).toHaveAttribute("loading", "lazy");
    expect(screen.queryByTestId("event-card-fallback-artwork")).not.toBeInTheDocument();
  });

  it("uses original artwork when no image exists or the remote image fails", () => {
    const { rerender } = render(
      <EventCard event={event} artworkClassName="from-blue-800 to-violet-500" />,
    );
    expect(screen.getByTestId("event-card-fallback-artwork")).toBeInTheDocument();

    rerender(
      <EventCard
        event={{
          ...event,
          image: {
            src: "https://s1.ticketm.net/dam/broken.jpg",
            alt: "Midnight Echo Tour",
            width: 640,
            height: 427,
          },
        }}
        artworkClassName="from-blue-800 to-violet-500"
      />,
    );
    fireEvent.error(screen.getByRole("img", { name: "Midnight Echo Tour" }));
    expect(screen.getByTestId("event-card-fallback-artwork")).toBeInTheDocument();
  });
});
