// delayUtils.ts
// to be used in tests when dynamic waiting time is enabled for locators to be shown/visible/clickable

import { Page, expect } from "@playwright/test";

/**
 * Extract delay times from delay label text.
 * @param delayText - Text containing delay information.
 * @returns Object with delays for displayed and enabled.
 */
export const extractDelays = (delayText: string | null) => {
  const delayRegex = /([\d.]+)\[s\] for displayed and ([\d.]+)/;
  const match = delayText?.match(delayRegex);

  if (match) {
    return {
      delayForDisplayed: parseFloat(match[1]),
      delayForEnabled: parseFloat(match[2]),
    };
  } else {
    throw new Error("Invalid delay text format");
  }
};

/**
 * Handle delays for displayed and enabled states.
 * @param page - Playwright page object.
 * @param delays - Object with delays for displayed and enabled.
 */
export const handleDelays = async (
  page: Page,
  delays: { delayForDisplayed: number; delayForEnabled: number }
) => {
  const { delayForDisplayed, delayForEnabled } = delays;

  // Wait for elements to be displayed
  if (!isNaN(delayForDisplayed)) {
    await page.waitForTimeout(delayForDisplayed * 1000);
    console.log(
      `Waited for ${delayForDisplayed} seconds for elements to be displayed.`
    );
  } else {
    console.error("Invalid delay value for displayed in #delayLabel");
  }

  // Assert elements are now displayed
  await expect
    .soft(page.getByRole("heading", { name: "Elements are now: DISPLAYED -" }))
    .toHaveText(/.*/);

  // Wait for elements to be enabled
  if (!isNaN(delayForEnabled)) {
    const additionalWaitTime = (delayForEnabled - delayForDisplayed) * 1000;
    if (additionalWaitTime > 0) {
      await page.waitForTimeout(additionalWaitTime);
      console.log(
        `Waited an additional ${
          additionalWaitTime / 1000
        } seconds for elements to be enabled.`
      );
    }
  } else {
    console.error("Invalid delay value for enabled in #delayLabel");
  }
};
