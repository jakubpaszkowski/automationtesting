import {Locator, Page } from "@playwright/test";
import { userID, userPasswordTme } from "../test-data/login-data";

export class SimpleElements {
    



    buttonId: Locator;          buttonNoId: Locator;
    checkboxId: Locator;        checkboxNoId: Locator;
    inputId: Locator;           inputNoId: Locator;
    textAreaId: Locator;        textAreaNoId: Locator;
    radioButtons1Id: Locator;   radioButtons1NoId: Locator;
    radioButtons2Id: Locator;   radioButtons2NoId: Locator;
    radioButtons3Id: Locator;   radioButtons3NoId: Locator;
    rangeId: Locator;           rangeNoId: Locator;
    dateCalendarId: Locator;    dateCalendarNoId: Locator;
    colorPaletteId: Locator;    colorPaletteNoId: Locator;
    resultsId: Locator;         resultsNoId: Locator;
                                dropDownNoId1: Locator; //use selectOption('option1')
                                dropDownNoId2: Locator;
                                dropDownNoId3: Locator;

    constructor(private page: Page) {


        this.buttonNoId = this.page.getByRole('button', { name: 'Click me!' });
        this.checkboxNoId = this.page.getByRole('checkbox');
        this.inputNoId = this.page.locator('input[type="text"]');
        this.textAreaNoId = this.page.locator('textarea');
        this.dropDownNoId1 = this.page.getByRole('combobox');
        this.radioButtons1NoId = this.page.getByRole('radio').first();
        this.radioButtons2NoId = this.page.getByRole('radio').nth(1);
        this.radioButtons3NoId = this.page.getByRole('radio').nth(2)
        this.rangeNoId = this.page.getByRole('slider');
        this.dateCalendarNoId = this.page.locator('input[type="date"]')
        this.colorPaletteNoId = this.page.locator('input[type="color"]');
        this.resultsNoId = this.page.getByTestId('dti-results');






    this.buttonId = this.page.getByTestId('dti-button-element');
    this.checkboxId = this.page.getByTestId('dti-checkbox');
    this.inputId = this.page.getByTestId('dti-input');
    this.textAreaId = this.page.getByTestId('dti-textarea')
    this.radioButtons1Id = this.page.getByTestId('dti-radio1');
    this.radioButtons2Id = this.page.getByTestId('dti-radio2');
    this.radioButtons3Id = this.page.getByTestId('dti-radio3');
    this.rangeId = this.page.getByTestId('dti-range');
    this.dateCalendarId = this.page.getByTestId('dti-date');
    this.colorPaletteId = this.page.getByTestId('dti-color');
    this.resultsId = this.page.getByTestId('dti-results');

    



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

export class SimpleReservations {
    
    food: Locator;
    date23102024: Locator;
    checkoutButton: Locator;
    results: Locator;


    constructor(private page: Page) {

        
    this.food = this.page.getByRole('row', { name: 'Food 🥗 50$' }).getByRole('checkbox');
    this.date23102024 = this.page.getByRole('row', { name: '23.10.2024 100$ Reserve' }).getByRole('button');
    this.checkoutButton = this.page.getByRole('button', { name: 'Checkout' })
    this.results = this.page.getByTestId('dti-results');

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