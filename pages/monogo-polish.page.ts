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
  item0800Polish: Locator;
  forMoreInformation: Locator;
  privacyPolicy: Locator;
  privacyPolicyPolish: Locator;
  termsOfService: Locator;
  support: Locator;
  supportPolish: Locator;
  itemsList0: Locator;
  itemsContactUsPolish: Locator;
  itemsFaqPolish: Locator;
  itemsProductHelpPolish: Locator;
  deliveryReturnsPolish: Locator;
  itemsDeliveryPolish: Locator;
  itemsList1Returns: Locator; 
  itemsWhyPloomPolish: Locator;
  companyPolish: Locator;
  itemsTermsOfUsePolish: Locator;
  itemsTermsOfSalePolish: Locator;
  itemsList2Environment: Locator;
  headingPloomXAdvancedBlue: Locator; 
  shopButtonPolish: Locator;
  emptyContainerInfoTextPolish: Locator;
  emptyCartContainerPolish: Locator;
  item800808000Polish: Locator;

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

     this.item800808000Polish = this.page.getByRole('link', { name: '800 808 000 Od poniedziałku' });
     
    this.forMoreInformation = this.page
    .locator("p")
    .filter({ hasText: "for more information on how" })
    .getByRole("link");

    this.privacyPolicyPolish = this.page.getByTestId('ItemList-1-Polityka prywatności');

    this.termsOfService = this.page.getByRole("link", { name: "Terms of Service" });
    this.supportPolish = this.page.getByTestId('footer').getByText('Wsparcie');
    this.itemsContactUsPolish = this.page.getByTestId('ItemList-0-Kontakt');
    this.itemsFaqPolish = this.page.getByTestId('ItemList-2-FAQ');
    this.itemsProductHelpPolish = this.page.getByTestId('ItemList-3-Pomoc dotycząca produktów');
    this.deliveryReturnsPolish = this.page.getByTestId('ItemList-5-Zwroty i reklamacje');
    this.itemsDeliveryPolish = this.page.getByTestId('ItemList-6-Formy dostaw i płatności');
    // this.itemsReturnsPolish = this.page.getByTestId('ItemList-5-Zwroty i reklamacje');
    this.itemsWhyPloomPolish = this.page.getByTestId('ItemList-0-Dlaczego Ploom?');
    this.companyPolish = this.page.getByText('Ploom', { exact: true });
    this.itemsTermsOfUsePolish = this.page.getByTestId('ItemList-1-Instrukcje i deklaracje');
    this.itemsTermsOfSalePolish = this.page.getByTestId('ItemList-2-Weryfikacja wieku');
    this.itemsList2Environment = this.page.getByTestId("ItemList-2-Environment").getByTestId("shopLink-2");



  }

  async login(userID: string, userPassword: string): Promise<void> {
    await this.loginInput.fill(userID);
    await this.passwordInput.fill(userPassword);
    await this.loginButton.click();
  }
}
