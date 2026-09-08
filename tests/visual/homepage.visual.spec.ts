import { expect, test } from "@playwright/test";

test("homepage responsive shell matches its visual baseline", async ({
  page,
}) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await expect(
    page.getByRole("heading", { name: "Highlights" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Popular Near You" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Entertainment Guides" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Discover More", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Popular Cities" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Featured", exact: true }),
  ).toBeVisible();

  const featured = page
    .getByRole("heading", { name: "Featured", exact: true })
    .locator("..")
    .locator("..");
  for (const label of [
    "Hotels",
    "Ticket Deals",
    "VIP Packages",
    "Sell on Ticketmaster",
  ]) {
    await expect(featured.getByRole("heading", { name: label })).toBeVisible();
  }

  const concerts = page.getByTestId("popular-concerts-results");
  await expect(concerts).toBeVisible();
  const track = await concerts.boundingBox();
  expect(track).not.toBeNull();
  if (!track) throw new Error("Concerts result region has no layout box.");
  expect(track.width).toBeGreaterThan(250);
  expect(track.height).toBeGreaterThan(200);
  expect(track.height).toBeLessThan(400);
  const viewport = page.viewportSize();
  if (!viewport) throw new Error("Visual project requires a viewport.");
  expect(await page.evaluate(() => document.documentElement.scrollWidth))
    .toBeLessThanOrEqual(viewport.width);
  await expect(page).toHaveScreenshot("homepage.png", {
    fullPage: true,
    mask: [concerts],
  });
});
