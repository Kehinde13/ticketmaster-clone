import "server-only";

import type { EventProvider } from "./provider";
import { createTicketmasterEventProvider } from "./ticketmaster/provider";

export function getEventProvider(): EventProvider {
  return createTicketmasterEventProvider();
}
