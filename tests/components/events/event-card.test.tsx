import { render, screen } from "@testing-library/react";
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
});
