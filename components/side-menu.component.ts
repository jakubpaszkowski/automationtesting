import { Locator, Page } from "@playwright/test";

export class SideMenuComponent {
    
    paymentButton: Locator;
    paymentLink: any;

    constructor(private page: Page) {
    
    this.paymentButton = this.page.getByRole('link', { name: 'płatności' }); 

    
    }
}