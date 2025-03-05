import { test, expect } from "@playwright/test";
import { SimpleElements } from "../pages/monogo.page";
import {
  addProductToCartAndGoToCheckoutEnglish,
  closeShopMenuIfVisible,
  gatherImagesCheckHowMany,
  linkToCartNCheckout,
  linkToProductPloomXAdvanced,
  quantityMinus,
  urlEnglish,
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

test("dont use - Verify if it is possible to remove a product from the cart..", async ({
  page,
}) => {
  const elementsPage = new SimpleElements(page);
  await page.goto("https://www.ploom.co.uk/en");
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
});

test("Verify if it is possible to remove a product from the cart", async ({
  page,
}) => {
  const elementsPage = new SimpleElements(page);
  await addProductToCartAndGoToCheckoutEnglish(page);
  // await addProductToCartAndGoToCheckoutEnglish(page);
  /*
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
  await elementsPage.cartQuantity.press("Enter");
  await elementsPage.miniCartCheckoutButton.click();
  */


  await page.goto("https://www.ploom.co.uk/en/cart-n-checkout#/");
  await quantityMinus(page);
  await expect(elementsPage.youHaveNoItems).toBeVisible();
  await elementsPage.miniBasket.click();
  await elementsPage.emptyCartContainer.click();
  await expect(elementsPage.emptyCartContainer).toHaveText(
    "There are no products in your cart at the moment."
  );
});

test(" dont use - Verify if it is possible to remove a product from the cart.", async ({
  page,
}) => {
  const elementsPage = new SimpleElements(page);
  //  await page.goto("https://www.ploom.co.uk/en");
  //  await elementsPage.buttonCookiesAccept.click();
  //  await elementsPage.buttonAgeConfirmation.first().click();
  //  await elementsPage.buttonNavigationLink.first().click();
  //  if (
  //    await page
  //      .locator('li:has-text("Shop")')
  //      .locator('[data-testid="CloseShopMenu"]')
  //      .isVisible()
  //  ) {
  //    await page
  //      .locator('li:has-text("Shop")')
  //      .locator('[data-testid="CloseShopMenu"]')
  //      .click();
  //  } else {
  //    console.log("'CloseShopMenu' element has not been found. Test goes on.");
  //  }
  //  await elementsPage.buttonProductPloomXAdvanced.click();
  //  await page
  //    .getByRole("heading", { name: "Ploom X Advanced Rose Shimmer" })
  //    .click();
  if (await elementsPage.buttonAddProduct.isVisible()) {
    await elementsPage.buttonAddProduct.click();
    await elementsPage.cartQuantity.click();
    await expect(elementsPage.cartQuantity).toHaveValue("1");
    await elementsPage.miniCartCheckoutButton.click();

    await page.goto("https://www.ploom.co.uk/en");
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

    // if (
    //   await page
    //     .getByTestId("regular-cart-list")
    //     .getByTestId("quantityMinus")
    //     .isVisible()
    // ) {
    //   await page
    //     .getByTestId("regular-cart-list")
    //     .getByTestId("quantityMinus")
    //     .click();
    // } else {
    //   throw new Error(
    //     "The quantity minus button is not available, test aborted."
    //   );
    // }
    await quantityMinus(page);
    // 1st assertion
    await expect(elementsPage.youHaveNoItems).toBeVisible();
    // await expect(page.getByText("You have no items in your")).toBeVisible();

    // 2nd assertion
    await expect(
      page.locator(
        '[data-testid="cartTotal"] span.FormattedPrice-module-price-Kwago'
      )
    ).toHaveText("£0.00");

    // Check if checkout button is disabled
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^Checkout$/ })
        .nth(1)
    ).toBeDisabled();

    await elementsPage.miniCart.click();

    // Assertion: Mini cart should be empty
    await expect(
      page.getByTestId("mini-cart-header").getByTestId("emptyCartContainer")
    ).toBeVisible();

    // Assertion: No items in cart message
    await expect(page.getByText("Your Cart0 ItemsThere are no")).toBeVisible();

    if (
      await page.getByTestId("miniCartCloseIcon").locator("path").isVisible()
    ) {
      await page.getByTestId("miniCartCloseIcon").locator("path").click();
    } else {
      throw new Error(
        "The mini cart close icon is not available, test aborted."
      );
    }
  } else {
    throw new Error("The product is not available, test aborted.");
  }
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
