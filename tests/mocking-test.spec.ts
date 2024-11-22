import { expect, test } from "@playwright/test";

const yearlyMock = {
  "2020": 0,
  "2021": 0,
  "2022": 0,
  "2023": 0,
  "2024": 0,
};

test("visual regression testing region mock", async ({ page }) => {
  const apiPath = "**/api/stats/publications/articles/";
  await page.route(apiPath, async (route) => {
    const response = await route.fetch();
    const json = await response.json();
    json.yearly = yearlyMock;
    await route.fulfill({ response, json });
  });

  await page.goto("http://localhost:3000/stats/publicationstats.html");
  const chart = page
    .locator('iframe[title="Stats iframe"]')
    .contentFrame()
    .locator("svg > rect");
  await expect(chart).toHaveScreenshot();
});
