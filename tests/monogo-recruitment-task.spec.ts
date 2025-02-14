import { test, expect } from "@playwright/test";
import { SimpleElements } from "../pages/monogo.page";

test("Verify if it is possible to add a product to the cart.", async ({
  page,
}) => {
  // Arrange:
  const elementsPage = new SimpleElements(page);
  await page.goto("https://www.ploom.co.uk/en");
  // await page.getByRole("button", { name: "Reject All" }).click();
  await elementsPage.buttonCookiesAccept.click();

  // await page.getByRole("button", { name: "GOT IT" }).click();
  await page.locator(".ageconfirmation__actionWrapper > div").first().click();
  // await page.locator('[data-testid="headerItem-0"]').click();
  await page.locator(".navigation__link").first().click();

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

  await page.locator('[data-sku="ploom-x-advanced"]').click();
  //add assertion to check if in stock
  await page
    .getByRole("heading", { name: "Ploom X Advanced Rose Shimmer" })
    .click();
  await page.getByTestId("pdpAddToProduct").click();
  await page.getByTestId("cartQuantity").click();
  await expect(page.locator('[data-testid="cartQuantity"]')).toHaveValue("1");
  //   await page.getByTestId("cartIcon").getByRole("img").click();
  await page.getByTestId("miniCart").click();
  //   await page.getByTestId("miniCartCheckoutButton").click();
  await page.getByTestId("miniCart").click();
  await page.getByTestId("miniCartCheckoutButton").click();

  await expect(
    page.locator(".ProductDescription-module-description-y4geg")
  ).toHaveText(/^A unique Heated Tobacco Xperience/);

  await expect(
    page.locator('span.Button-module-content-ZY6ar:has-text("Checkout")')
  ).toBeVisible();
  // Act:

  // Assert:
});

test("Verify if it is possible to add a product to the cart. POM", async ({
  page,
}) => {
  // Arrange:
  const elementsPage = new SimpleElements(page);
  await page.goto("https://www.ploom.co.uk/en");
  await elementsPage.buttonCookiesAccept.click();
  await elementsPage.buttonAgeConfirmation.first().click();
  await elementsPage.buttonNavigationLink.first().click();
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

  await elementsPage.buttonProductPloomXAdvanced.click();
  await page
    .getByRole("heading", { name: "Ploom X Advanced Rose Shimmer" })
    .click();

  await elementsPage.buttonAddProduct.click();
  await elementsPage.cartQuantity.click();
  await await expect(elementsPage.cartQuantity).toHaveValue("1");
  await elementsPage.miniCart.click();
  await elementsPage.miniCart.click();
  await elementsPage.miniCartCheckoutButton.click();

  await expect(
    page.locator(".ProductDescription-module-description-y4geg")
  ).toHaveText(/^A unique Heated Tobacco Xperience/);

  await expect(
    page.locator('span.Button-module-content-ZY6ar:has-text("Checkout")')
  ).toBeVisible();
});

test("Verify if it is possible to remove a product from the cart.", async ({
  page,
}) => {
  // Arrange:
  const elementsPage = new SimpleElements(page);
  await page.goto("https://www.ploom.co.uk/en");
  await elementsPage.buttonCookiesAccept.click();
  await elementsPage.buttonAgeConfirmation.first().click();
  await elementsPage.buttonNavigationLink.first().click();
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

  await elementsPage.buttonProductPloomXAdvanced.click();
  await page
    .getByRole("heading", { name: "Ploom X Advanced Rose Shimmer" })
    .click();

  await elementsPage.buttonAddProduct.click();
  await elementsPage.cartQuantity.click();
  await await expect(elementsPage.cartQuantity).toHaveValue("1");
  await elementsPage.miniCartCheckoutButton.click();

  await page
    .getByTestId("regular-cart-list")
    .getByTestId("quantityMinus")
    .click();
  //1 assertion
  await expect(page.getByText("You have no items in your")).toBeVisible();

  // 2nd assertion
  await expect(
    page.locator(
      '[data-testid="cartTotal"] span.FormattedPrice-module-price-Kwago'
    )
  ).toHaveText("£0.00");

  // check if disabled

  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Checkout$/ })
      .nth(1)
  ).toBeDisabled();

  await elementsPage.miniCart.click();
  //assertion:

  await expect(
    page.getByTestId("mini-cart-header").getByTestId("emptyCartContainer")
  ).toBeVisible();

  //assertion:
  await expect(page.getByText("Your Cart0 ItemsThere are no")).toBeVisible();
  await page.getByTestId("miniCartCloseIcon").locator("path").click();
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

  await elementsPage.buttonProductPloomXAdvanced.click();
  await page
    .getByRole("heading", { name: "Ploom X Advanced Rose Shimmer" })
    .click();

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
        console.log(
          `Link: ${fullHref} incorrect protocol: ${url.protocol}`
        );
      }
    } catch (error) {
      console.log(`Link: ${fullHref} inncorect url`);
    }
  }

  //check if is clickable and accesible
  await expect(
    page.getByRole("link", { name: "0800 876 6594 Monday to" })
  ).toBeEnabled();
  // can we click on items?

  await expect
    .soft(
      page
        .locator("p")
        .filter({ hasText: "for more information on how" })
        .getByRole("link")
    )
    .toBeEnabled();
  await expect
    .soft(
      page
        .getByTestId("recaptchabar")
        .getByRole("link", { name: "Privacy Policy" })
    )
    .toBeEnabled();
  await expect
    .soft(page.getByRole("link", { name: "Terms of Service" }))
    .toBeEnabled();
  await expect.soft(page.getByText("Support")).toBeEnabled();
  await expect
    .soft(page.getByTestId("ItemList-0-Contact Us").getByTestId("shopLink-0"))
    .toBeEnabled();
  await expect
    .soft(page.getByTestId("ItemList-1-FAQ's").getByTestId("shopLink-1"))
    .toBeEnabled();
  await expect
    .soft(page.getByTestId("ItemList-2-Product Help").getByTestId("shopLink-2"))
    .toBeEnabled();
  await expect.soft(page.getByText("Delivery & Returns")).toBeEnabled();
  await expect
    .soft(page.getByTestId("ItemList-0-Delivery").getByTestId("shopLink-0"))
    .toBeEnabled();
  await expect
    .soft(page.getByTestId("ItemList-1-Returns").getByTestId("shopLink-1"))
    .toBeEnabled();
  await expect
    .soft(
      page.getByTestId("ItemList-2-Ploom Promise").getByTestId("shopLink-2")
    )
    .toBeEnabled();
  await expect.soft(page.getByText("Company")).toBeEnabled();
  await expect
    .soft(page.getByTestId("ItemList-0-Terms of Use").getByTestId("shopLink-0"))
    .toBeEnabled();
  await expect
    .soft(
      page.getByTestId("ItemList-1-Terms of Sale").getByTestId("shopLink-1")
    )
    .toBeEnabled();
  await expect
    .soft(page.getByTestId("ItemList-2-Environment").getByTestId("shopLink-2"))
    .toBeEnabled();

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
