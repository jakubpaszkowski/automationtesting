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

import { expect } from "@playwright/test";

export async function verifyImageSrcVisibilityStatus(page: Page): Promise<void> {
  // Gather all images
  const images = page.locator("img");

  // Check how many images
  const imageCount = await images.count();

  for (let i = 0; i < imageCount; i++) {
    const image = images.nth(i);

    // Does img have src attribute?
    const src = await image.getAttribute("src");
    expect(src).toBeTruthy(); // Is src null?

    // Is it shown on page?
    const isVisible = await image.isVisible();
    expect(isVisible).toBe(true); // Has to be visible, otherwise bug :D

    // If the URL is relative, we add the full domain
    let fullSrc = src;
    if (fullSrc && !fullSrc.startsWith("http")) {
      fullSrc = "https://m24-ploom-uk.jtides.com" + fullSrc;
    }

    // To check HTTP status, use fetch()
    if (fullSrc) {
      const response = await page.request.get(fullSrc); // Calling HTTP request for the image
      expect(response.status()).toBe(200); // Should be 200 status
    }
  }
}



// helpers.ts
// import { expect, Locator } from '@playwright/test';

// export async function verifyImageSrcVisibilityStatus(
//   page: Page,
//   domain: string,
//   imageLocator: Locator
// ): Promise<void> {
//   const images = imageLocator;
//   const imageCount = await images.count();

//   for (let i = 0; i < imageCount; i++) {
//     const image = images.nth(i);

//     const src = await image.getAttribute('src');
//     expect(src).toBeTruthy();

//     await expect(image).toBeVisible();

//     let fullSrc = src;
//     if (fullSrc && !fullSrc.startsWith('http')) {
//       fullSrc = domain + fullSrc;
//     }

//     if (fullSrc) {
//       try {
//         const response = await page.request.get(fullSrc);
//         expect(response.status()).toBe(200);
//       } catch (error) {
//         console.error(`Błąd podczas sprawdzania statusu HTTP obrazka: ${fullSrc}`, error);
//         expect(true).toBe(false); // test fail when error
//       }
//     }
//   }
// }

// export async function verifyImageSrcVisibilityStatus(page: Page): Promise<void> {
//   // gather all images
//   const images = await page.locator("img");

//   // check how many images
//   const imageCount = await images.count();
//   for (let i = 0; i < imageCount; i++) {
//     const image = images.nth(i);

//     // does img has src atribute?
//     const src = await image.getAttribute("src");
//     expect(src).toBeTruthy(); // is src null?

//     // is shown on page?
//     const isVisible = await image.isVisible();
//     expect(isVisible).toBe(true); // has to be visible otherwise bug :d
//     await expect(elementLocator).toBeVisible();
//     // If the URL is relative, we add the full domain
//     let fullSrc = src;
//     if (fullSrc && !fullSrc.startsWith("http")) {
//       fullSrc = "https://m24-ploom-uk.jtides.com" + fullSrc;
//     }

//     // to chceck http status i use fetch()
//     if (fullSrc) {
//       const response = await page.request.get(fullSrc); // calling http about img
//       expect(response.status()).toBe(200); // should be 200 status
//     }
//   }
// }