import "server-only";

import type {
  Event,
  EventSearchParams,
  EventSearchResult,
} from "@/types/event";

export type EventProviderErrorCode =
  | "configuration"
  | "unauthorized"
  | "rate_limit"
  | "not_found"
  | "network"
  | "invalid_response"
  | "provider_error";

export type EventProviderError = Readonly<{
  code: EventProviderErrorCode;
  message: string;
  status: number | null;
  cause?: unknown;
}>;

export interface EventProvider {
  searchEvents(params: EventSearchParams): Promise<EventSearchResult>;
  getEventById(providerEventId: string): Promise<Event | null>;
}
