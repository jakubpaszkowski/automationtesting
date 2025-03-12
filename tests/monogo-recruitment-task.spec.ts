import { test, expect } from "@playwright/test";
import { SimpleElements } from "../pages/monogo.page";
import {
  addProductToCartAndGoToCheckoutEnglish,
  closeShopMenuIfVisible,
  gatherImagesCheckHowMany,
  goToProductPageEnglish,
  linkToCartNCheckout,
  linkToProductPloomXAdvanced,
  quantityMinus,
  urlEnglish,
  urlEnglishCheckout,
  verifyAllLinksOnPage,
} from "../test-data/monogo-helpers.ts";

test("Verify if it is possible to add a product to the cart.", async ({
  page,
}) => {
  const elementsPage = new SimpleElements(page);
  await page.goto(urlEnglish);
  await elementsPage.buttonCookiesAccept.click();
  await elementsPage.ageConfirmation.click();
  await elementsPage.shopDropMenu.click();
  await closeShopMenuIfVisible(page);
  await elementsPage.ploomXAdvanced.click({ force: true });
  await page.waitForURL(linkToProductPloomXAdvanced);
  await expect(elementsPage.ploomXAdvancedProduct).toBeVisible();
  await elementsPage.ploomXAdvancedProduct.click();
  await elementsPage.buttonAddToCart.click();
  await elementsPage.cartQuantity.click();
  await expect(elementsPage.cartQuantity).toHaveValue("1");
  await elementsPage.miniCartCheckoutButton.click();
  await expect(elementsPage.productDescription).toContainText(
    "A unique Heated Tobacco Xperience"
  );
  await expect(page.url()).toBe(linkToCartNCheckout);
  await expect(elementsPage.loginCheckoutButton).toBeVisible();
  await elementsPage.loginCheckoutButton.click();
});

test("Verify if it is possible to remove a product from the cart", async ({
  page,
}) => {
  const elementsPage = new SimpleElements(page);
  await addProductToCartAndGoToCheckoutEnglish(page);
  await page.goto(urlEnglishCheckout);
  await quantityMinus(page);
  await expect(elementsPage.youHaveNoItems).toBeVisible();
  await elementsPage.miniBasket.click();
  await elementsPage.emptyCartContainer.click();
  await expect(elementsPage.emptyCartContainer).toHaveText(
    "There are no products in your cart at the moment."
  );
});

test("Verify if there are any broken links or images on the product page.", async ({
  page,
}) => {
  const elementsPage = new SimpleElements(page);
  await page.goto(urlEnglish);

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

test("Verify if there are any broken links or images on the product page #2", async ({
  page,
}) => {
  const elementsPage = new SimpleElements(page);
  await goToProductPageEnglish(page);
  await verifyAllLinksOnPage(page, linkToProductPloomXAdvanced);
  await gatherImagesCheckHowMany(page, linkToProductPloomXAdvanced);
});
