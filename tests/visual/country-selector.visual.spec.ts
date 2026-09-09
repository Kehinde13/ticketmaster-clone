import { expect, test } from "@playwright/test";

const emptyResult = {
  events: [],
  pagination: { page: 0, size: 20, totalItems: 0, totalPages: 0, hasNextPage: false },
};

test("country selection persists and drives keyword search", async ({ page }) => {
  const requestCountries: string[] = [];
  await page.route("**/api/events?*", async (route) => {
    requestCountries.push(new URL(route.request().url()).searchParams.get("countryCode") ?? "");
    await route.fulfill({ contentType: "application/json", body: JSON.stringify(emptyResult) });
  });

  await page.goto("/");
  const current = () => page.locator('button:visible[aria-label^="Change country, currently"]');
  await expect(current()).toHaveAttribute("aria-label", "Change country, currently United States");
  await current().click();
  await expect(page.getByRole("dialog", { name: "Select your country" })).toBeVisible();
  const gbRefresh = page.waitForRequest((request) => {
    const url = new URL(request.url());
    return url.pathname === "/" && (url.searchParams.has("_rsc") || request.headers().rsc === "1");
  });
  await page.getByRole("button", { name: /United Kingdom/ }).click();
  await gbRefresh;
  await expect(current()).toHaveAttribute("aria-label", "Change country, currently United Kingdom");

  await page.reload();
  await expect(current()).toHaveAttribute("aria-label", "Change country, currently United Kingdom");
  await page.getByRole("searchbox", { name: "Search" }).fill("Coldplay");
  await page.getByRole("searchbox", { name: "Search" }).press("Enter");
  await expect.poll(() => requestCountries).toContain("GB");

  await current().click();
  const usRefresh = page.waitForRequest((request) => {
    const url = new URL(request.url());
    return url.pathname === "/" && (url.searchParams.has("_rsc") || request.headers().rsc === "1");
  });
  await page.getByRole("button", { name: /United States/ }).click();
  await usRefresh;
  await expect.poll(() => requestCountries).toContain("US");
  await expect(page.getByRole("searchbox", { name: "Search" })).toHaveValue("Coldplay");
  const viewport = page.viewportSize();
  if (!viewport) throw new Error("Country test requires a viewport.");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width);
});
