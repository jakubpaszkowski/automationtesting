// monogo-helpers.ts

import { Page } from "@playwright/test";
// export const productDescriptionText = "/^A unique Heated Tobacco Xperience.*$/";
export const productDescriptionText = /^A unique Heated Tobacco Xperience.*$/;
export const linkToCartNCheckout = "https://www.ploom.co.uk/en/cart-n-checkout#/";
export const linkToProductPloomXAdvanced = "https://www.ploom.co.uk/en/shop/products/devices/ploom-x-advanced";
export async function closeShopMenuIfVisible(page: Page): Promise<void> {
  if (
    await page
      .locator('li:has-text("Shop")')
      .locator('[data-testid="CloseShopMenu"]')
      .isVisible()
  ) {
    await page
      .locator('li:has-text("Shop")')
      .locator('[data-testid="CloseShopMenu"]')
      .click();
  } else {
    console.log("'CloseShopMenu' element has not been found. Test goes on.");
  }
}
export async function quantityMinus(page: Page): Promise<void> {
if (
    await page
      .getByTestId("regular-cart-list")
      .getByTestId("quantityMinus")
      .isVisible()
  ) {
    await page
      .getByTestId("regular-cart-list")
      .getByTestId("quantityMinus")
      .click();
  } else {
    throw new Error(
      "The quantity minus button is not available, test aborted."
    );
  }
}