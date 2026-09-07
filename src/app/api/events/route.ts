import { getEventProvider } from "@/lib/api/events";
import { parseEventSearchQuery } from "@/lib/validation/event-search";

export const dynamic = "force-dynamic";

const headers = { "Cache-Control": "no-store" };

function failure(status: number, code: string, message: string) {
  return Response.json({ error: { code, message } }, { status, headers });
}

export async function GET(request: Request) {
  try {
    const parsed = parseEventSearchQuery(new URL(request.url).searchParams);
    if (!parsed.success) {
      // Fixed messages and known schema paths only; never echo input or Zod internals.
      const fields = Object.fromEntries(parsed.error.issues.map((issue) => [
        String(issue.path[0] ?? "query"), "Invalid search parameter.",
      ]));
      return Response.json({ error: {
        code: "INVALID_SEARCH_PARAMS",
        message: "The event search parameters are invalid.",
        fields,
      } }, { status: 400, headers });
    }

    const result = await getEventProvider().searchEvents(parsed.data);
    return Response.json(result, { headers });
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error ? error.code : undefined;
    switch (code) {
      case "configuration":
      case "unauthorized":
      case "rate_limit":
      case "network":
        return failure(503, "EVENT_SERVICE_UNAVAILABLE", "Event search is temporarily unavailable.");
      case "invalid_response":
      case "provider_error":
      case "not_found":
        return failure(502, "EVENT_PROVIDER_RESPONSE_ERROR", "Event search could not be completed.");
      default:
        return failure(500, "INTERNAL_ERROR", "An unexpected error occurred.");
    }
  }
}
