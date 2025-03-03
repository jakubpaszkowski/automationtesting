import { test, expect, chromium } from "@playwright/test";
import { SimpleElements } from "../pages/monogo-polish.page.ts";
import {
  closeShopMenuIfVisible,
  gatherImagesCheckHowMany,
  gatherImagesCheckHowManyPolish,
  linkToCartNCheckout,
  linkToCartNCheckoutPolish,
  linkToProductPloomXAdvanced,
  linkToProductPloomXAdvancedBronzePolish,
  quantityMinus,
  quantityMinusPolish,
  verifyAllLinksOnPage,
  collectAllLocators,
  checkImagesWithRelativeURLs
} from "../test-data/monogo-helpers.ts";

test("Verify if it is possible to add a product to the cart.", async ({
  page,
}) => {
  const elementsPage = new SimpleElements(page);
  await page.goto("https://www.ploom.pl/pl");

  await elementsPage.buttonCookiesAcceptPolish.click();
  await elementsPage.ageConfirmation.click();
  await elementsPage.shopDropMenu.click();
  await closeShopMenuIfVisible(page);
  await page.getByText("Sklep Sklep Zobacz wszystkie").click();
  /*
  await elementsPage.ploomXAdvanced.click({ force: true });
 */

  //   await page.locator('[data-sku="16103192"]').click();
  await elementsPage.buttonProductPloomXAdvancedBluePolish.click();
  await page.waitForURL(linkToProductPloomXAdvancedBronzePolish);
  await expect(elementsPage.headingPloomXAdvancedBlue).toBeVisible();

  //   await expect(elementsPage.buttonProductPloomXAdvancedBronzePolish).toBeVisible();
  //   await elementsPage.buttonProductPloomXAdvancedBronzePolish.click();

  await elementsPage.buttonAddToCart.click();

  await elementsPage.cartQuantity.click();
  await expect(elementsPage.cartQuantity).toHaveValue("1");
  await elementsPage.miniCartCheckoutButton.click();
  await expect(
    page.getByTestId("regular-cart-list").getByText("X to unikalne połączenie")
  ).toBeVisible();
  /* 
  await expect(elementsPage.productDescription).toContainText(
    "A unique Heated Tobacco Xperience"
  );
  */
  await expect(page.url()).toBe(linkToCartNCheckoutPolish);
  await expect(elementsPage.loginCheckoutButton).toBeVisible();
  await elementsPage.loginCheckoutButton.click();
});

test("Verify if it is possible to remove a product from the cart", async ({
  page,
}) => {
  const elementsPage = new SimpleElements(page);
  await page.goto("https://www.ploom.pl/pl");

  await elementsPage.buttonCookiesAcceptPolish.click();
  await elementsPage.ageConfirmation.click();
  await elementsPage.shopDropMenu.click();
  await closeShopMenuIfVisible(page);
  await elementsPage.shopButtonPolish.click();
  await elementsPage.buttonProductPloomXAdvancedBluePolish.click();
  await page.waitForURL(linkToProductPloomXAdvancedBronzePolish);
  await expect(elementsPage.headingPloomXAdvancedBlue).toBeVisible();

  await elementsPage.buttonAddToCart.click();

  await elementsPage.cartQuantity.click();
  await expect(elementsPage.cartQuantity).toHaveValue("1");
  await elementsPage.miniCartCheckoutButton.click();

  await page.goto("https://www.ploom.pl/pl/cart#/");
  await quantityMinusPolish(page);
  await expect(elementsPage.emptyContainerInfoTextPolish).toBeVisible();

  await elementsPage.miniBasket.click();
  await elementsPage.emptyCartContainer.click();
  await expect(elementsPage.emptyCartContainerPolish).toBeVisible;
});

test("Verify if there are any broken links or images on the product page.", async ({
  page,
}) => {
  const elementsPage = new SimpleElements(page);
  await page.goto("https://www.ploom.pl/pl");
/*
  await elementsPage.buttonCookiesAcceptPolish.click();;
  await elementsPage.ageConfirmation.click();
  await elementsPage.buttonNavigationLink.first().click();
  await closeShopMenuIfVisible(page);
  await elementsPage.ploomXAdvanced.click({ force: true });
  await page.waitForURL(linkToProductPloomXAdvanced);
  await expect(elementsPage.ploomXAdvancedProduct).toBeVisible();
  await elementsPage.ploomXAdvancedProduct.click();
*/

await elementsPage.buttonCookiesAcceptPolish.click();
await elementsPage.ageConfirmation.click();
await elementsPage.shopDropMenu.click();
await closeShopMenuIfVisible(page);
await elementsPage.shopButtonPolish.click();
await elementsPage.buttonProductPloomXAdvancedBluePolish.click();
await page.waitForURL(linkToProductPloomXAdvancedBronzePolish);
await expect(elementsPage.headingPloomXAdvancedBlue).toBeVisible();

  await verifyAllLinksOnPage(page, "https://www.ploom.pl");
/*
  await page.goto("https://www.ploom.pl/pl");
  await expect.soft(elementsPage.item800808000Polish).toBeVisible();
//   await page.locator('role=link[name="Terms of Service"]').waitFor({ state: 'visible' });
// Najpierw poczekaj na widoczność elementu
await elementsPage.forMoreInformation.waitFor({ state: 'visible' });

// Następnie sprawdź widoczność elementu za pomocą expect
await expect.soft(elementsPage.forMoreInformation).toBeVisible();  

await expect.soft(elementsPage.forMoreInformation).toBeVisible();
  await expect.soft(elementsPage.privacyPolicyPolish).toBeVisible();
  await expect.soft(elementsPage.termsOfService).toBeVisible();
  await expect.soft(elementsPage.supportPolish).toBeVisible();
  await expect.soft(elementsPage.itemsContactUsPolish).toBeVisible();
  await expect.soft(elementsPage.itemsFaqPolish).toBeVisible();
  await expect.soft(elementsPage.itemsProductHelpPolish).toBeVisible();
  await expect.soft(elementsPage.deliveryReturnsPolish).toBeVisible();
  await expect.soft(elementsPage.itemsDeliveryPolish).toBeVisible();

  await expect.soft(elementsPage.itemsList1Returns).toBeVisible();
  await expect.soft(elementsPage.itemsWhyPloomPolish).toBeVisible();

  await expect.soft(elementsPage.companyPolish).toBeVisible();
  await expect.soft(elementsPage.itemsTermsOfUsePolish).toBeVisible();

  await expect.soft(elementsPage.itemsTermsOfSalePolish).toBeVisible();
  await expect.soft(elementsPage.itemsList2Environment).toBeVisible();
  */
  await gatherImagesCheckHowMany(page, "https://m24-ploom-pl.jtides.com");
  await gatherImagesCheckHowMany(page, "www.ploom.pl");
  // 
});


import { Page } from "@playwright/test";

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

test("Sprawdzenie niepoprawnych linków na stronie", async ({ page }) => {
  await page.goto("https://www.ploom.pl/pl"); // Otwieramy stronę

  await findInvalidLinks(page); // Uruchamiamy analizę linków
});



test("Collect all locators from Ploom", async ({ page }) => {
  await page.goto("https://www.ploom.pl");
  await collectAllLocators(page);
});


test('Sprawdz wszystkie obrazy na stronie ploompl', async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
  
    // Załaduj stronę
    await page.goto('https://www.ploom.pl/pl');
  
    // Użyj funkcji do sprawdzenia obrazków
    const baseUrl = 'https://www.ploom.pl'; // Ustaw podstawowy URL
    await checkImagesWithRelativeURLs(page, baseUrl); // Sprawdź obrazy
  
    await browser.close();
  });


  
  test('Sprawdz obrazy na stronie ploom.pl', async ({ page }) => {
    // Otwórz stronę, którą chcesz przetestować
    await page.goto('https://www.ploom.pl/pl');
  
    // Wywołanie funkcji, przekazując stronę i baseUrl
    const baseUrl = 'https://www.ploom.pl';  // Upewnij się, że jest to prawidłowy URL
    await gatherImagesCheckHowManyPolish(page, baseUrl);
  });
  