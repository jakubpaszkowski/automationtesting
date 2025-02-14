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
  

  constructor(private page: Page) {
    this.buttonCookiesAccept = this.page.getByRole("button", { name: "GOT IT" });
    this.buttonAgeConfirmation = this.page.locator(".ageconfirmation__actionWrapper > div");
    this.buttonNavigationLink = this.page.locator(".navigation__link");
    this.buttonCloseShopMenu = this.page.locator('li:has-text("Shop")').getByTestId("CloseShopMenu");
    this.buttonProductPloomXAdvanced = this.page.locator('[data-sku="ploom-x-advanced"]');
    this.buttonAddProduct = this.page.getByTestId("pdpAddToProduct");

    this.cartQuantity = this.page.getByTestId("cartQuantity");
    this.miniCart = this.page.getByTestId("miniCart");
    this.miniCartCheckoutButton = this.page.getByTestId("miniCartCheckoutButton")
    
  }
  async login(userID: string, userPassword: string): Promise<void> {
    await this.loginInput.fill(userID);
    await this.passwordInput.fill(userPassword);
    await this.loginButton.click();
  }
}
