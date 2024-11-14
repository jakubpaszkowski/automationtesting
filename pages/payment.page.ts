import { Locator, Page } from "@playwright/test";
import { SideMenuComponent } from "../components/side-menu.component";

export class PaymentPage {
    messageText(messageText: any) {
        throw new Error('Method not implemented.');
    }

    loginInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    loginError: Locator;
    passwordError: Locator;
    transferReceiverClick: Locator;
    tranferReceiverFIll: Locator;
    formAccountTo: Locator;
    formAmount: Locator;
    closeButton: Locator;
    paymentButton: Locator;
    sideMenu: SideMenuComponent;
    transferToInput: any;
    transferButton: any;
    actionCloseButton: any;
    transferReceiverInput: any;
    transferAmountInput: any;
    

    constructor(private page: Page) {

    this.sideMenu = new SideMenuComponent(this.page);
    this.loginInput = this.page.getByTestId('login-input');
    this.passwordInput = this.page.getByTestId('password-input');
    this.loginButton = this.page.getByTestId('login-button');
    this.loginError = this.page.getByTestId('error-login-id');
    this.passwordError = this.page.getByTestId('error-login-password');
    this.transferReceiverClick = this.page.getByTestId('transfer_receiver');
    this.tranferReceiverFIll = this.page.getByTestId('transfer_receiver');
    this.formAccountTo = this.page.getByTestId('form_account_to');
    this.formAmount = this.page.getByTestId('form_amount');
    this.closeButton = this.page.getByTestId('close-button');

    
    this.transferReceiverInput = this.page.getByTestId('transfer_receiver');
  this.transferToInput = this.page.getByTestId('form_account_to');
  this.transferAmountInput = this.page.getByTestId('form_amount');


  this.transferButton = this.page.getByRole('button', { name: 'wykonaj przelew' });
  this.actionCloseButton = this.page.getByTestId('close-button');


//   this.messageText = this.page.locator('#show_messages');
    }


    
    
    // await page.getByTestId('login-input').fill(userID);
    // await page.getByTestId('password-input').fill(userPassword);
};



export class PaymentPage1 {
  
  constructor(private page: Page) {}


  sideMenuComponent = new SideMenuComponent(this.page);


  transferReceiverInput = this.page.getByTestId('transfer_receiver');
  transferToInput = this.page.getByTestId('form_account_to');
  transferAmountInput = this.page.getByTestId('form_amount');


  transferButton = this.page.getByRole('button', { name: 'wykonaj przelew' });
  actionCloseButton = this.page.getByTestId('close-button');


  messageText = this.page.locator('#show_messages');


  async makeTransfer(transferReceiver: string, transferAccount: string, transferAmount: string): Promise<void> {
    await this.transferReceiverInput.fill(transferReceiver);
    await this.transferToInput.fill(transferAccount);
    await this.transferAmountInput.fill(transferAmount);


    await this.transferButton.click();
    await this.actionCloseButton.click();
  }
}