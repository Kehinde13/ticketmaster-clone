import { describe, expect, it } from "vitest";

import { selectEventImage } from "@/lib/events/select-event-image";
import type { EventImage } from "@/types/event";

function image(
  url: string,
  overrides: Partial<EventImage> = {},
): EventImage {
  return {
    url,
    width: 640,
    height: 427,
    ratio: "3:2",
    fallback: false,
    attribution: null,
    ...overrides,
  };
}

describe("selectEventImage", () => {
  it("returns null when no usable image exists", () => {
    expect(selectEventImage([])).toBeNull();
    expect(selectEventImage([
      image("not a url"),
      image("http://s1.ticketm.net/dam/insecure.jpg"),
      image("data:image/png;base64,abc"),
      image("https://s1.ticketm.net/dam/zero.jpg", { width: 0 }),
    ])).toBeNull();
  });

  it("returns one valid HTTPS image", () => {
    const candidate = image("https://s1.ticketm.net/dam/one.jpg");
    expect(selectEventImage([candidate])).toBe(candidate);
  });

  it("prefers the closest aspect ratio before raw size", () => {
    const threeByTwo = image("https://s1.ticketm.net/dam/three-two.jpg", {
      width: 640, height: 427, ratio: "3:2",
    });
    const hugeWide = image("https://s1.ticketm.net/dam/wide.jpg", {
      width: 2048, height: 1152, ratio: "16:9",
    });
    expect(selectEventImage([hugeWide, threeByTwo])).toBe(threeByTwo);
  });

  it("prefers sufficient and larger resolution among equal ratios", () => {
    const small = image("https://s1.ticketm.net/dam/small.jpg", { width: 305, height: 203 });
    const large = image("https://s1.ticketm.net/dam/large.jpg", { width: 1024, height: 683 });
    expect(selectEventImage([small, large])).toBe(large);
  });

  it("prefers a non-fallback image among otherwise equivalent candidates", () => {
    const providerFallback = image("https://s1.ticketm.net/dam/fallback.jpg", { fallback: true });
    const original = image("https://s1.ticketm.net/dam/original.jpg");
    expect(selectEventImage([providerFallback, original])).toBe(original);
  });

  it("selects the best valid provider fallback when all candidates are fallbacks", () => {
    const small = image("https://s1.ticketm.net/dam/fallback-small.jpg", {
      width: 305, height: 203, fallback: true,
    });
    const large = image("https://s1.ticketm.net/dam/fallback-large.jpg", {
      width: 1024, height: 683, fallback: true,
    });
    expect(selectEventImage([small, large])).toBe(large);
  });

  it("uses normalized ratio metadata when dimensions are missing", () => {
    const unknownSize = image("https://s1.ticketm.net/dam/no-size.jpg", {
      width: null, height: null, ratio: "3:2",
    });
    const wide = image("https://s1.ticketm.net/dam/wide.jpg", {
      width: 1136, height: 639, ratio: "16:9",
    });
    expect(selectEventImage([wide, unknownSize])).toBe(unknownSize);
  });

  it("uses URL ordering as a stable final tie-breaker", () => {
    const a = image("https://s1.ticketm.net/dam/a.jpg");
    const b = image("https://s1.ticketm.net/dam/b.jpg");
    expect(selectEventImage([b, a])).toBe(a);
    expect(selectEventImage([a, b])).toBe(a);
  });

  it("chooses the expected candidate from common mixed provider variants", () => {
    const candidates = [
      image("https://s1.ticketm.net/dam/small-wide.jpg", { width: 100, height: 56, ratio: "16:9" }),
      image("https://s1.ticketm.net/dam/large-wide.jpg", { width: 1136, height: 639, ratio: "16:9" }),
      image("https://s1.ticketm.net/dam/medium-three-two.jpg", { width: 305, height: 203 }),
      image("https://s1.ticketm.net/dam/large-three-two.jpg", { width: 1024, height: 683 }),
      image("https://s1.ticketm.net/dam/fallback-three-two.jpg", { width: 1024, height: 683, fallback: true }),
    ];
    expect(selectEventImage(candidates)?.url).toBe(
      "https://s1.ticketm.net/dam/large-three-two.jpg",
    );
  });
});
