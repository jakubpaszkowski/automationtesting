import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login-data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { PulpitPage } from '../pages/pulpit.page';


test.describe('Payment tests', () => {
  let paymentPage: PaymentPage;
 
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;


    await page.goto('https://demo-bank.vercel.app/');
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);


    const pulpitPage = new PulpitPage(page);
    await pulpitPage.sideMenuComponent.paymentLink.click();
   
    paymentPage = new PaymentPage(page);
  });


  test('simple payment', 
    { tag: ["@payment", "@smoke", ],
    annotation: {type: "documentation", description: "More to find at lesson link :)"} },
    
    
    async ({ page }) => {
    // Arrange
    const transferReceiver = 'Jan Nowak';
    const transferAccount = '12 3456 7890 1234 5678 9012 34568';
    const transferAmount = '222';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;


    // Act
    await paymentPage.transferReceiverInput.fill(transferReceiver);
    await paymentPage.transferToInput.fill(transferAccount);
    await paymentPage.transferAmountInput.fill(transferAmount);


    await paymentPage.transferButton.click();
    await paymentPage.actionCloseButton.click();


    // Assert
    await expect(paymentPage.messageText).toHaveText(expectedMessage);
  });
});