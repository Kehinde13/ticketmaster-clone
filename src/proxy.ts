import { NextResponse, type NextRequest } from "next/server";

// Next.js can fail before the route handler when decoding malformed path escapes.
export function proxy(request: NextRequest) {
  try {
    // Validate transport encoding only; do not rewrite the path or decode params.
    decodeURIComponent(request.nextUrl.pathname);
  } catch {
    return NextResponse.json(
      { error: { code: "INVALID_EVENT_ID", message: "The event ID is invalid." } },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }
  return NextResponse.next();
}

export const config = { matcher: "/api/events/:id" };
