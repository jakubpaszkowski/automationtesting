// monogo-helpers.ts

import { Page } from "@playwright/test";
// export const productDescriptionText = "/^A unique Heated Tobacco Xperience.*$/";
export const productDescriptionText = /^A unique Heated Tobacco Xperience.*$/;
export const linkToCartNCheckout = "https://www.ploom.co.uk/en/cart-n-checkout#/";
export const linkToCartNCheckoutPolish = "https://www.ploom.pl/pl/cart#/";
export const linkToProductPloomXAdvanced = "https://www.ploom.co.uk/en/shop/products/devices/ploom-x-advanced";
export const linkToProductPloomXAdvancedBronzePolish = "https://www.ploom.pl/pl/sklep/produkty/urzadzenie/ploom-x-advanced-niebieski";
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
};

export async function quantityMinus(page: Page): Promise<void> 
{
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
};
/*
export async function quantityMinusPolish(page: Page): Promise<void> 
{
if (
    await page
      .getByTestId('regular-cart-list').getByTestId('quantityMinus')
      .isVisible()
  ) {
    await page
      .getByTestId('regular-cart-list').getByTestId('quantityMinus')
      .click()
  } else {
    throw new Error(
      "The quantity minus button is not available, test aborted."
    );
  }
};
*/

export async function quantityMinusPolish(page: Page): Promise<void> {
  const button = page.getByTestId('regular-cart-list').getByTestId('quantityMinus');

  await button.waitFor({ state: 'visible', timeout: 5000 });

  await button.click();
}


import { expect } from "@playwright/test";

export async function verifyAllLinksOnPage(page: Page, baseUrl: string): Promise<void> {
  // Gather all links
  const links = page.locator("a");
  const linkCount = await links.count();

  for (let i = 0; i < linkCount; i++) {
    const link = links.nth(i);

    // Does it have an 'href' attribute?
    const href = await link.getAttribute("href");
    expect(href).toBeTruthy(); // Ensure href is not null

    let fullHref = href;
    if (fullHref && !fullHref.startsWith("http")) {
      fullHref = baseUrl + fullHref; // Add base URL if the link is relative
    }

    try {
      const url = new URL(fullHref); // Validate if URL is correct
      if (url.protocol === "http:" || url.protocol === "https:") {
        // Make an HTTP request to the link
        const response = await page.context().request.get(url.toString());
        const status = response.status();

        // Log HTTP status
        if (status === 200) {
          console.log(`✅ Link: ${fullHref} - OK (200)`);
        } else if (status === 404) {
          console.log(`❌ Link: ${fullHref} - Not Found (404)`);
        } else if (status === 500) {
          console.log(`⚠️ Link: ${fullHref} - Server Error (500)`);
        } else {
          console.log(`🔍 Link: ${fullHref} - Unexpected Status: ${status}`);
        }

        // Assert the link should return 200
        expect(status).toBe(200);
      } else {
        console.log(`⚠️ Link: ${fullHref} has incorrect protocol: ${url.protocol}`);
      }
    } catch (error) {
      console.log(`❌ Link: ${fullHref} has an invalid URL`);
    }
  }
};

export async function gatherImagesCheckHowMany(page: Page, baseUrl: string): Promise<void> {
  // gather all images
  const images = await page.locator("img");

  // check how many images
  const imageCount = await images.count();

  for (let i = 0; i < imageCount; i++) {
    const image = images.nth(i);

    // does img have src attribute?
    const src = await image.getAttribute("src");
    expect(src).toBeTruthy(); // is src null?

    // Check if the image is visible, but don't throw an error if it's not
    const isVisible = await image.isVisible();
    if (!isVisible) {
      console.log(`⚠️ Obrazek ${src} nie jest widoczny. Zostanie pominięty.`);
      continue; // Skip the current iteration if the image is not visible
    }

    // If the URL is relative, we add the full domain
    let fullSrc = src;
    if (fullSrc && !fullSrc.startsWith("http")) {
      fullSrc = baseUrl + fullSrc; // Add the base URL if the link is relative
    }

    // Check HTTP status using fetch()
    if (fullSrc) {
      try {
        const response = await page.request.get(fullSrc); // Request about img
        expect(response.status()).toBe(200); // Should be 200 status
      } catch (error) {
        console.log(`❌ Błąd z żądaniem dla obrazu: ${fullSrc}`);
      }
    }
  }
};


export async function findInvalidLinks(page: Page): Promise<void> {
  const links = page.locator("a");
  const linkCount = await links.count();

  for (let i = 0; i < linkCount; i++) {
    const link = links.nth(i);
    const href = await link.getAttribute("href");

    if (href && !href.startsWith("http")) {
      console.log(`⚠️ Możliwy problematyczny link: ${href}`);
    } else if (href?.includes("tel:")) {
      console.log(`📞 Link zawiera numer telefonu: ${href}`);
    }
  }
}




export async function collectAllLocators(page: Page): Promise<void> {
  // Pobierz wszystkie elementy na stronie
  const elements = await page.locator("*").all();

  for (const element of elements) {
    const tagName = await element.evaluate(el => el.tagName.toLowerCase());
    const id = await element.getAttribute("id");
    const classes = await element.getAttribute("class");
    const name = await element.getAttribute("name");
    const dataAttributes = await element.evaluate(el =>
      Array.from(el.attributes)
        .filter(attr => attr.name.startsWith("data-"))
        .map(attr => `${attr.name}="${attr.value}"`)
    );

    // Budowanie lokatorów
    const locators: string[] = [];
    if (id) locators.push(`#${id}`); // CSS ID
    if (classes) locators.push(...classes.split(" ").map(cls => `.${cls}`)); // CSS Class
    if (name) locators.push(`[name="${name}"]`); // Name attribute
    if (dataAttributes.length) locators.push(...dataAttributes.map(attr => `[${attr}]`)); // Data attributes

    // XPath dla każdego elementu
    const xpath = await element.evaluate(el => {
      function getXPath(el: Element): string {
        if (!el.parentElement) return `/${el.tagName.toLowerCase()}`;
        const siblings = Array.from(el.parentElement.children).filter(e => e.tagName === el.tagName);
        const index = siblings.length > 1 ? `[${siblings.indexOf(el) + 1}]` : "";
        return getXPath(el.parentElement) + `/${el.tagName.toLowerCase()}${index}`;
      }
      return getXPath(el);
    });

    // Wypisz znalezione lokatory
    console.log(`📌 Element: <${tagName}>`);
    console.log(`  - CSS: ${locators.join(", ") || "Brak"}`);
    console.log(`  - XPath: ${xpath}`);
  }
}




// functions/checkImagesWithRelativeURLs.ts


export async function checkImagesWithRelativeURLs(page: Page, baseUrl: string): Promise<void> {
  const images = await page.locator("img");
  const imageCount = await images.count();

  for (let i = 0; i < imageCount; i++) {
    const image = images.nth(i);
    const src = await image.getAttribute("src");
    expect(src).toBeTruthy(); // should have src

    let fullSrc = src;
    if (fullSrc && !fullSrc.startsWith("http")) {
      fullSrc = baseUrl + fullSrc;
    }

    if (fullSrc) {
      const response = await page.request.get(fullSrc); // Request to check if image is valid
      expect(response.status()).toBe(200); // Image should return status 200
    }
  }
}


export async function gatherImagesCheckHowManyPolish(page: Page, baseUrl: string): Promise<void> {
  // gather all images
  const images = await page.locator("img");

  // check how many images
  const imageCount = await images.count();

  for (let i = 0; i < imageCount; i++) {
    const image = images.nth(i);

    // does img have src attribute?
    const src = await image.getAttribute("src");
    expect(src).toBeTruthy(); // is src null?

    // is shown on page?
    const isVisible = await image.isVisible();
    expect(isVisible).toBe(true); // has to be visible otherwise bug :d

    // If the URL is relative, we add the full domain
    let fullSrc = src;
    if (fullSrc && !fullSrc.startsWith("http")) {
      fullSrc = baseUrl + fullSrc;
    }

    // Extract domain from the image URL
    if (fullSrc) {
      const url = new URL(fullSrc);
      console.log(`🌐 Domeną obrazu jest: ${url.hostname}`);
      
      // Check the image status
      const response = await page.request.get(fullSrc); // calling HTTP about img
      expect(response.status()).toBe(200); // should be 200 status
    }
  }
};

