import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {

    test('quick payment with correct data', async ({ page }) => {
      await page.goto('https://demo-bank.vercel.app/');
      await page.getByTestId('login-input').click();
      await page.getByTestId('login-input').fill('testerLO');
      await page.getByTestId('password-input').click();
      await page.getByTestId('password-input').fill('password');
      await page.getByTestId('login-button').click();
      await page.locator('#widget_1_transfer_receiver').selectOption('2');
      await page.locator('#widget_1_transfer_amount').click();
      await page.locator('#widget_1_transfer_amount').fill('150');
      await page.locator('#widget_1_transfer_title').click();
      await page.locator('#widget_1_transfer_title').click();
      await page.locator('#widget_1_transfer_title').fill('pizza');
    //   await page.getByRole('button', { name: 'wykonaj' }).click();
      await page.locator('#execute_btn').click();
      await page.getByTestId('close-button').click();
    //   await page.getByRole('link', { name: 'Przelew wykonany! Chuck' }).click();

      await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Chuck Demobankowy - 150,00PLN - pizza');
    });

  

    test.only('successful mobile top-up', async ({ page }) => {
      await page.goto('https://demo-bank.vercel.app/');
      await page.getByTestId('login-input').click();
      await page.getByTestId('login-input').fill('TesterLO');
      await page.getByTestId('password-input').click();
      await page.getByTestId('password-input').fill('12345678');
      await page.getByTestId('login-button').click();
      await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx');
      await page.locator('#widget_1_topup_amount').click();
      await page.locator('#widget_1_topup_amount').fill('40');
      await page.locator('#uniform-widget_1_topup_agreement span').click();
      // await page.locator('#uniform-widget_1_topup_agreement span').click();
      await page.getByRole('button', { name: 'doładuj telefon' }).click();
      await page.getByTestId('close-button').click();
      // await page.getByRole('link', { name: 'Doładowanie wykonane! 40,' }).click();
      await expect(page.locator('#show_messages')).toHaveText('Doładowanie wykonane! 40,00PLN na numer 500 xxx xxx');

    });


});