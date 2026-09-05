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

  await expect(page).toHaveScreenshot("homepage.png", { fullPage: true });
});
