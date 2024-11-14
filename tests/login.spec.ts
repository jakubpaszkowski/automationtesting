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
   
   
   // Changing to test.only will execute only this single test
   // Act goes to the hook initialized in test.beforeEach
  
  
  });

  test('unsuccessful login with too short password1', async ({ page }) => {
   // Changing to test.only will execute only this single test
   // Act goes to the hook initialized in test.beforeEach
    // await page.goto(url);
    await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill('testerLO');
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill('12345');
    await page.getByTestId('password-input').blur();
    await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');
  });

  

});