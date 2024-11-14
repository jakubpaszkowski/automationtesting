import { test, expect } from '@playwright/test';
import { loginData, userTmeID, userPasswordTme } from '../test-data/login-data';
import { LoginPage } from '../pages/tme.page';

// obiekt expect pomaga Nam tworzenie asercję 
// czyli sprawdzamy czy wymagany warunek jest spełniony

test.describe('User login to Demobank', () => {
  test.beforeEach (async ({ page }) => {
    const url = 'https://www.tme.eu/pl/';
    await page.goto(url);
    
  });
    




  test('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const userID = loginData.userId;
    const userPassword = loginData.password;
    const expectedUserName = 'superadminek';
    
    

    const loginPage = new LoginPage(page);
    await page.getByRole('button', { name: 'Accept necessary cookies' }).click();
    await loginPage.loginButtonToAccesLogin.click();
    await loginPage.loginInput.fill(userTmeID);
    await loginPage.passwordInput.fill(userPasswordTme);
    await loginPage.loginButton.click();

    await page.getByRole('banner').getByRole('button', { name: 'Wyloguj się' }).click();
    
    
    
  });

  test('logowanie + dodanie kilku produktow do koszyka', async ({ page }) => {
    // Arrange
   const userID = loginData.userId;
    const userPassword = loginData.password;
    const expectedUserName = 'spamtu1+tme';
    
    

    const loginPage = new LoginPage(page);
    await page.getByRole('button', { name: 'Accept necessary cookies' }).click();
    await loginPage.loginButtonToAccesLogin.click();
    await loginPage.loginInput.fill(userTmeID);
    await loginPage.passwordInput.fill(userPasswordTme);
    await loginPage.loginButton.click();


    // await page.getByRole('link', { name: 'NOWOŚCI', exact: true }).click();
    // await page.getByRole('link', { name: 'Półprzewodniki Nowe produkty:' }).click();
    // // await page.getByRole('button', { name: 'Diody' }).click();
    // await page.getByRole('button', { name: 'Diody uniwersalne' }).click();
    // await page.getByRole('button', { name: 'Diody uniwersalne SMD' }).click();
    // await page.locator('.nqtTG').first().click();
    // await page.getByRole('button', { name: 'Utwórz zamówienie' }).click();
    // await page.getByRole('button', { name: 'Przejdź do koszyka' }).click();
    // await page.getByTestId('order-line-delete-icon').click();
    // await page.getByRole('button', { name: 'Koszyk' }).click();
    // await page.getByText('Dodaj produkty do koszyka i').click();
    // await page.locator('div').filter({ hasText: /^W Twoim koszyku$/ }).getByRole('button').click();
    // await page.getByRole('banner').getByRole('button', { name: 'Wyloguj się' }).click();
    // await page.goto('https://www.tme.eu/pl/katalog/diody-uniwersalne-smd_112791/?onlyNew=1');

    
    // await page.getByRole('banner').getByRole('button', { name: 'Wyloguj się' }).click();
    
    // await page.goto('https://www.tme.eu/pl/');
    // await page.getByRole('button', { name: 'Zezwól na niezbędne' }).click();
    // await page.getByLabel('Zaloguj się').click();
    // await page.getByRole('dialog').locator('input[name="f_login"]').click();
    // await page.getByRole('dialog').locator('input[name="f_login"]').fill('spamtu1+tme');
    // await page.getByRole('dialog').locator('input[name="f_password"]').click();
    // await page.getByRole('dialog').locator('input[name="f_password"]').fill('dlaTme1.');
    // await page.getByRole('dialog').locator('input[name="f_password"]').press('Enter');
    // await page.getByPlaceholder('Wpisz nazwę produktu (min. 2').click();
    // await page.getByPlaceholder('Wpisz nazwę produktu (min. 2').fill('CQL-434/MZ');
    // await page.getByPlaceholder('Wpisz nazwę produktu (min. 2').press('Enter');
    // await page.goto('https://www.tme.eu/pl/');
    
    await page.getByPlaceholder('Wpisz nazwę produktu (min. 2').click();
    
    await page.getByPlaceholder('Wpisz nazwę produktu (min. 2').fill('CQL-434/MZ');
    await page.getByLabel('Wyszukaj').click();
    // await page.getByRole('link', { name: 'CQL-434/MZ', exact: true }).click();

    
    // await page.getByPlaceholder('Wpisz nazwę produktu (min. 2').fill('CQL-434/MZ');
    // await page.getByPlaceholder('Wpisz nazwę produktu (min. 2').press('Enter');
    // await page.getByRole('link', { name: 'CQL-434/MZ', exact: true }).click();
    await page.getByPlaceholder('Wpisz nazwę produktu (min. 2').fill('CQL-434-2');
    await page.getByLabel('Wyszukaj').click();
    await page.getByRole('link', { name: 'CQL-434-2', exact: true }).click();
    await page.getByTestId('order-button').click()
    
  
    
    
  });

  
});