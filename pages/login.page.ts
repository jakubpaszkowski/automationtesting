import {Locator, Page } from "@playwright/test";
import { userID, userPasswordTme } from "../test-data/login-data";

export class LoginPage {
    
    loginInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    loginError: Locator;
    passwordError: Locator;

    constructor(private page: Page) {


    this.loginInput = this.page.getByTestId('login-input');
    this.passwordInput = this.page.getByTestId('password-input');
    this.loginButton = this.page.getByTestId('login-button');
    this.loginError = this.page.getByTestId('error-login-id');
    this.passwordError = this.page.getByTestId('error-login-password');
    
    // await page.getByTestId('login-input').fill(userID);
    // await page.getByTestId('password-input').fill(userPassword);

    
}
    async login(userID: string, userPassword: string): Promise <void> {

    await this.loginInput.fill(userID);
    await this.passwordInput.fill(userPassword);
    await this.loginButton.click();
    }

};



// export class LoginPage {
//     constructor(private page: Page) {}


//     loginInput = this.page.getByTestId('login-input');
//     passwordInput = this.page.getByTestId('password-input');
//     loginButton = this.page.getByTestId('login-button');
//     loginError = this.page.getByTestId('error-login-id');
//     passwordError = this.page.getByTestId('error-login-password');
    
//     // await page.getByTestId('login-input').fill(userID);
//     // await page.getByTestId('password-input').fill(userPassword);
// }

export class LoginPageWebui {
    loginInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    loginDropDownMenu : Locator;
    loginChooseAdmin: Locator;
    loginCustomFormFinish: Locator;
    loginAsMandcops: Locator;
    loginButtonToJoinAsRole: Locator;
    loginButtonClickOk: Locator;



    constructor(private page: Page) {


    this.loginInput = this.page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox')
    this.passwordInput = this.page.locator('input[type="password"]')
    this.loginButton = this.page.getByRole('button', { name: 'LOGIN' })

    this.loginDropDownMenu = this.page.locator('svg')
    
    this.loginChooseAdmin = this.page.locator('#react-select-role-option-0')

    this.loginCustomFormFinish = this.page.getByLabel('CustomForm-finish')

    this.loginAsMandcops = this.page.locator('div').filter({ hasText: /^mandcops$/ })

    this.loginButtonToJoinAsRole = this.page.getByRole('button', { name: 'JOIN' })

    this.loginButtonClickOk = this.page.getByRole('button', { name: 'OK' })

    // await page.getByTestId('login-input').fill(userID);
    // await page.getByTestId('password-input').fill(userPassword);
}};

// export class LoginPageWebui {
//     constructor(private page: Page) {}


//     loginInput = this.page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox')
//     passwordInput = this.page.locator('input[type="password"]')
//     loginButton = this.page.getByRole('button', { name: 'LOGIN' })

//     loginDropDownMenu = this.page.locator('svg')
    
//     loginChooseAdmin = this.page.locator('#react-select-role-option-0')

//     loginCustomFormFinish = this.page.getByLabel('CustomForm-finish')

//     loginAsMandcops = this.page.locator('div').filter({ hasText: /^mandcops$/ })

//     loginButtonToJoinAsRole = this.page.getByRole('button', { name: 'JOIN' })

//     loginButtonClickOk = this.page.getByRole('button', { name: 'OK' })

//     // await page.getByTestId('login-input').fill(userID);
//     // await page.getByTestId('password-input').fill(userPassword);
// }


// await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').click();
// await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').fill('s');
// await page.locator('input[type="password"]').click();
// await page.locator('input[type="password"]').fill('12345678');
// await page.getByRole('button', { name: 'LOGIN' }).click();
// //poki co dotad zrobione

// await page.locator('.egs-cc-components-Select__input-container').click();
// await page.getByText('Admin', { exact: true }).click();
// await page.getByLabel('CustomForm-finish').click();
// await page.locator('label').filter({ hasText: 'mandcops' }).locator('span').nth(2).click();
// await page.getByRole('button', { name: 'JOIN' }).click();
// await page.getByRole('button', { name: 'OK' }).click();
// ========================

// await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').click();
// await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').fill('s');
// await page.locator('input[type="password"]').click();
// await page.locator('input[type="password"]').fill('12345678');
// await page.getByRole('button', { name: 'LOGIN' }).click();
// // await page.locator('svg').click();
// // await page.getByText('Admin', { exact: true }).click();
// await page.locator('svg').click();
// await page.locator('#react-select-role-option-0').click();


// await page.getByLabel('CustomForm-finish').click();
// await page.locator('div').filter({ hasText: /^mandcops$/ }).click();
// await page.getByRole('button', { name: 'JOIN' }).click();
// await page.getByRole('button', { name: 'OK' }).click();