import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login-data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';
// obiekt expect pomaga Nam tworzenie asercję 
// czyli sprawdzamy czy wymagany warunek jest spełniony

test.describe('User login to Demobank', () => {
  test.beforeEach (async ({ page }) => {
    const url = 'https://demo-bank.vercel.app/';
    await page.goto(url);

    
  });
    
  test('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const userID = loginData.userId;
    const userPassword = loginData.userPassword;
    const expectedUserName = 'Jan Demobankowy';
    
    // Act go to w hooku przed testem zainicjowana w test.beforeEach
    // await page.goto(url);
    // await page.getByTestId('login-input').click();
    // await page.getByTestId('login-input').fill(userID);

    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userID);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    // await page.getByTestId('login-input').press('Tab');
    // await page.getByTestId('password-input').click();
    // await page.getByTestId('password-input').fill(userPassword);
    // await page.getByTestId('login-button').click();
    // await page.getByTestId('user-name').click();
    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
   // Act go to w hooku przed testem zainicjowana w test.beforeEach
    // await page.goto(url);

    const userId = loginData.userId;
    const incorrectPassword = '12345';
    const incorrectUserId = 'tester';
    const expectedErrorMessage = 'identyfikator ma min. 8 znaków';
    // await page.getByTestId('login-input').click();
    // await page.getByTestId('login-input').fill(userId);
    // await page.getByTestId('password-input').click();



    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(incorrectUserId);
    await loginPage.passwordInput.click();

    // Assert
    await expect(loginPage.loginError).toHaveText(expectedErrorMessage);
    // const loginPage = new LoginPage(page);
    // await loginPage.loginInput.fill(incorrectUserId);
    // await page.getByTestId('password-input').fill(incorrectPassword);
    // await page.getByTestId('password-input').blur();

    // await expect(page.getByTestId('error-login-password')).toHaveText(expectedErrorMessage);
  });

  test('unsuccessful login with too short password', async ({ page }) => {
   
   // Arrange
   const userId = loginData.userId;
   const incorrectPassword = '1234';
   const expectedErrorMessage = 'hasło ma min. 8 znaków';

   // Act
   const loginPage = new LoginPage(page);
   await loginPage.loginInput.fill(userId);
   await loginPage.passwordInput.fill(incorrectPassword);
   await loginPage.passwordInput.blur();

   // Assert
   await expect(loginPage.passwordError).toHaveText(expectedErrorMessage);
   
    // //zmieniajac na test.only wykona nam tylko ten jeden test
    // // Act go to w hooku przed testem zainicjowana w test.beforeEach
    // // await page.goto(url);
    // await page.getByTestId('login-input').click();
    // await page.getByTestId('login-input').fill('testerLO');
    // await page.getByTestId('password-input').click();
    // await page.getByTestId('password-input').fill('12345');
    // await page.getByTestId('password-input').blur();
    // // await page.locator('#login_password_container label').click();
    // //await page.getByTestId('error-login-id').click();

    // await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');
  });

  test('unsuccessful login with too short password1', async ({ page }) => {
    //zmieniajac na test.only wykona nam tylko ten jeden test
    // Act go to w hooku przed testem zainicjowana w test.beforeEach
    // await page.goto(url);
    await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill('testerLO');
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill('12345');
    await page.getByTestId('password-input').blur();
    // await page.locator('#login_password_container label').click();
    //await page.getByTestId('error-login-id').click();

    await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');
  });

  test.use({ignoreHTTPSErrors: true,})
  const userID = 's';
  const password = '12345678';
  
  test('test', async ({ page }) => {
    await page.goto('https://10.10.15.164:8443/');
    
    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').fill(userID);
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill(password);
    await page.locator('input[type="password"]').press('Enter');
    await page.locator('.egs-cc-components-Select__input-container').click();
    await page.getByText('Admin', { exact: true }).click();
    await page.getByLabel('CustomForm-finish').click();
    await page.locator('label').filter({ hasText: 'mandcops' }).locator('span').nth(2).click();
    await page.getByRole('button', { name: 'JOIN' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.locator('p').filter({ hasText: 'Run-Time Management' }).click();
    await page.getByText('Monitoring').click();
    await page.getByRole('button', { name: '+New widget' }).click();
    await page.locator('#AddWidgetModal-nameInput').click();
    await page.locator('#AddWidgetModal-nameInput').fill('stack');
    await page.locator('.new-widget-modal-select > .egs-cc-components-Select__control > .egs-cc-components-Select__value-container > .egs-cc-components-Select__input-container').click();
    await page.locator('#react-select-4-input').fill('stac');
    await page.getByText('Activity Stack', { exact: true }).click();
    await page.locator('#AddWidgetModal-nameInput').click();
    await page.locator('#AddWidgetModal-nameInput').fill('stack1');
    await page.getByRole('button', { name: 'ADD' }).click();
    await page.getByRole('button', { name: 'SEARCH ' }).click();
    await page.getByLabel('TreeSearch').getByLabel('SearchBar-input').click();
    await page.getByLabel('TreeSearch').getByLabel('SearchBar-input').fill('act_ping');
    await page.getByText('ACT_PING', { exact: true }).click();
    // await page.getByText('Add to stack').click();
    // await page.locator('#egs-cc-components-ActivityModal-routeId > .egs-cc-components-Select__control > .egs-cc-components-Select__value-container > .egs-cc-components-Select__input-container').click();
    // await page.getByText('CnC', { exact: true }).click();
    // await page.locator('div:nth-child(7) > div:nth-child(2) > .col-sm-10 > label:nth-child(2) > .egs-cc-components-RadioButton-outerCircle > .egs-cc-components-RadioButton-inside > .egs-cc-components-RadioButton-innerCircle').click();
    // await page.getByRole('textbox').first().click();
    // await page.getByRole('textbox').first().fill('3');
    // await page.getByPlaceholder('____-__-__ __:__:__.___').click();
    // await page.getByPlaceholder('____-__-__ __:__:__.___').click();
    // await page.getByPlaceholder('____-__-__ __:__:__.___').click();
    // await page.getByPlaceholder('____-__-__ __:__:__.___').click();
    // await page.getByPlaceholder('____-__-__ __:__:__.___').click();
    // await page.getByRole('cell', { name: '22' }).click();
    // await page.getByRole('cell', { name: ':15:33.000' }).click();
    // await page.getByLabel('CustomModal-body').getByText('▲').first().click();
    // await page.getByRole('button', { name: 'ADD TO STACK' }).click();
    // await page.getByRole('button', { name: '利 ACT_PING', exact: true }).click();
    await page.getByRole('button', { name: '利 ACT_PING', exact: true }).press('Shift+F10');
    await page.getByText('Add to stack').click();
    await page.locator('#egs-cc-components-ActivityModal-routeId > .egs-cc-components-Select__control > .egs-cc-components-Select__value-container > .egs-cc-components-Select__input-container').click();
    await page.getByLabel('CustomModal-body').getByText('CnC', { exact: true }).click();
    await page.locator('div:nth-child(7) > div:nth-child(2) > .col-sm-10 > label:nth-child(2) > .egs-cc-components-RadioButton-outerCircle > .egs-cc-components-RadioButton-inside').click();
    await page.getByRole('textbox').first().click();
    await page.getByRole('textbox').first().fill('3');
    await page.getByPlaceholder('2025-02-02 02:02:02.000').click();
    // tu nie przejdzzie wpisywnai tekstu xd nie mam czsau na rozpracowanie tego
    await page.getByRole('button', { name: 'ADD TO STACK' }).click();
   
  });

  test.use({ignoreHTTPSErrors: true,})
  test('zmiana_sesji', async ({ page }) => {
    await page.goto('https://10.10.15.164:8443/');

    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').fill('s');
    await page.locator('input[type="password"]').click();
    //test dla commita
    await page.locator('input[type="password"]').fill('12345678');
    await page.locator('input[type="password"]').press('Enter');
    await page.locator('.egs-cc-components-Select__input-container').click();
    await page.getByText('Admin', { exact: true }).click();
    await page.getByLabel('CustomForm-finish').click();
    await page.locator('label').filter({ hasText: 'mandcops' }).locator('span').nth(2).click();
    await page.getByRole('button', { name: 'JOIN' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.locator('p').filter({ hasText: 'Run-Time Management' }).click();
    await page.locator('.egs-cc-components-CustomTree-row').click();
    await page.locator('div').filter({ hasText: /^preparation$/ }).nth(3).click();
    await page.locator('div').filter({ hasText: /^preparation$/ }).nth(1).press('Shift+F10');
    await page.getByRole('button', { name: 'Join' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.getByRole('button', { name: 's/Admin preparation ' }).click();
    // await page.getByLabel('s/Adminpreparation').getByText('preparation').click();
    await expect(page.locator('#nav-dropdown-session')).toHaveText('preparation');
  });


  test.use({ignoreHTTPSErrors: true,})
  test('stworzenie activity stacka', async ({ page }) => {
  await page.goto('http://localhost:8181/');
  // await page.goto('chrome-error://chromewebdata/');
  // await page.getByText('ERR_CONNECTION_REFUSED').click();
  // await page.getByText('ERR_CONNECTION_REFUSED').click();
  await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').fill('s');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('12345678');
  await page.locator('input[type="password"]').press('Enter');
  await page.locator('.egs-cc-components-Select__input-container').click();
  await page.getByText('Admin', { exact: true }).click();
  await page.getByLabel('CustomForm-finish').click();
  await page.getByText('mandcops').click();
  await page.getByRole('button', { name: 'JOIN' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: '+New widget' }).click();
  await page.locator('#AddWidgetModal-nameInput').click();
  await page.locator('#AddWidgetModal-nameInput').fill('activitystacktest1');
  await page.locator('#AddWidgetModal-nameInput').press('Tab');
  await page.locator('.new-widget-modal-select > .egs-cc-components-Select__control > .egs-cc-components-Select__value-container > .egs-cc-components-Select__input-container').click();
  await page.getByText('Activity Stack', { exact: true }).click();
  await page.locator('div').filter({ hasText: /^ADD$/ }).click();
  await page.getByRole('button', { name: 'ADD' }).click();
  
});

});