import { Locator, Page } from "@playwright/test";

export class LoginPage {
  loginInput: Locator;
  passwordInput: Locator;
  loginButtonToAccesLogin: Locator;
  loginError: Locator;
  passwordError: Locator;
  loginButton: Locator;

  constructor(private page: Page) {
    this.loginInput = this.page
      .getByRole("dialog")
      .locator('input[name="f_login"]');
    this.passwordInput = this.page
      .getByRole("dialog")
      .locator('input[name="f_password"]');
    this.loginButtonToAccesLogin = this.page.getByLabel("Zaloguj się");
    this.loginButton = this.page
      .getByRole("dialog")
      .getByRole("button", { name: "Zaloguj się" });
    this.loginError = this.page.getByTestId("error-login-id");
    this.passwordError = this.page.getByTestId("error-login-password");
  }

  // await page.getByTestId('login-input').fill(userID);
  // await page.getByTestId('password-input').fill(userPassword);
}

export class LoginPageWebui {
  loginInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  loginDropDownMenu: Locator;
  loginChooseAdmin: Locator;
  loginCustomFormFinish: Locator;
  loginAsMandcops: Locator;
  loginButtonToJoinAsRole: Locator;
  loginButtonClickOk: Locator;

  constructor(private page: Page) {
    this.loginInput = this.page
      .locator("div")
      .filter({ hasText: /^Username$/ })
      .getByRole("textbox");
    this.passwordInput = this.page.locator('input[type="password"]');
    this.loginButton = this.page.getByRole("button", { name: "LOGIN" });

    this.loginDropDownMenu = this.page.locator("svg");

    this.loginChooseAdmin = this.page.locator("#react-select-role-option-0");

    this.loginCustomFormFinish = this.page.getByLabel("CustomForm-finish");

    this.loginAsMandcops = this.page
      .locator("div")
      .filter({ hasText: /^mandcops$/ });

    this.loginButtonToJoinAsRole = this.page.getByRole("button", {
      name: "JOIN",
    });

    this.loginButtonClickOk = this.page.getByRole("button", { name: "OK" });
  }
}
