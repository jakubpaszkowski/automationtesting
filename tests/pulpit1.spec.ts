import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login-data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  const userID = 'testerLO';
  const userPassword = '12345678';
  const klient = 'Jan Demobankowy';
  test.beforeEach (async ({ page }) => {

    //dla testow negatywnych usunac z beforeEach wszystko procz np. url, w sumie
    // moze lepiej by bylo zrobic testy pulpit-pozytywne.spec.ts i oddzielnie pulpit-negatywne.spec.ts hmmm? :)
    const url = 'https://demo-bank.vercel.app/';
    const userID = loginData.userId;
    const userPassword = loginData.password;
    await page.goto(url);

    const loginPage = new LoginPage(page);
    await loginPage.login(userID, userPassword);
    // await loginPage.loginInput.fill(userID);
    // await loginPage.passwordInput.fill(userPassword);
    // await loginPage.loginButton.click();
    
  });


  test('successful login with correct credentials',
    { tag: ["@login", "@smoke", ]},
    async ({ page }) => {
    // await page.goto('https://demo-bank.vercel.app/');
    // await page.getByTestId('login-input').click();
    const loginPage = new LoginPage(page);
    const pulpitPage = new PulpitPage(page);
    // await loginPage.loginInput.fill(userID);
    // await loginPage.passwordInput.fill(userPassword);
    // await loginPage.loginButton.click();

    // await page.getByTestId('login-input').fill('testerLO');
    // await page.getByTestId('login-input').press('Tab');
    // await page.getByTestId('password-input').click();
    // await page.getByTestId('password-input').fill('12345678');
    // await page.getByTestId('login-button').click();
    // await page.getByTestId('user-name').click();
    await pulpitPage.userName.click();

    // await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');
    await expect(pulpitPage.userName).toHaveText(klient);
  });

  // test('unsuccessful login with too short username', async ({ page }) => {
  //   //Arrange
  //   // const url = 'https://demo-bank.vercel.app/'
  //   const incorrectUserID = 'testerLOl';
  //   const expectedErrorMessages = 'identyfikator ma min. 8 znaków';
  //   const loginPage = new LoginPage(page);
  //   const pulpitPage = new PulpitPage(page);
  //   //Act
  //   // await page.goto(url);
  //   // await page.getByTestId('login-input').click();
  //   await pulpitPage.loginInput.click();
    
  //   //gdy mamy testy negatywne nie mozna w beforeEach dac tego co ma sie nie powiesc w testach negatywnych np. prawidlwoe haslo 
  //   // gryzie sie z testem na pworwadzenie niegatywnego hasla i sprawdzeniem jak appka zaareaguje.
  //   // await page.getByTestId('login-input').fill(incorrectUserID);
  //   await pulpitPage.loginInput.fill(incorrectUserID);
  //   // await page.getByTestId('password-input').click();
  //   await pulpitPage.passwordInput.click();
  //   // await page.getByTestId('error-login-id').click();
  //   await pulpitPage.loginError.click();
  //   //Assert
  //   // await expect(page.getByTestId('error-login-id')).toHaveText(expectedErrorMessages);
  //   await expect(pulpitPage.loginError).toHaveText(expectedErrorMessages);
  // });




  test('quick payment with correct data',
    { tag: ["@pulpit", "@integration", ]},
     async ({ page }) => {
    // Arrange
    // const url = 'https://demo-bank.vercel.app/';
    const expectedUserName = 'Jan Demobankowy';

    const receiverID = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const exprectedTransfrReceiver = 'Chuck Demobankowy';

    // Act
    // await page.goto(url);
    // await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('login-input').press('Tab');
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_transfer_receiver').selectOption(receiverID);
    await page.locator('#widget_1_transfer_amount').click();
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').click();
    await page.locator('#widget_1_transfer_title').click();
    await page.locator('#widget_1_transfer_title').fill(transferTitle);
    //   await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.locator('#execute_btn').click();
    await page.getByTestId('close-button').click();
    //   await page.getByRole('link', { name: 'Przelew wykonany! Chuck' }).click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(`Przelew wykonany! ${exprectedTransfrReceiver} - ${transferAmount},00PLN - ${transferTitle}`);
  });



  test('successful mobile top-up', 
    { tag: ["@pulpit", "@integration" ]},
    async ({ page }) => {
    // Arrange
    // const url = 'https://demo-bank.vercel.app/';
    // const userID = 'testerLO';
    // const userPassword = '12345678';
    const expectedUserName = 'Jan Demobankowy';

    const topUpReceiverID = '500 xxx xxx';
    const topUpAmount = '50';
    const transferTitle = 'pizza';
    const exprectedTransfrReceiver = 'Chuck Demobankowys';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiverID}`;

    // Act
    // await page.goto(url);
    // await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('login-input').press('Tab');
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_topup_receiver').selectOption(topUpReceiverID);
    await page.locator('#widget_1_topup_amount').click();
    await page.locator('#widget_1_topup_amount').fill(topUpAmount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    // await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();
    // await page.getByRole('link', { name: 'Doładowanie wykonane! 40,' }).click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);

  });

  test('correct balance after successful mobile top-up', 
    { tag: ["@pulpit", "@integration", ]},
    async ({ page }) => {
    // Arrange
    // const url = 'https://demo-bank.vercel.app/';
    // const userID = 'testerLO';
    // const userPassword = '12345678';
    const expectedUserName = 'Jan Demobankowy';

    const topUpReceiverID = '500 xxx xxx';
    const topUpAmount = '50';
    const transferTitle = 'pizza';
    const exprectedTransfrReceiver = 'Chuck Demobankowys';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiverID}`;
    const initialBalance = await page.locator('#money_value').innerText();
    

    // Act
    // await page.goto(url);
    // await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('login-input').press('Tab');
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_topup_receiver').selectOption(topUpReceiverID);
    await page.locator('#widget_1_topup_amount').click();
    await page.locator('#widget_1_topup_amount').fill(topUpAmount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    // await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();
    // await page.getByRole('link', { name: 'Doładowanie wykonane! 40,' }).click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);

  });

  test('unsuccessful login with too short password', 
    { tag: ["@login", "@smoke", ]},
    async ({ page }) => {
    //Arrange
    const url = 'https://demo-bank.vercel.app/';
    // const userID = 'testerLO';
    const incorrectPassword = '12345';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';
    //zmieniajac na test.only wykona nam tylko ten jeden test
    //Act
    await page.goto(url);
    await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill(userID);
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill(incorrectPassword);
    await page.getByTestId('password-input').blur();
    // await page.locator('#login_password_container label').click();
    //await page.getByTestId('error-login-id').click();
    //Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(expectedErrorMessage);
  });

});