import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login-data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit testy negatywne', () => {
//   const userID = 'testerLO';
//   const userPassword = '12345678';
  const klient = 'Jan Demobankowy';
  test.beforeEach (async ({ page }) => {

    //dla testow negatywnych usunac z beforeEach wszystko procz np. url, w sumie
    // moze lepiej by bylo zrobic testy pulpit-pozytywne.spec.ts i oddzielnie pulpit-negatywne.spec.ts hmmm? :)
    const url = 'https://demo-bank.vercel.app/';
    const userID = loginData.userId;
    const userPassword = loginData.password;
    await page.goto(url);

    const loginPage = new LoginPage(page);
    // await loginPage.loginInput.fill(userID);
    // await loginPage.passwordInput.fill(userPassword);
    // await loginPage.loginButton.click();
    
  });

test('unsuccessful login with too short username', async ({ page }) => {
    //Arrange
    // const url = 'https://demo-bank.vercel.app/'
    const incorrectUserID = 'test';
    const expectedErrorMessages = 'identyfikator ma min. 8 znaków';
    const loginPage = new LoginPage(page);
    const pulpitPage = new PulpitPage(page);
    //Act
    // await page.goto(url);
    // await page.getByTestId('login-input').click();
    await pulpitPage.loginInput.click();
    
    //gdy mamy testy negatywne nie mozna w beforeEach dac tego co ma sie nie powiesc w testach negatywnych np. prawidlwoe haslo 
    // gryzie sie z testem na pworwadzenie niegatywnego hasla i sprawdzeniem jak appka zaareaguje.
    // await page.getByTestId('login-input').fill(incorrectUserID);
    await pulpitPage.loginInput.fill(incorrectUserID);
    // await page.getByTestId('password-input').click();
    await pulpitPage.passwordInput.click();
    await pulpitPage.passwordInput.fill(loginData.password)
    // await page.getByTestId('error-login-id').click();
    await pulpitPage.loginError.click();
    //Assert
    // await expect(page.getByTestId('error-login-id')).toHaveText(expectedErrorMessages);
    await expect(pulpitPage.loginError).toHaveText(expectedErrorMessages);
  });



  test('unsuccessful login with too short password', async ({ page }) => {
    //Arrange
    const url = 'https://demo-bank.vercel.app/';
    const userID = 'testerLO';
    const incorrectPassword = '12345';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';
    const loginPage = new LoginPage(page);
    const pulpitPage = new PulpitPage(page);
    //zmieniajac na test.only wykona nam tylko ten jeden test
    //Act
    
    // await pulpitPage.loginButton.click();
    // await page.getByTestId('login-input').click();
    await pulpitPage.loginInput.fill(userID);
    // await page.getByTestId('login-input').fill(userID);
    await pulpitPage.passwordInput.fill(incorrectPassword);

    // await page.getByTestId('password-input').click();

    // await page.getByTestId('password-input').fill(incorrectPassword);

    await page.getByTestId('password-input').blur();
    // await page.locator('#login_password_container label').click();
    //await page.getByTestId('error-login-id').click();
    //Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(expectedErrorMessage);
  });
});