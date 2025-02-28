import { Locator, Page } from "@playwright/test";

export class SimpleElements {
  buttonCookiesAccept: Locator;
  buttonAgeConfirmation: Locator;
  buttonNavigationLink: Locator;
  buttonCloseShopMenu: Locator;
  buttonProductPloomXAdvanced: Locator;
  buttonAddProduct: Locator;
  cartQuantity: Locator;
  miniCart: Locator;
  miniCartCheckoutButton: Locator;
  dropDownNoId1: Locator; //use selectOption('option1')
  loginInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  ageConfirmation: Locator;
  shopDropMenu: Locator;
  ploomXAdvanced: Locator;
  ploomXAdvancedProduct: Locator;
  buttonAddToCart: Locator;
  cartQuantityValueDataTestId: Locator;
  productDescription: Locator;
  loginCheckoutButton: Locator;
  cartQuantityMinus: Locator;
  youHaveNoItems: Locator;
  miniBasket: Locator;
  emptyCartContainer: Locator;
  miniBasket1: Locator;
  item0800: Locator;

  constructor(private page: Page) {
    this.buttonCookiesAccept = this.page.getByRole("button", {
      name: "GOT IT",
    });
    this.buttonAgeConfirmation = this.page.locator(
      ".ageconfirmation__actionWrapper > div"
    );
    this.buttonNavigationLink = this.page.locator(".navigation__link");
    this.buttonCloseShopMenu = this.page
      .locator('li:has-text("Shop")')
      .getByTestId("CloseShopMenu");

    this.buttonProductPloomXAdvanced = this.page.locator(
      '[data-sku="ploom-x-advanced"]'
    );
    this.buttonAddProduct = this.page.getByTestId("pdpAddToProduct");

    this.cartQuantity = this.page.getByTestId("cartQuantity");
    this.miniCart = this.page.getByTestId("miniCart");
    this.miniCartCheckoutButton = this.page.getByTestId(
      "miniCartCheckoutButton"
    );
    this.ageConfirmation = this.page
      .locator(".ageconfirmation__actionWrapper > div")
      .first();
    this.shopDropMenu = this.page.locator(".navigation__link").first();

    this.ploomXAdvanced = this.page.locator('[data-sku="ploom-x-advanced"]');
    this.ploomXAdvancedProduct = this.page.getByRole("heading", {
      name: "Ploom X Advanced Rose Shimmer",
    });
    this.buttonAddToCart = this.page.getByTestId("pdpAddToProduct");
    this.cartQuantityValueDataTestId = this.page.locator(
      '[data-testid="cartQuantity"]'
    );
    this.productDescription = this.page.locator(
      ".ProductDescription-module-description-y4geg"
    );
    this.loginCheckoutButton = this.page.locator(
      'button[data-testid="loginCheckoutButton"]'
    );
    this.cartQuantityMinus = this.page
      .getByTestId("regular-cart-list")
      .getByTestId("quantityMinus");
    this.youHaveNoItems = this.page.getByText("You have no items in your");
    this.miniBasket = this.page.getByTestId("miniCart");

    this.miniBasket1 = this.page.getByTestId("cartIcon").locator("path");
    this.emptyCartContainer = this.page
      .getByTestId("mini-cart-header")
      .getByTestId("emptyCartContainer");

     this.item0800 = this.page.getByRole("link", { name: "0800 876 6594 Monday to" });

  }

  async login(userID: string, userPassword: string): Promise<void> {
    await this.loginInput.fill(userID);
    await this.passwordInput.fill(userPassword);
    await this.loginButton.click();
  }
}
