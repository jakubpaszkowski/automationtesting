import { Locator, Page } from "@playwright/test";
import { userID, userPasswordTme } from "../test-data/login-data";

export class SimpleElements {
  buttonId: Locator;
  buttonNoId: Locator;
  checkboxId: Locator;
  checkboxNoId: Locator;
  inputId: Locator;
  inputNoId: Locator;
  textAreaId: Locator;
  textAreaNoId: Locator;
  radioButtons1Id: Locator;
  radioButtons1NoId: Locator;
  radioButtons2Id: Locator;
  radioButtons2NoId: Locator;
  radioButtons3Id: Locator;
  radioButtons3NoId: Locator;
  rangeId: Locator;
  rangeNoId: Locator;
  dateCalendarId: Locator;
  dateCalendarNoId: Locator;
  colorPaletteId: Locator;
  colorPaletteNoId: Locator;
  resultsId: Locator;
  resultsNoId: Locator;
  dropDownNoId1: Locator; //use selectOption('option1')
  dropDownNoId2: Locator;
  dropDownNoId3: Locator;

  constructor(private page: Page) {
    this.buttonNoId = this.page.getByRole("button", { name: "Click me!" });
    this.checkboxNoId = this.page.getByRole("checkbox");
    this.inputNoId = this.page.locator('input[type="text"]');
    this.textAreaNoId = this.page.locator("textarea");
    this.dropDownNoId1 = this.page.getByRole("combobox");
    this.radioButtons1NoId = this.page.getByRole("radio").first();
    this.radioButtons2NoId = this.page.getByRole("radio").nth(1);
    this.radioButtons3NoId = this.page.getByRole("radio").nth(2);
    this.rangeNoId = this.page.getByRole("slider");
    this.dateCalendarNoId = this.page.locator('input[type="date"]');
    this.colorPaletteNoId = this.page.locator('input[type="color"]');
    this.resultsNoId = this.page.getByTestId("dti-results");

    this.buttonId = this.page.getByTestId("dti-button-element");
    this.checkboxId = this.page.getByTestId("dti-checkbox");
    this.inputId = this.page.getByTestId("dti-input");
    this.textAreaId = this.page.getByTestId("dti-textarea");
    this.radioButtons1Id = this.page.getByTestId("dti-radio1");
    this.radioButtons2Id = this.page.getByTestId("dti-radio2");
    this.radioButtons3Id = this.page.getByTestId("dti-radio3");
    this.rangeId = this.page.getByTestId("dti-range");
    this.dateCalendarId = this.page.getByTestId("dti-date");
    this.colorPaletteId = this.page.getByTestId("dti-color");
    this.resultsId = this.page.getByTestId("dti-results");
  }
  async login(userID: string, userPassword: string): Promise<void> {
    await this.loginInput.fill(userID);
    await this.passwordInput.fill(userPassword);
    await this.loginButton.click();
  }
}

export class AccountPage {
  proceedToCheckout: Locator;
  placeOrder: Locator;
  searchBar: Locator;
  firstName: Locator;
  accountClick: Locator;
  searchBarClick: Locator;
  lastName: Locator;
  logOutClick: Locator;
  companyName: Locator;
  streetAddress: Locator;
  itemBelt: Locator;
  apartmentSuitUnit: Locator;
  addToCard: Locator;
  postcode: Locator;
  myCard: Locator;
  townCity: Locator;

  constructor(private page: Page) {
    this.searchBar = this.page.getByPlaceholder("Search");
    this.searchBarClick = this.page.getByRole("button", { name: "" });
    this.itemBelt = this.page.getByRole("link", { name: "FITT Belts" });
    // await page.getByTestId('login-input').fill(userID);
    // await page.getByTestId('password-input').fill(userPassword);
    this.addToCard = this.page.getByRole("button", { name: "Add to cart" });
    this.myCard = this.page.getByRole("link", { name: " My Cart - zł" });
    this.proceedToCheckout = this.page.getByRole("link", {
      name: "Proceed to checkout",
    });
    this.firstName = this.page.getByRole("textbox", { name: "First name *" });
    this.lastName = this.page.getByRole("textbox", { name: "Last name *" });
    this.companyName = this.page.getByRole("textbox", {
      name: "Company name (optional)",
    });
    this.streetAddress = this.page.getByRole("textbox", {
      name: "Street address *",
    });
    this.apartmentSuitUnit = this.page.getByRole("textbox", {
      name: "Apartment, suite, unit etc. (",
    });
    this.postcode = this.page.getByRole("textbox", {
      name: "Postcode / ZIP *",
    });
    this.townCity = this.page.getByRole("textbox", { name: "Town / City *" });
    this.placeOrder = this.page.getByRole("button", { name: "Place order" });
    this.accountClick = this.page.getByRole("link", { name: " Account" });
    this.logOutClick = this.page.getByRole("link", { name: "Log out" });
  }
}

export class SimpleReservations {
  food: Locator;
  date23102024: Locator;
  checkoutButton: Locator;
  results: Locator;

  constructor(private page: Page) {
    this.food = this.page
      .getByRole("row", { name: "Food 🥗 50$" })
      .getByRole("checkbox");
    this.date23102024 = this.page
      .getByRole("row", { name: "23.10.2024 100$ Reserve" })
      .getByRole("button");
    this.checkoutButton = this.page.getByRole("button", { name: "Checkout" });
    this.results = this.page.getByTestId("dti-results");
  }
}
export class DisabledElements {
  food: Locator;
  input: Locator;
  color: Locator;
  date23102024: Locator;
  textarea: Locator;
  buttonId: Locator;
  checkoutButton: Locator;
  dropdown: Locator;
  results: Locator;
  radio: Locator;
  heading: Locator;
  range: Locator;
  checkbox: Locator;
  date: Locator;

  constructor(private page: Page) {
    this.buttonId = this.page.getByTestId("dti-button-element");
    this.results = this.page.getByTestId("dti-results");
    this.heading = this.page.getByRole("heading", {
      name: "Elements are now: ENABLED -",
    });
    this.checkbox = this.page.getByTestId("dti-checkbox"); //in tests add check() method;
    this.input = this.page.getByTestId("dti-input");
    this.textarea = this.page.getByTestId("dti-textarea");
    this.dropdown = this.page.getByTestId("dti-dropdown"); //in tests add selectOption('option2');
    this.radio = this.page.getByTestId("dti-radio2"); //in tests add check();
    this.range = this.page.getByTestId("dti-range"); //in tests add fill('52');
    this.date = this.page.getByTestId("dti-date"); //in tests add fill('2024-11-16');
    this.color = this.page.getByTestId("dti-color"); //in tests add click();
  }
}

export class WeatherTable {
  date20220101: Locator;
  rowLocator: Locator;
  temperature: Locator;
  weather: Locator;
  humidity: Locator;
  dayLenght: Locator;
  cloudCover: Locator;
  input: Locator;
  color: Locator;
  date23102024: Locator;
  textarea: Locator;
  buttonId: Locator;
  checkoutButton: Locator;
  dropdown: Locator;
  results: Locator;
  radio: Locator;
  heading: Locator;
  range: Locator;
  checkbox: Locator;
  date: Locator;

  constructor(private page: Page) {
    this.rowLocator = this.page.locator("tr", {
      has: page.locator("td", { hasText: "2024-11-17" }),
    });
    //   const temperature = await rowLocator
    //     .locator("td:nth-child(3)")
    //     .textContent();

    this.weather = this.page.locator("td:nth-child(2)");

    this.humidity = this.page.locator("td:nth-child(3)");

    this.dayLenght = this.page.locator("td:nth-child(4)");

    this.cloudCover = this.page.locator("td:nth-child(5)");

    this.date20220101 = this.page.locator("#cell-1-3");
    page.locator("tr > td:nth-child(4)").nth(1);
    this.results = this.page.getByTestId("dti-results");
    this.heading = this.page.getByRole("heading", {
      name: "Elements are now: ENABLED -",
    });
    this.checkbox = this.page.getByTestId("dti-checkbox"); //in tests add check() method;
    this.input = this.page.getByTestId("dti-input");
    this.textarea = this.page.getByTestId("dti-textarea");
    this.dropdown = this.page.getByTestId("dti-dropdown"); //in tests add selectOption('option2');
    this.radio = this.page.getByTestId("dti-radio2"); //in tests add check();
    this.range = this.page.getByTestId("dti-range"); //in tests add fill('52');
    this.date = this.page.getByTestId("dti-date"); //in tests add fill('2024-11-16');
    this.color = this.page.getByTestId("dti-color"); //in tests add click();
  }
}

export class NestedTable {
  row1stRow1stClick: Locator;
  row1stRow2ndClick: Locator; // just add .nth(1);
  row1stRow3rdClick: Locator; // just add .nth(2);
  row2ndRow1stClick: Locator;
  row2ndRow2ndClick: Locator; // just add .nth(1);
  row2ndRow3rdClick: Locator; // just add .nth(2);
  row2ndRow4thClick: Locator;
  row3rdRow1stClick: Locator;
  row3rdRow2ndClick: Locator; // just add .nth(2);
  row3rdRow3rdClick: Locator; // just add .nth(2);
  row3rdRow4thClick: Locator; // just add .nth(2);
  row3rdRow5thClick: Locator; // just add .nth(2);
  results: Locator;
  resultsHistory: Locator;
  rowHeading: Locator;
  valueHeading: Locator;
  actionHeading: Locator;

  constructor(private page: Page) {
    this.rowHeading = this.page.getByRole("cell", { name: "Row", exact: true });
    this.valueHeading = this.page.getByRole("cell", { name: "Value" });
    this.actionHeading = this.page.getByRole("cell", { name: "Action" });

    this.row1stRow1stClick = this.page
      .getByRole("row", { name: "Row 1.0 X Row 1 X Click! Row" })
      .getByRole("button");
    this.row1stRow2ndClick // just add .nth(1);

      this.row1stRow2ndClick // just add .nth(2)
      // .getByRole("row", { name: "Row 1.0 X Row 1 X Click! Row" })
      // .getByRole("button");
    this.resultsHistory = this.page.getByTestId("dti-results");
    this.row2ndRow1stClick = this.page.getByRole('row', { name: 'Row 2.0 Y Row 1 X Row 1 X' }).getByRole('button');
    this.row2ndRow2ndClick = this.page.locator('td:nth-child(3) > table > tbody > tr > td:nth-child(3) > table > tbody > tr:nth-child(2) > td:nth-child(3)');
    this.row2ndRow3rdClick = this.page.locator('tr:nth-child(3) > td:nth-child(3) > table > tbody > tr:nth-child(2) > td:nth-child(3)');
    this.row2ndRow4thClick = this.page.locator('tr:nth-child(3) > td:nth-child(3) > table > tbody > tr:nth-child(3) > td:nth-child(3)');

    this.row3rdRow1stClick = this.page.locator('tr:nth-child(4) > td:nth-child(3) > table > tbody > tr > td:nth-child(3) > table > tbody > tr > td:nth-child(3)');
    this.row3rdRow2ndClick = this.page.locator('tr:nth-child(4) > td:nth-child(3) > table > tbody > tr > td:nth-child(3) > table > tbody > tr:nth-child(2) > td:nth-child(3)');
    this.row3rdRow3rdClick = this.page.locator('td:nth-child(3) > table > tbody > tr:nth-child(2) > td:nth-child(3) > table > tbody > tr > td:nth-child(3)');
    this.row3rdRow4thClick = this.page.locator('td:nth-child(3) > table > tbody > tr:nth-child(2) > td:nth-child(3) > table > tbody > tr:nth-child(2) > td:nth-child(3)');
    this.row3rdRow5thClick = this.page.locator('tr:nth-child(4) > td:nth-child(3) > table > tbody > tr:nth-child(3) > td:nth-child(3)');


  }
}

export class SlowLoadedTable {
  row6: Locator;  row14: Locator;
  row6Weather: Locator; row14Weather: Locator;
  row6Temperature: Locator; row14Temperature: Locator;
  row6Hours: Locator;  row14Hours: Locator;



  constructor(private page: Page) {
    
    this.row6 = this.page.getByTestId('dti-row-6-date');
    this.row6Weather = this.page.getByTestId('dti-row-6-weather');
    this.row6Temperature = this.page.getByRole('cell', { name: '-5°C' });
    this.row6Hours = this.page.getByRole('cell', { name: ':00 AM - 6:00 PM' }); //first();
    this.row14 = this.page.getByTestId('dti-row-14-date');
    this.row14Weather = this.page.getByTestId('dti-row-14-weather');
    this.row14Temperature = this.page.getByRole('cell', { name: '-2°C' });
    this.row14Hours = this.page.getByRole('cell', { name: ':30 AM - 6:30 PM' })// nth(1).click();
 
  }
}