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

  await expect(page).toHaveScreenshot("homepage.png", { fullPage: true });
});
