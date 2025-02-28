import { test, expect } from "@playwright/test";
import { SimpleElements } from "../pages/monogo.page";
import {
  closeShopMenuIfVisible,
  linkToCartNCheckout,
  linkToProductPloomXAdvanced,
  quantityMinus,
  verifyAllLinksOnPage,
} from "../test-data/monogo-helpers.ts";

test("Verify if it is possible to add a product to the cart.", async ({
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
  await elementsPage.cartQuantity.press("Enter");
  await elementsPage.miniCartCheckoutButton.click();

  // await page.goto("https://www.ploom.co.uk/en/cart-n-checkout#/", { waitUntil: "domcontentloaded" });
  await page.goto("https://www.ploom.co.uk/en/cart-n-checkout#/");
  await quantityMinus(page);
  // 1st assertion
  await expect(elementsPage.youHaveNoItems).toBeVisible();
  // sprobujemy innej metody innego lokatora
  // await elementsPage.miniBasket1.click();
  await elementsPage.miniBasket.click();

  // await page.goto('https://www.ploom.co.uk/en/cart-n-checkout#/');

  // await page.getByTestId('regular-cart-list').getByTestId('quantityMinus').click();
  // await page.getByTestId('cartIcon').locator('path').click();
  // await page.getByTestId('cartIcon').locator('path').click();
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
  // Arrange:
  const elementsPage = new SimpleElements(page);
  await page.goto("https://www.ploom.co.uk/en");

  await elementsPage.buttonCookiesAccept.click();
  await elementsPage.buttonAgeConfirmation.first().click();
  await elementsPage.buttonNavigationLink.first().click();
  await closeShopMenuIfVisible(page);

  // if (
  //   await page
  //     .locator('li:has-text("Shop")')
  //     .locator('[data-testid="CloseShopMenu"]')
  //     .isVisible()
  // ) {
  //   await page
  //     .locator('li:has-text("Shop")')
  //     .locator('[data-testid="CloseShopMenu"]')
  //     .click();
  // } else {
  //   console.log("'CloseShopMenu' element has not been found. Test goes on.");
  // }

  await elementsPage.ploomXAdvanced.click({ force: true });
  await page.waitForURL(linkToProductPloomXAdvanced);
  await expect(elementsPage.ploomXAdvancedProduct).toBeVisible();
  await elementsPage.ploomXAdvancedProduct.click();

  // await elementsPage.buttonProductPloomXAdvanced.click();
  // await page
  //   .getByRole("heading", { name: /^Ploom X Advanced Rose Shimmer.*/i })
  //   .click();

  // to co nizej:
  // dziala :)
  await verifyAllLinksOnPage(page, "https://www.ploom.co.uk");

  /*
  // gather all links from webstie
  const links = await page.locator("a");

  // check all links on website
  const linkCount = await links.count();

  for (let i = 0; i < linkCount; i++) {
    const link = links.nth(i);

    // does it have(has?) 'href' atribute? im tired cause dont know have/has after dose should be used lol
    const href = await link.getAttribute("href");
    expect(href).toBeTruthy(); // is href null?

    // If the is relative, add the full domain
    let fullHref = href;
    if (fullHref && !fullHref.startsWith("http")) {
      fullHref = "https://www.ploom.co.uk" + fullHref; //all stuff is from this site

      // We check that the URL is absolute and correct
      try {
        const url = new URL(fullHref); // validate if url is correct
        if (url.protocol === "http:" || url.protocol === "https:") {
          // Use request to check the HTTP status of a link
          const response = await page.context().request.get(url.toString()); // Make an HTTP request to the link
          const status = response.status(); //get https status

          // what http status we get?
          if (status === 200) {
            console.log(`Link: ${fullHref} - OK (200)`);
          } else if (status === 404) {
            console.log(`Link: ${fullHref} - Not Found (404)`);
          } else if (status === 500) {
            console.log(`Link: ${fullHref} - Server Error (500)`);
          } else {
            console.log(`Link: ${fullHref} - Unexpected Status: ${status}`);
          }

          // should be 200 http status
          expect(status).toBe(200);
        } else {
          console.log(`Link: ${fullHref} incorrect protocol: ${url.protocol}`);
        }
      } catch (error) {
        console.log(`Link: ${fullHref} inncorect url`);
      }
    }
  }
  */

  //check if is clickable and accesible
  await expect(elementsPage.item0800).toBeEnabled();
  /*
  await expect(
    page.getByRole("link", { name: "0800 876 6594 Monday to" })
  ).toBeEnabled();
  // can we click on items?
*/

  await expect.soft(elementsPage.forMoreInformation).toBeEnabled();
  /* 
  await expect
    .soft(
      page
        .locator("p")
        .filter({ hasText: "for more information on how" })
        .getByRole("link")
    )
    .toBeEnabled();
  */

  await expect.soft(elementsPage.privacyPolicy).toBeEnabled();
  /*
    await expect
    .soft(
      page
        .getByTestId("recaptchabar")
        .getByRole("link", { name: "Privacy Policy" })
    )
    .toBeEnabled();
    */

  await expect.soft(elementsPage.termsOfService).toBeEnabled();
  /*
    await expect
    .soft(page.getByRole("link", { name: "Terms of Service" }))
    .toBeEnabled();
    */

  await expect.soft(elementsPage.support).toBeEnabled();
  /*
  await expect.soft(page.getByText("Support")).toBeEnabled();
*/

  await expect.soft(elementsPage.itemsList0).toBeEnabled();
  /*
  
  await expect
    .soft(page.getByTestId("ItemList-0-Contact Us").getByTestId("shopLink-0"))
    .toBeEnabled();
  */

  await expect.soft(elementsPage.itemsList1).toBeEnabled();
  /*
  await expect
    .soft(page.getByTestId("ItemList-1-FAQ's").getByTestId("shopLink-1"))
    .toBeEnabled();
  */

  await expect.soft(elementsPage.itemsList2).toBeEnabled();
  /* 
  await expect
    .soft(page.getByTestId("ItemList-2-Product Help").getByTestId("shopLink-2"))
    .toBeEnabled();
  */

  await expect.soft(elementsPage.deliveryReturns).toBeEnabled();
  /*
  await expect.soft(page.getByText("Delivery & Returns")).toBeEnabled();
  */

  await expect.soft(elementsPage.itemsList0Delivery).toBeEnabled();
  /*
  await expect
    .soft(page.getByTestId("ItemList-0-Delivery").getByTestId("shopLink-0"))
    .toBeEnabled();
  */

  await expect.soft(elementsPage.itemsList1Returns).toBeEnabled();
  /*
  await expect
    .soft(page.getByTestId("ItemList-1-Returns").getByTestId("shopLink-1"))
    .toBeEnabled();
  */

  await expect.soft(elementsPage.itemsList2Ploom).toBeEnabled();
  /*
  await expect
    .soft(
      page.getByTestId("ItemList-2-Ploom Promise").getByTestId("shopLink-2")
    )
    .toBeEnabled();
*/

  await expect.soft(elementsPage.company).toBeEnabled();
  /*
  await expect.soft(page.getByText("Company")).toBeEnabled();
  */

  await expect.soft(elementsPage.itemsList0Terms).toBeEnabled();
  /*
  await expect
    .soft(page.getByTestId("ItemList-0-Terms of Use").getByTestId("shopLink-0"))
    .toBeEnabled();
  */

  await expect.soft(elementsPage.itemsList1Terms).toBeEnabled();
  /*
  await expect
    .soft(
      page.getByTestId("ItemList-1-Terms of Sale").getByTestId("shopLink-1")
    )
    .toBeEnabled();
  */

  await expect.soft(elementsPage.itemsList2Environment).toBeEnabled();
  /*
  await expect
    .soft(page.getByTestId("ItemList-2-Environment").getByTestId("shopLink-2"))
    .toBeEnabled();
  */

  // gather all images
  const images = await page.locator("img");

  // check how many images
  const imageCount = await images.count();

  for (let i = 0; i < imageCount; i++) {
    const image = images.nth(i);

    // does img has src atribute?
    const src = await image.getAttribute("src");
    expect(src).toBeTruthy(); // is src null?

    // is shown on page?
    const isVisible = await image.isVisible();
    expect(isVisible).toBe(true); // has to be visible otherwise bug :d

    // If the URL is relative, we add the full domain
    let fullSrc = src;
    if (fullSrc && !fullSrc.startsWith("http")) {
      fullSrc = "https://m24-ploom-uk.jtides.com" + fullSrc;
    }

    // to chceck http status i use fetch()
    if (fullSrc) {
      const response = await page.request.get(fullSrc); // calling http about img
      expect(response.status()).toBe(200); // should be 200 status
    }
  }
});
