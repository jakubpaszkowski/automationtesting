import { Locator, Page } from "@playwright/test";

export class SimpleElements {
  buttonCookiesAcceptPolish: Locator;
  buttonAgeConfirmation: Locator;
  buttonNavigationLink: Locator;
  buttonCloseShopMenu: Locator;
  buttonProductPloomXAdvanced: Locator;
  buttonProductPloomXAdvancedBluePolish: Locator;
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
  forMoreInformation: Locator;
  privacyPolicy: Locator;
  termsOfService: Locator;
  support: Locator;
  itemsList0: Locator;
  itemsList1: Locator;
  itemsList2: Locator;
  deliveryReturns: Locator;
  itemsList0Delivery: Locator;
  itemsList1Returns: Locator; 
  itemsList2Ploom: Locator;
  company: Locator;
  itemsList0Terms: Locator;
  itemsList1Terms: Locator;
  itemsList2Environment: Locator;
  headingPloomXAdvancedBlue: Locator; 
  shopButtonPolish: Locator;
  emptyContainerInfoTextPolish: Locator;
  emptyCartContainerPolish: Locator;

  constructor(private page: Page) {
    this.buttonCookiesAcceptPolish = page.getByRole('button', { name: 'Akceptuj wszystkie pliki' });

    this.buttonAgeConfirmation = this.page.locator(
      ".ageconfirmation__actionWrapper > div"
    );
    this.buttonNavigationLink = this.page.locator(".navigation__link");
    this.buttonCloseShopMenu = this.page
      .locator('li:has-text("Shop")')
      .getByTestId("CloseShopMenu");
    this.shopButtonPolish = this.page.getByText('Sklep Sklep Zobacz wszystkie');

    this.buttonProductPloomXAdvancedBluePolish = this.page.locator(
      '[data-sku="15109135"]'
    );

    this.headingPloomXAdvancedBlue = this.page.getByRole('heading', { name: 'Ploom X Advanced niebieski' });
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


    this.emptyContainerInfoTextPolish = this.page.getByTestId('page-base-layout-content').getByTestId('emptyCartContainer');

    this.youHaveNoItems = this.page.getByText("You have no items in your");
    this.emptyCartContainerPolish = this.page.getByText(
        "W tej chwili w Twoim koszyku nie ma żadnych produktów.");

    this.miniBasket = this.page.getByTestId("miniCart");

    this.miniBasket1 = this.page.getByTestId("cartIcon").locator("path");
    this.emptyCartContainer = this.page
      .getByTestId("mini-cart-header")
      .getByTestId("emptyCartContainer");

     this.item0800 = this.page.getByRole("link", { name: "0800 876 6594 Monday to" });
    this.forMoreInformation = this.page
    .locator("p")
    .filter({ hasText: "for more information on how" })
    .getByRole("link");

    this.privacyPolicy = this.page
    .getByTestId("recaptchabar")
    .getByRole("link", { name: "Privacy Policy" });

    this.termsOfService = this.page.getByRole("link", { name: "Terms of Service" });
    this.support = this.page.getByText("Support");
    this.itemsList0 = this.page.getByTestId("ItemList-0-Contact Us").getByTestId("shopLink-0");
    this.itemsList1 = this.page.getByTestId("ItemList-1-FAQ's").getByTestId("shopLink-1");
    this.itemsList2 = this.page.getByTestId("ItemList-2-Product Help").getByTestId("shopLink-2");
    this.deliveryReturns = this.page.getByText("Delivery & Returns");
    this.itemsList0Delivery = this.page.getByTestId("ItemList-0-Delivery").getByTestId("shopLink-0");
    this.itemsList1Returns = this.page.getByTestId("ItemList-1-Returns").getByTestId("shopLink-1");
    this.itemsList2Ploom = this.page.getByTestId("ItemList-2-Ploom Promise").getByTestId("shopLink-2");
    this.company = this.page.getByText("Company");
    this.itemsList0Terms = this.page.getByTestId("ItemList-0-Terms of Use").getByTestId("shopLink-0");
    this.itemsList1Terms = this.page.getByTestId("ItemList-1-Terms of Sale").getByTestId("shopLink-1");
    this.itemsList2Environment = this.page.getByTestId("ItemList-2-Environment").getByTestId("shopLink-2");



  }

  async login(userID: string, userPassword: string): Promise<void> {
    await this.loginInput.fill(userID);
    await this.passwordInput.fill(userPassword);
    await this.loginButton.click();
  }
}
