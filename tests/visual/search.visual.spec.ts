import { expect, test } from "@playwright/test";

const event = (id: string, name: string, city: string) => ({
  id: `ticketmaster:${id}`,
  provider: "ticketmaster",
  providerEventId: id,
  name,
  url: null,
  images: [],
  dates: {
    start: { localDate: "2026-10-09", localTime: "20:00:00", utcDateTime: null },
    end: null,
    timezone: "America/Chicago",
    dateTbd: false,
    dateTba: false,
    timeTba: false,
    noSpecificTime: false,
    endApproximate: false,
    spansMultipleDays: false,
  },
  venue: {
    id: `venue-${id}`,
    name: "Fixture Arena",
    location: {
      addressLines: [], city, state: null, stateCode: "IL", country: "United States",
      countryCode: "US", postalCode: null, latitude: null, longitude: null,
    },
    timezone: "America/Chicago",
  },
  classification: null,
  priceRange: null,
  status: "onsale",
});

test("keyword search renders deterministic normalized events", async ({ page }) => {
  await page.route("**/api/events?*", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        events: [
          event("fixture-1", "Coldplay: Music of the Spheres", "Chicago"),
          event("fixture-2", "Coldplay Tribute Night", "Evanston"),
        ],
        pagination: { page: 0, size: 20, totalItems: 2, totalPages: 1, hasNextPage: false },
      }),
    });
  });

  await page.goto("/");
  await page.getByRole("searchbox", { name: "Search" }).fill("Coldplay");
  await page.getByRole("searchbox", { name: "Search" }).press("Enter");

  await expect(page.getByRole("heading", { name: "Search Results for “Coldplay”" })).toBeVisible();
  await expect(page.getByRole("article", { name: "Coldplay: Music of the Spheres" })).toBeVisible();
  await expect(page.getByRole("article", { name: "Coldplay Tribute Night" })).toBeVisible();
  const viewport = page.viewportSize();
  if (!viewport) throw new Error("Search test requires a viewport.");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width);
});
