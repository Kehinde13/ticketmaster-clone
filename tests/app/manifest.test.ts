import { describe, expect, it } from "vitest";

import manifest from "@/app/manifest";

describe("web app manifest", () => {
  it("exposes the required installation metadata and local icons", () => {
    const value = manifest();

    expect(value).toMatchObject({
      id: "/",
      name: "Ticketmaster",
      short_name: "Ticketmaster",
      start_url: "/",
      scope: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#026cdf",
    });
    expect(value.icons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ src: "/icons/app-192.png", sizes: "192x192" }),
        expect.objectContaining({ src: "/icons/app-512.png", sizes: "512x512" }),
        expect.objectContaining({
          src: "/icons/app-maskable-512.png",
          sizes: "512x512",
          purpose: "maskable",
        }),
      ]),
    );
    expect(value.icons?.every((icon) => icon.src.startsWith("/"))).toBe(true);
  });
});
