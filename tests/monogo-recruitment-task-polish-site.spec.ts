import { test, expect } from "@playwright/test";
import { SimpleElements } from "../pages/monogo-polish.page.ts";
import {
  closeShopMenuIfVisible,
  gatherImagesCheckHowMany,
  linkToCartNCheckout,
  linkToCartNCheckoutPolish,
  linkToProductPloomXAdvanced,
  linkToProductPloomXAdvancedBronzePolish,
  quantityMinus,
  quantityMinusPolish,
  verifyAllLinksOnPage,
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
  await page.goto("https://www.ploom.co.uk/en");

  await elementsPage.buttonCookiesAccept.click();
  await elementsPage.buttonAgeConfirmation.first().click();
  await elementsPage.buttonNavigationLink.first().click();
  await closeShopMenuIfVisible(page);
  await elementsPage.ploomXAdvanced.click({ force: true });
  await page.waitForURL(linkToProductPloomXAdvanced);
  await expect(elementsPage.ploomXAdvancedProduct).toBeVisible();
  await elementsPage.ploomXAdvancedProduct.click();
  await verifyAllLinksOnPage(page, "https://www.ploom.co.uk");
  await expect(elementsPage.item0800).toBeEnabled();
  await expect.soft(elementsPage.forMoreInformation).toBeEnabled();
  await expect.soft(elementsPage.privacyPolicy).toBeEnabled();
  await expect.soft(elementsPage.termsOfService).toBeEnabled();
  await expect.soft(elementsPage.support).toBeEnabled();
  await expect.soft(elementsPage.itemsList0).toBeEnabled();
  await expect.soft(elementsPage.itemsList1).toBeEnabled();
  await expect.soft(elementsPage.itemsList2).toBeEnabled();
  await expect.soft(elementsPage.deliveryReturns).toBeEnabled();
  await expect.soft(elementsPage.itemsList0Delivery).toBeEnabled();
  await expect.soft(elementsPage.itemsList1Returns).toBeEnabled();
  await expect.soft(elementsPage.itemsList2Ploom).toBeEnabled();
  await expect.soft(elementsPage.company).toBeEnabled();
  await expect.soft(elementsPage.itemsList0Terms).toBeEnabled();
  await expect.soft(elementsPage.itemsList1Terms).toBeEnabled();
  await expect.soft(elementsPage.itemsList2Environment).toBeEnabled();
  await gatherImagesCheckHowMany(page, "https://m24-ploom-uk.jtides.com");
});
