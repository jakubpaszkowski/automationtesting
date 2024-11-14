// ztf70033@inohm.com
// czyktostoczyta
import { test, expect } from '@playwright/test';
import { LoginPage, AccountPage } from '../pages/sklep-test.page';
import { loginSklepTestData } from '../test-data/login-data';
import { apartmentSuitUnitString, companyNameString, firstNameString, lastNameString, postCodeString, streetAddressString, townCityString } from '../test-data/account-data';

test.describe('User login to sklep-test', () => {
    test.beforeEach (async ({ page }) => {
      const url = 'https://skleptest.pl/my-account/';
      await page.goto(url);
  
      
    });

    test('successful login with correct credentials', async ({ page }) => {

        const userID = loginSklepTestData.userSklepTestId;
        const userPassword = loginSklepTestData.userPasswordSklepTest;
        const expectedUserName = 'Jan Demobankowy';
    
        const loginPage = new LoginPage(page);
        await loginPage.login(userID, userPassword);
        

        await expect(page.getByText('From your account dashboard')).toHaveText(/^From your account dashboard/);
        //   // uzylem regexa /^ aby nie sprawdzal calego zdania zbudowanego z 30 slow, rozjezdza to kod
         await page.getByRole('link', { name: 'Logout' }).click();

    });

    test('making order @login @order', async ({ page }) => {

        const userID = loginSklepTestData.userSklepTestId;
        const userPassword = loginSklepTestData.userPasswordSklepTest;
        const expectedUserName = 'Jan Demobankowy';
    
        const loginPage = new LoginPage(page);
        const accountPage = new AccountPage(page);
        await loginPage.login(userID, userPassword);
        
    
    await page.getByPlaceholder('Search').fill('belt');
    await page.getByPlaceholder('Search').press('Enter');
    await accountPage.itemBelt.click();
    // await page.getByRole('link', { name: 'FITT Belts' }).click();
    // changing quantity of items
    await page.getByRole('link', { name: '' }).click();
    await page.getByRole('link', { name: '' }).click();
    await accountPage.addToCard.click();
    // go to my card section
    await accountPage.myCard.click();
    await accountPage.proceedToCheckout.click();
    await accountPage.firstName.fill(firstNameString);
    await accountPage.lastName.fill(lastNameString);
    await accountPage.companyName.fill(companyNameString);
    // streetAddressString imported from account-data :)
    await accountPage.streetAddress.fill(streetAddressString);
    await accountPage.apartmentSuitUnit.fill(apartmentSuitUnitString);
    await accountPage.postcode.fill(postCodeString);
    await accountPage.townCity.fill(townCityString);
    await accountPage.placeOrder.click();
    // make assertion below
    await expect(page.getByRole('heading', { name: 'Order received' })).toHaveText("Order received");
    await accountPage.accountClick.click();
    await accountPage.logOutClick.click();
    

    });
    
    test('decreasing numbers of items in basket @login @order', async ({ page }) => {

        const userID = loginSklepTestData.userSklepTestId;
        const userPassword = loginSklepTestData.userPasswordSklepTest;
        const expectedUserName = 'Jan Demobankowy';
    
        const loginPage = new LoginPage(page);
        const accountPage = new AccountPage(page);
        await loginPage.login(userID, userPassword);
        
    
    await page.getByPlaceholder('Search').fill('belt');
    await page.getByPlaceholder('Search').press('Enter');
    await accountPage.itemBelt.click();
    // await page.getByRole('link', { name: 'FITT Belts' }).click();
    // changing quantity of items
    await page.getByRole('link', { name: '' }).click();
    await page.getByRole('link', { name: '' }).click();
    await accountPage.addToCard.click();
    // go to my card section
    await accountPage.myCard.click();
    //decreasing quantiny 
    await page.getByRole('link', { name: '' }).click();
    await page.getByRole('link', { name: '' }).click();
    await accountPage.proceedToCheckout.click();
    await accountPage.firstName.fill(firstNameString);
    await accountPage.lastName.fill(lastNameString);
    await accountPage.companyName.fill(companyNameString);
    // streetAddressString imported from account-data :)
    await accountPage.streetAddress.fill(streetAddressString);
    await accountPage.apartmentSuitUnit.fill(apartmentSuitUnitString);
    await accountPage.postcode.fill(postCodeString);
    await accountPage.townCity.fill(townCityString);
    await accountPage.placeOrder.click();
    // make assertion below
    await expect(page.getByRole('heading', { name: 'Order received' })).toHaveText("Order received");
    await accountPage.accountClick.click();
    await accountPage.logOutClick.click();
    });
    
    test('removing items from basket @login @order', async ({ page }) => {

        const userID = loginSklepTestData.userSklepTestId;
        const userPassword = loginSklepTestData.userPasswordSklepTest;
        const expectedUserName = 'Jan Demobankowy';
    
        const loginPage = new LoginPage(page);
        const accountPage = new AccountPage(page);
        await loginPage.login(userID, userPassword);
        
    
    await accountPage.searchBar.fill("belt");
    await accountPage.searchBarClick.click();
    // await accountPage.searchBar.click();
    // await page.getByPlaceholder('Search').fill('belt');
    // await page.getByPlaceholder('Search').press('Enter');
    await accountPage.itemBelt.click();
    // await page.getByRole('link', { name: 'FITT Belts' }).click();
    // changing quantity of items
    await page.getByRole('link', { name: '' }).click();
    await page.getByRole('link', { name: '' }).click();
    await accountPage.addToCard.click();
    // go to my card section
    await accountPage.myCard.click();
    //decreasing quantiny 
    await page.getByRole('link', { name: '' }).click();
    await page.getByRole('link', { name: '' }).click();
    await page.getByLabel('Remove this item').click();
    //assertion
    
    await page.getByText('“FITT Belts” removed. Undo?').click();
    await expect(page.getByText("“FITT Belts” removed. Undo?")).toHaveText(/^/);
    await accountPage.accountClick.click();
    await accountPage.logOutClick.click();

    
    });


    test('using dropdown menu @dropdown', async ({ page }) => {

        const userID = loginSklepTestData.userSklepTestId;
        const userPassword = loginSklepTestData.userPasswordSklepTest;
        const expectedUserName = 'Jan Demobankowy';
    
        const loginPage = new LoginPage(page);
        const accountPage = new AccountPage(page);
        await loginPage.login(userID, userPassword);
        
    
  
        
    // await page.getByLabel('Remove this item').click();
    // await page.getByText('“FITT Belts” removed. Undo?').click();

    // await page.getByRole('link', { name: 'Catergries ' })
 


    await page.locator('#mobile-menu-trigger').click();
    await page.getByRole('link', { name: 'Catergries ' }).hover();
    // await page.getByRole('link', { name: 'Catergries ' }).click();
    await page.getByRole('link', { name: 'Shirts' })
    await expect(page.getByRole('link', { name: 'Shirts' })).toHaveText(/.+/);


       
    });
    test('assertion tests @assertion', async ({ page }) => {

        const userID = loginSklepTestData.userSklepTestId;
        const userPassword = loginSklepTestData.userPasswordSklepTest;
        const expectedUserName = 'Jan Demobankowy';
    
        const loginPage = new LoginPage(page);
        const accountPage = new AccountPage(page);
        await loginPage.login(userID, userPassword);
        
    
  
        
    // await page.getByLabel('Remove this item').click();
    // await page.getByText('“FITT Belts” removed. Undo?').click();

    // await page.getByRole('link', { name: 'Catergries ' })
 


    await page.locator('#mobile-menu-trigger').click();
    await page.getByRole('link', { name: 'Catergries ' }).hover();
    // await page.getByRole('link', { name: 'Catergries ' }).click();
    await page.getByRole('link', { name: 'Shirts' })
    await expect(page.getByRole('link', { name: 'Shirts' })).toBeHidden();
    // toHaveText("");


    
    await page.getByRole('link', { name: 'Generic Shop' }).click();
    // await page.getByRole('link', { name: 'Most Wanted' }).click();
    await expect(page.getByRole('heading', { name: 'Most Wanted' })).toHaveText(/.+/);
    // await page.getByRole('heading', { name: 'Most Wanted' }).click();
    await page.getByRole('link', { name: 'About Us' }).click();
    await expect(page.getByRole('heading', { name: 'Contact' })).toHaveText(/.+/);
    // await page.getByRole('heading', { name: 'Contact' }).click();
    await page.getByRole('link', { name: 'Blog' }).click();
    await expect(page.getByRole('heading', { name: 'Nothing Found' })).toHaveText(/.+/);
    // await page.getByRole('heading', { name: 'Nothing Found' }).click();


       
    });

});