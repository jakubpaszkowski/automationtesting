import { Page } from "@playwright/test";

export class LoginPage {
    constructor(private page: Page) {}


    loginInput = this.page.getByRole('dialog').locator('input[name="f_login"]')
    passwordInput = this.page.getByRole('dialog').locator('input[name="f_password"]');
    loginButtonToAccesLogin = this.page.getByLabel('Zaloguj się');
    loginButton = this.page.getByRole('dialog').getByRole('button', { name: 'Zaloguj się' });
    loginError = this.page.getByTestId('error-login-id');
    passwordError = this.page.getByTestId('error-login-password');
    
    // await page.getByTestId('login-input').fill(userID);
    // await page.getByTestId('password-input').fill(userPassword);
}


export class LoginPageWebui {
    constructor(private page: Page) {}


    loginInput = this.page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox')
    passwordInput = this.page.locator('input[type="password"]')
    loginButton = this.page.getByRole('button', { name: 'LOGIN' })

    loginDropDownMenu = this.page.locator('svg')
    
    loginChooseAdmin = this.page.locator('#react-select-role-option-0')

    loginCustomFormFinish = this.page.getByLabel('CustomForm-finish')

    loginAsMandcops = this.page.locator('div').filter({ hasText: /^mandcops$/ })

    loginButtonToJoinAsRole = this.page.getByRole('button', { name: 'JOIN' })

    loginButtonClickOk = this.page.getByRole('button', { name: 'OK' })

    // await page.getByTestId('login-input').fill(userID);
    // await page.getByTestId('password-input').fill(userPassword);
}



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