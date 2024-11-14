import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login-data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { PulpitPage } from '../pages/pulpit.page';
test.describe('Payment tests', () => {
  const userID = 'testerLO';
  const userPassword = '12345678';


  test.beforeEach (async ({ page }) => {
    const url = 'https://demo-bank.vercel.app/';
    const userID = loginData.userId;
    const userPassword = loginData.password;
    await page.goto(url);

    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userID);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
    // await page.getByTestId('login-input').fill(userID);
    // await page.getByTestId('password-input').fill(userPassword);
    // await page.getByTestId('login-button').click();
    const pulpitPage = new PulpitPage(page);
    await pulpitPage.sideMenu.paymentButton.click();

    // await page.getByRole('link', { name: 'płatności' }).click();
  });


test('simple payment', async ({ page }) => {

  const loginPage = new LoginPage(page);
    
  const paymentPage = new PaymentPage(page);
  const receiverID = 'Jan Nowak';
  const account = '12 3456 7890 1234 5678 9000 00000';
  const amount = '222';

  await page.getByRole('link', { name: 'płatności' }).click();
  // await page.getByTestId('transfer_receiver').click();
  await paymentPage.transferReceiverClick.click();

  // await page.getByTestId('transfer_receiver').fill('Jan Nowak');
  // await loginPage.loginInput.fill(userID);
  await paymentPage.tranferReceiverFIll.fill(receiverID);
  await page.getByTestId('transfer_receiver').press('Tab');
  await paymentPage.formAccountTo.fill(account);
  // await page.getByTestId('form_account_to').fill('12 3456 7890 1234 5678 9000 00000');
  await paymentPage.formAmount.fill(amount);
  // await page.getByTestId('form_amount').click();


  // await page.getByTestId('form_amount').fill('222');
  await page.getByRole('button', { name: 'wykonaj przelew' }).click();
  await paymentPage.closeButton.click();
  // await page.getByTestId('close-button').click();

  await expect(page.getByTestId('show_messages')).toHaveText('Przelew wykonany! 222,00PLN dla Jan Nowak');
  // await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');
});})