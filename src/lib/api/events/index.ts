import "server-only";

import type { EventProviderName } from "@/types/event";
import type { EventProvider } from "./provider";
import { createTicketmasterEventProvider } from "./ticketmaster/provider";

export function getEventProvider(
  provider: EventProviderName = "ticketmaster",
): EventProvider {
  switch (provider) {
    case "ticketmaster":
      return createTicketmasterEventProvider();
    default:
      throw new Error("Unsupported event provider.");
  }
}
