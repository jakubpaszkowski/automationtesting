import {Locator, Page } from "@playwright/test";
import { userID, userPasswordTme } from "../test-data/login-data";

export class LoginPage {
    
    loginInput: Locator; proceedToCheckout: Locator; placeOrder: Locator;
    passwordInput: Locator; firstName: Locator;      accountClick: Locator;
    loginButton: Locator;   lastName: Locator;       logOutClick: Locator;
    loginError: Locator;    companyName: Locator;
    passwordError: Locator; streetAddress: Locator;
    itemBelt: Locator;      apartmentSuitUnit: Locator;
    addToCard: Locator;     postcode: Locator;
    myCard: Locator;        townCity: Locator;

    constructor(private page: Page) {

        
    this.loginInput = this.page.getByLabel('Username or email address *');
    this.passwordInput = this.page.locator('#password');
    
    // page.getByRole('button', { name: 'Log in' }).click();

    this.loginButton = this.page.getByRole('button', { name: 'Log in' });
    this.loginError = this.page.getByTestId('error-login-id');
    this.passwordError = this.page.getByTestId('error-login-password');
    this.itemBelt = this.page.getByRole('link', { name: 'FITT Belts' });
    // await page.getByTestId('login-input').fill(userID);
    // await page.getByTestId('password-input').fill(userPassword);
    this.addToCard = this.page.getByRole('button', { name: 'Add to cart' });
    this.myCard = this.page.getByRole('link', { name: ' My Cart - zł' });
    this.proceedToCheckout = this.page.getByRole('link', { name: 'Proceed to checkout' });
    this.firstName = this.page.getByRole('textbox', { name: 'First name *' });
    this.lastName = this.page.getByRole('textbox', { name: 'Last name *' });
    this.companyName = this.page.getByRole('textbox', { name: 'Company name (optional)' });
    this.streetAddress = this.page.getByRole('textbox', { name: 'Street address *' });
    this.apartmentSuitUnit = this.page.getByRole('textbox', { name: 'Apartment, suite, unit etc. (' });
    this.postcode = this.page.getByRole('textbox', { name: 'Postcode / ZIP *' });
    this.townCity = this.page.getByRole('textbox', { name: 'Town / City *' });
    this.placeOrder = this.page.getByRole('button', { name: 'Place order' });
    this.accountClick = this.page.getByRole('link', { name: ' Account' });
    this.logOutClick = this.page.getByRole('link', { name: 'Log out' });








}
    async login(userID: string, userPassword: string): Promise <void> {

    await this.loginInput.fill(userID);
    await this.passwordInput.fill(userPassword);
    await this.loginButton.click();
    }

};

export class AccountPage {
    
    proceedToCheckout: Locator; placeOrder: Locator;    searchBar: Locator;
    firstName: Locator;      accountClick: Locator;     searchBarClick: Locator;
    lastName: Locator;       logOutClick: Locator;
    companyName: Locator;
    streetAddress: Locator;
    itemBelt: Locator;      apartmentSuitUnit: Locator;
    addToCard: Locator;     postcode: Locator;
    myCard: Locator;        townCity: Locator;

   

    constructor(private page: Page) {

        
    this.searchBar = this.page.getByPlaceholder('Search');
    this.searchBarClick = this.page.getByRole('button', { name: '' });
    this.itemBelt = this.page.getByRole('link', { name: 'FITT Belts' });
    // await page.getByTestId('login-input').fill(userID);
    // await page.getByTestId('password-input').fill(userPassword);
    this.addToCard = this.page.getByRole('button', { name: 'Add to cart' });
    this.myCard = this.page.getByRole('link', { name: ' My Cart - zł' });
    this.proceedToCheckout = this.page.getByRole('link', { name: 'Proceed to checkout' });
    this.firstName = this.page.getByRole('textbox', { name: 'First name *' });
    this.lastName = this.page.getByRole('textbox', { name: 'Last name *' });
    this.companyName = this.page.getByRole('textbox', { name: 'Company name (optional)' });
    this.streetAddress = this.page.getByRole('textbox', { name: 'Street address *' });
    this.apartmentSuitUnit = this.page.getByRole('textbox', { name: 'Apartment, suite, unit etc. (' });
    this.postcode = this.page.getByRole('textbox', { name: 'Postcode / ZIP *' });
    this.townCity = this.page.getByRole('textbox', { name: 'Town / City *' });
    this.placeOrder = this.page.getByRole('button', { name: 'Place order' });
    this.accountClick = this.page.getByRole('link', { name: ' Account' });
    this.logOutClick = this.page.getByRole('link', { name: 'Log out' });



}};