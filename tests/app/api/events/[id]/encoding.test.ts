// @vitest-environment node
import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import { proxy } from "@/proxy";

describe("event details transport encoding", () => {
  it.each(["ticketmaster%ZZevent", "ticketmaster%3A%EF", "ticketmaster%3A%", "ticketmaster%3A%C0%AF"])(
    "returns safe 400 for malformed transport %s", async (path) => {
      const response = proxy(new NextRequest(`http://localhost/api/events/${path}`));
      expect(response.status).toBe(400);
      expect(response.headers.get("cache-control")).toBe("no-store");
      expect(await response.json()).toEqual({ error: {
        code: "INVALID_EVENT_ID", message: "The event ID is invalid.",
      } });
    },
  );

  it.each(["ticketmaster%3Aevent", "ticketmaster:event", "ticketmaster%3Aevent%252Fpart", "ticketmaster%3Aevent%25ZZ"])(
    "passes valid encoding through unchanged: %s", (path) => {
      const request = new NextRequest(`http://localhost/api/events/${path}`);
      const original = request.nextUrl.pathname;
      expect(proxy(request).headers.get("x-middleware-next")).toBe("1");
      expect(request.nextUrl.pathname).toBe(original);
    },
  );
});
