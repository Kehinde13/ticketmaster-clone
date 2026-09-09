import { beforeEach, describe, expect, it, vi } from "vitest";

import { getServerCountry } from "@/lib/countries.server";

const { cookies } = vi.hoisted(() => ({ cookies: vi.fn() }));

vi.mock("next/headers", () => ({ cookies }));

describe("getServerCountry", () => {
  beforeEach(() => cookies.mockReset());

  it.each([
    ["US", "US"],
    ["GB", "GB"],
    ["NZ", "NZ"],
    ["ZZ", "US"],
    [undefined, "US"],
  ])("normalizes the persisted %s country to %s", async (persisted, expected) => {
    cookies.mockResolvedValue({
      get: vi.fn().mockReturnValue(persisted ? { value: persisted } : undefined),
    });

    await expect(getServerCountry()).resolves.toMatchObject({ code: expected });
  });
});
