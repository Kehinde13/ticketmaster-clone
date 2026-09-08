import { getEventProvider } from "@/lib/api/events";
import { parseEventId } from "@/types/event";

export const dynamic = "force-dynamic";

const headers = { "Cache-Control": "no-store" };

function failure(status: number, code: string, message: string) {
  return Response.json({ error: { code, message } }, { status, headers });
}

function notFound() {
  return failure(404, "EVENT_NOT_FOUND", "The event was not found.");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const parsed = parseEventId(id);
    if (!parsed) {
      return failure(400, "INVALID_EVENT_ID", "The event ID is invalid.");
    }

    const provider = getEventProvider(parsed.provider);
    const event = await provider.getEventById(parsed.providerEventId);
    if (event === null) return notFound();

    return Response.json({ event }, { headers });
  } catch (error) {
    const code =
      error && typeof error === "object" && "code" in error
        ? error.code
        : undefined;
    switch (code) {
      case "not_found":
        return notFound();
      case "configuration":
      case "unauthorized":
      case "rate_limit":
      case "network":
        return failure(
          503, "EVENT_SERVICE_UNAVAILABLE", "Event details are temporarily unavailable.",
        );
      case "invalid_response":
      case "provider_error":
        return failure(
          502, "EVENT_PROVIDER_RESPONSE_ERROR", "Event details could not be retrieved.",
        );
      default:
        return failure(500, "INTERNAL_ERROR", "An unexpected error occurred.");
    }
  }
}
