import { test, expect, Page  } from '@playwright/test';
import { loginData, loginWebuiData, userWebuiID } from '../test-data/login-data';
import { LoginPage, LoginPageWebui } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';



// obiekt expect pomaga Nam tworzenie asercję 
// czyli sprawdzamy czy wymagany warunek jest spełniony


const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const currentTime = `${hours}:${minutes}:${seconds}`;

  // Tworzymy ciąg znaków do wprowadzenia
  
test.describe('User login to WebUI', () => {



  test.use({ ignoreHTTPSErrors: true, })
  

  test('test Logowania', async ({ page }) => {
    const userID = 'superadminek';
    const password = '12345678';
    const passwordWebui = '12345678';
    await page.goto('https://10.10.15.164:8443/');

    const loginPage = new LoginPageWebui(page);
    await loginPage.loginInput.fill(userID);
    await loginPage.passwordInput.fill(passwordWebui);
    await loginPage.loginButton.click();

    
    // teraz to co niżej zrobic POM:

    await loginPage.loginDropDownMenu.click();
    await loginPage.loginChooseAdmin.click();
    await loginPage.loginCustomFormFinish.click();
    await loginPage.loginAsMandcops.click();
    // await page.locator('label').filter({ hasText: 'mandcops' }).locator('span').nth(2).click();
    await loginPage.loginButtonToJoinAsRole.click();
    await loginPage.loginButtonClickOk.click();




    await page.locator('p').filter({ hasText: 'Run-Time Management' }).click();
    await page.getByText('Monitoring').click();
    await page.getByRole('button', { name: '+New widget' }).click();
    await page.locator('#AddWidgetModal-nameInput').click();
    await page.locator('#AddWidgetModal-nameInput').fill('stack');
    await page.locator('.new-widget-modal-select > .egs-cc-components-Select__control > .egs-cc-components-Select__value-container > .egs-cc-components-Select__input-container').click();
    await page.locator('#react-select-4-input').fill('stac');
    await page.getByText('Activity Stack', { exact: true }).click();
    await page.locator('#AddWidgetModal-nameInput').click();
    await page.locator('#AddWidgetModal-nameInput').fill('stack1');
    await page.getByRole('button', { name: 'ADD' }).click();
    await page.getByRole('button', { name: 'SEARCH ' }).click();
    await page.getByLabel('TreeSearch').getByLabel('SearchBar-input').click();
    await page.getByLabel('TreeSearch').getByLabel('SearchBar-input').fill('act_ping');
    await page.getByText('ACT_PING', { exact: true }).click();
    await page.getByRole('button', { name: '利 ACT_PING', exact: true }).press('Shift+F10');
    await page.getByText('Add to stack').click();
    await page.locator('#egs-cc-components-ActivityModal-routeId > .egs-cc-components-Select__control > .egs-cc-components-Select__value-container > .egs-cc-components-Select__input-container').click();
    await page.getByLabel('CustomModal-body').getByText('CnC', { exact: true }).click();
    await page.locator('div:nth-child(7) > div:nth-child(2) > .col-sm-10 > label:nth-child(2) > .egs-cc-components-RadioButton-outerCircle > .egs-cc-components-RadioButton-inside').click();
    await page.getByRole('textbox').first().click();
    await page.getByRole('textbox').first().fill('3');
    await page.getByPlaceholder('2025-02-02 02:02:02.000').click();
    // tu nie przejdzzie wpisywnai tekstu xd nie mam czsau na rozpracowanie tego
    await page.getByRole('button', { name: 'ADD TO STACK' }).click();

  });

  test.use({ ignoreHTTPSErrors: true, })
  test('zmiana_sesji', async ({ page }) => {
    await page.goto('https://10.10.15.164:8443/');

    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').fill('s');
    await page.locator('input[type="password"]').click();
    //test dla commita
    await page.locator('input[type="password"]').fill('12345678');
    await page.locator('input[type="password"]').press('Enter');
    await page.locator('.egs-cc-components-Select__input-container').click();
    await page.getByText('Admin', { exact: true }).click();
    await page.getByLabel('CustomForm-finish').click();
    await page.locator('label').filter({ hasText: 'mandcops' }).locator('span').nth(2).click();
    await page.getByRole('button', { name: 'JOIN' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.locator('p').filter({ hasText: 'Run-Time Management' }).click();
    await page.locator('.egs-cc-components-CustomTree-row').click();
    await page.locator('div').filter({ hasText: /^preparation$/ }).nth(3).click();
    await page.locator('div').filter({ hasText: /^preparation$/ }).nth(1).press('Shift+F10');
    await page.getByRole('button', { name: 'Join' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.getByRole('button', { name: 's/Admin preparation ' }).click();
    // await page.getByLabel('s/Adminpreparation').getByText('preparation').click();
    await expect(page.locator('#nav-dropdown-session')).toHaveText('preparation');
  });


  test.use({ ignoreHTTPSErrors: true, })
  test('stworzenie activity stacka', async ({ page }) => {
    const userID = 'ssuperadminek';
    const password = '12345678';
    const textToEnter = `activitystack- ${currentTime}`;

    // await page.addLocatorHandler(page.getByText('Abort or delegate procedures×CloseThere are still running procedures. Abort'), async () => {
    //   await page.getByTestId('egs-cc-components-RunningProceduresControlModal-cell--abort').getByTestId('checkbox-checkmark').click();
    //   await page.getByRole('button', { name: 'Confirm' }).click();
    // });

    // Setup the handler.
// await page.addLocatorHandler(page.getByText('Abort or delegate procedures×CloseThere are still running procedures. Abort'), async () => {
//   // Click the checkbox to abort the procedure
//   await page.getByTestId('egs-cc-components-RunningProceduresControlModal-cell--abort').getByTestId('checkbox-checkmark').click();
  
//   // Click the Confirm button
//   await page.getByRole('button', { name: 'Confirm' }).click();
// });
    
    // Function to handle popup
  // async function handlePopupIfPresent() {
  //   const popup = await page.$('text=Abort or delegate procedures×CloseThere are still running procedures. Abort');
  //   if (popup) {
  //     await page.getByTestId('egs-cc-components-checkbox-checkmark').getByTestId('checkbox-checkmark').click();
  //     await page.getByRole('button', { name: 'Confirm' }).click();
  //   }
  // }

  // Continuously check for the popup while running the test
  // async function continuouslyCheckForPopup() {
  //   while (true) {
  //     await handlePopupIfPresent();
  //     await page.waitForTimeout(500); // Adjust the interval as needed
  //   }
  // }

  // // Start the background task
  // continuouslyCheckForPopup();



    // Function to handle popup
  
   

  // // Continuously check for the popup while running the test
  // async function continuouslyCheckForPopup() {
  //   while (true) {
  //     await handlePopupIfPresent();
  //     await page.waitForTimeout(500); // Adjust the interval as needed
  //   }
  // }

  // // Start the background task
  // continuouslyCheckForPopup();
  
    await page.goto('http://localhost:3222');
    // await page.goto('chrome-error://chromewebdata/');
    // await page.getByText('ERR_CONNECTION_REFUSED').click();
    // await page.getByText('ERR_CONNECTION_REFUSED').click();
    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').fill(userWebuiID);
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill(password);
    await page.locator('input[type="password"]').press('Enter');
    await page.locator('.egs-cc-components-Select__input-container').click();
    await page.getByText('Admin', { exact: true }).click();
    await page.getByLabel('CustomForm-finish').click();
    await page.getByText('mandcops').click();
    await page.getByRole('button', { name: 'JOIN' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.locator('#egs-cc-components-PerspectiveList i').click();
      //  await page.locator('egs-cc-components-CustomSelect-title').click();

    // await page.getByText('Monitoring').click();
    await page.getByText('PUS').click();
    await page.locator('#egs-cc-components-PerspectiveList i').click();
    await page.getByText('Monitoring').click();
    await page.getByRole('button', { name: '+New widget' }).click();
    await page.locator('#AddWidgetModal-nameInput').click();

    // // Znajdujemy element input i wprowadzamy do niego ciąg znaków
    //await page.fill('#input-element-selector', textToEnter);

    await page.locator('#AddWidgetModal-nameInput').fill(textToEnter);
    await page.locator('#AddWidgetModal-nameInput').press('Tab');
    await page.locator('.new-widget-modal-select > .egs-cc-components-Select__control > .egs-cc-components-Select__value-container > .egs-cc-components-Select__input-container').click();
    await page.getByText('Activity Stack', { exact: true }).click();
    await page.locator('div').filter({ hasText: /^ADD$/ }).click();
    await page.getByRole('button', { name: 'ADD' }).click();

    //save global cofiguration
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('button', { name: 'Close all' }).click();

    //probujemy dodac act_ping do stacka

    await page.getByRole('button', { name: 'SEARCH ' }).click();
    await page.getByLabel('TreeSearch').getByLabel('SearchBar-input').click();
    await page.getByLabel('TreeSearch').getByLabel('SearchBar-input').fill('act_ping');
    await page.getByText('ACT_PING', { exact: true }).click();

    await page.getByRole('button', { name: '利 ACT_PING', exact: true }).press('Shift+F10');
    await page.getByText('Add to stack').click();
    await page.locator('#egs-cc-components-ActivityModal-routeId > .egs-cc-components-Select__control > .egs-cc-components-Select__value-container > .egs-cc-components-Select__input-container').click();
    await page.getByLabel('CustomModal-body').getByText('CnC', { exact: true }).click();
    await page.locator('div:nth-child(7) > div:nth-child(2) > .col-sm-10 > label:nth-child(2) > .egs-cc-components-RadioButton-outerCircle > .egs-cc-components-RadioButton-inside').click();
    await page.getByRole('textbox').first().click();
    await page.getByRole('textbox').first().fill('3');
    
    await page.getByRole('button', { name: 'ADD TO STACK' }).click();
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('button', { name: 'Close all' }).click();
    
    await page.getByRole('button', { name: 's/Admin mandcops ' }).click();
    await page.getByRole('button', { name: ' Log out' }).click();

    const popup = await page.$('text=Abort or delegate procedures×CloseThere are still running procedures. Abort');
    if (popup) {
      await page.getByTestId('egs-cc-components-RunningProceduresControlModal-cell--abort').getByTestId('checkbox-checkmark').click();
      await page.getByRole('button', { name: 'Confirm' }).click();
    }
  
   

  });

  test.use({ ignoreHTTPSErrors: true, })
//   test('stworzenie activity stacka2', async ({ page }) => {
//     const userID = 's';
//     const password = '12345678';
//     const textToEnter = `activitystack- ${currentTime}`;

//     // Function to handle popup
//     async function handlePopupIfPresent() {
//         const popup = await page.$('text=Abort or delegate procedures×CloseThere are still running procedures. Abort');
//         if (popup) {
//             await page.getByTestId('egs-cc-components-RunningProceduresControlModal-cell--abort').getByTestId('checkbox-checkmark').click();
//             await page.getByRole('button', { name: 'Confirm' }).click();
//         }
//     }

//     // Start a background task to check for the popup every 500ms
//     const intervalId = setInterval(async () => {
//         await handlePopupIfPresent();
//     }, 500);

//     try {
//         await page.goto('https://10.10.15.164:8443/');
//         await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').click();
//         await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').fill(userID);
//         await page.locator('input[type="password"]').click();
//         await page.locator('input[type="password"]').fill(password);
//         await page.locator('input[type="password"]').press('Enter');
//         await page.locator('.egs-cc-components-Select__input-container').click();
//         await page.getByText('Admin', { exact: true }).click();
//         await page.getByLabel('CustomForm-finish').click();
//         await page.getByText('mandcops').click();
//         await page.getByRole('button', { name: 'JOIN' }).click();
//         await page.getByRole('button', { name: 'OK' }).click();
//         await page.locator('#egs-cc-components-PerspectiveList i').click();
//         await page.getByText('Run-Time Management').click();
//         await page.locator('#egs-cc-components-PerspectiveList i').click();
//         await page.getByText('Monitoring').click();
//         await page.getByRole('button', { name: '+New widget' }).click();
//         await page.locator('#AddWidgetModal-nameInput').click();
//         await page.locator('#AddWidgetModal-nameInput').fill(textToEnter);
//         await page.locator('#AddWidgetModal-nameInput').press('Tab');
//         await page.locator('.new-widget-modal-select > .egs-cc-components-Select__control > .egs-cc-components-Select__value-container > .egs-cc-components-Select__input-container').click();
//         await page.getByText('Activity Stack', { exact: true }).click();
//         await page.locator('div').filter({ hasText: /^ADD$/ }).click();
//         await page.getByRole('button', { name: 'ADD' }).click();
//         await page.getByRole('button', { name: '' }).click();
//         await page.getByRole('button', { name: 'Close all' }).click();
//         await page.getByRole('button', { name: 's/Admin mandcops ' }).click();
//         await page.getByRole('button', { name: ' Log out' }).click();
//     } finally {
//         // Clear the interval when the test is done
//         clearInterval(intervalId);
//     }
// });
  test.use({ ignoreHTTPSErrors: true, })
  test('uzycie strzalek w activity logu', async ({ page }) => {
    const userID = 'superadminek';
    const password = '12345678';

    await page.goto('http://localhost:3222/');
    // await page.goto('chrome-error://chromewebdata/');
    // await page.getByText('ERR_CONNECTION_REFUSED').click();
    // await page.getByText('ERR_CONNECTION_REFUSED').click();
    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').fill(userID);
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill(password);
    await page.locator('input[type="password"]').press('Enter');
    await page.locator('.egs-cc-components-Select__input-container').click();
    await page.getByText('Admin', { exact: true }).click();
    await page.getByLabel('CustomForm-finish').click();
    await page.getByText('mandcops').click();
    await page.getByRole('button', { name: 'JOIN' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    // await page.getByText('Activities Log').first().click();
    // await page.getByRole('button', { name: '' }).click();
    // await page.getByRole('button', { name: '' }).click();
    await page.locator('#egs-cc-components-CustomForm-dataLimit').click();
    await page.locator('#egs-cc-components-CustomForm-dataLimit').fill('106');
    await page.getByLabel('CustomForm-finish').click();
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('button', { name: '' }).click();
    // tu asercja
    await expect(page.locator('#Toastify__toast-body')).toHaveText('Global configuration was saved');
    // await page.getByText('Global configuration was saved').click();

    await page.getByRole('button', { name: 's/Admin mandcops ' }).click();
    await page.getByRole('button', { name: ' Leave session' }).click();
    await page.getByTestId('egs-cc-components-RunningProceduresControlModal-cell--abort').getByTestId('checkbox-checkmark').click();
    await page.getByRole('button', { name: 'Confirm' }).click();
    await page.locator('.egs-cc-components-CustomTree-row').click();
    await page.getByText('mandcops', { exact: true }).click();
    await page.locator('div').filter({ hasText: /^mandcops$/ }).nth(1).press('Shift+F10');
    await page.getByRole('button', { name: 'Join' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.locator('#ACTIVITIES_LOG_DISPLAY-Activities_Log').getByText('Activities Log').click();

  });






  // test('test', async ({ page }) => {
  test.use({ ignoreHTTPSErrors: true, })
  test('asercja typu udd czy synoptic czy generic', async ({ page }) => {
    const userID = 'ssuperadminek';
    const password = '12345678';

    await page.goto('http://localhost:3222/');
    // await page.goto('chrome-error://chromewebdata/');
    // await page.getByText('ERR_CONNECTION_REFUSED').click();
    // await page.getByText('ERR_CONNECTION_REFUSED').click();
    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').fill(userID);
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill(password);
    await page.locator('input[type="password"]').press('Enter');
    await page.locator('.egs-cc-components-Select__input-container').click();
    await page.getByText('Admin', { exact: true }).click();
    await page.getByLabel('CustomForm-finish').click();
    await page.getByText('mandcops').click();
    await page.getByRole('button', { name: 'JOIN' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.locator('#egs-cc-components-PerspectiveList i').click();
      //  await page.locator('egs-cc-components-CustomSelect-title').click();

    await page.getByText('Monitoring').click();
    // await page.getByLabel('Monitoring').getByText('Monitoring').click();
    await page.getByText('UDD Browser').click();
    await page.getByTitle('Create new UDD or folder').click();
    await page.getByRole('button', { name: 'Create new Udd' }).click();
    await page.getByLabel('Udd name:').click();
    await page.getByLabel('Udd name:').fill('synoptic-udd-11');
    await page.getByLabel('CustomModal-body').locator('div').filter({ hasText: /^LOCAL$/ }).nth(1).click();
    await page.getByLabel('CustomForm-finish').click();
    await page.getByTitle('Create new UDD or folder').click();
    // await page.getByRole('button', { name: '' }).click();
    // await page.getByRole('button', { name: 'Create new Udd' }).click();
    // await page.getByRole('button', { name: '' }).click();
    await page.getByRole('button', { name: 'Create new Udd' }).click();
    await page.locator('div').filter({ hasText: /^Synoptic$/ }).nth(2).click();
    await page.getByText('Generic', { exact: true }).click();
    await page.getByLabel('Udd name:').click();
    await page.getByLabel('Udd name:').fill('generic-udd-11');
    await page.getByLabel('CustomModal-body').getByText('LOCAL', { exact: true }).click();
    await page.getByLabel('CustomForm-finish').click();
    await page.getByTitle('Create new UDD or folder').click();
    // await page.getByRole('button', { name: '' }).click();
    await page.getByRole('button', { name: 'Create new Udd' }).click();
    await page.getByLabel('Udd name:').click();
    await page.getByLabel('Udd name:').fill('synoptic-udd-6');
    await page.getByLabel('CustomModal-body').getByText('LOCAL', { exact: true }).click();
    await page.getByLabel('CustomForm-finish').click();
    // tu asercja czy jest generic typ czy synoptic:
    // await expect(page.locator('egs-cc-components-SynopticDisplay-label egs-cc-components-SynopticDisplay-genericUddLabel')).toHaveText('');
    // await page.getByText('GENERIC', { exact: true }).click();
    await expect(page.locator('#LOCAL_synoptic-udd-21_Synoptic')).toHaveText('LOCAL/synoptic-udd-21.Synoptic');
    await expect(page.locator('#SYNOPTIC_DISPLAY-synopticudd21')).toHaveText('GENERIC');



    // await page.locator('#SYNOPTIC_DISPLAY-synopticudd21').getByText('GENERIC').click();
    // await page.getByText('synoptic-udd-21.SynopticNEW').click();
    // await page.locator('div').filter({ hasText: /^synoptic-udd-21\.SynopticNEW$/ }).nth(2).press('Shift+F10');
    // await page.getByRole('button', { name: 'Delete' }).click();
    // await page.getByRole('button', { name: 'OK' }).click();
    // await page.getByText('synoptic-udd-11.SynopticNEW').click();
    // await page.locator('div').filter({ hasText: /^synoptic-udd-11\.SynopticNEW$/ }).nth(2).press('Shift+F10');
    // await page.getByRole('button', { name: 'Delete' }).click();
    // await page.getByRole('button', { name: 'OK' }).click();
    // await page.getByText('generic-udd-11.Generic.').click();
    // await page.locator('div').filter({ hasText: /^generic-udd-11\.Generic\.SynopticNEWGENERIC$/ }).nth(2).press('Shift+F10');
    // await page.getByRole('button', { name: 'Delete' }).click();
    // await page.getByRole('button', { name: 'OK' }).click();

  });


  test.use({ ignoreHTTPSErrors: true, })
  
  test('stworzenie folderu na udd w session', async ({ page }) => {
    const password = '12345678';
    const userID = 'superadminek';
    await page.goto('http://localhost:3222/');
    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').fill('s');
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill('12345678');
    await page.locator('input[type="password"]').press('Enter');
    await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(1).click();
    await page.getByText('Admin', { exact: true }).click();
    await page.getByLabel('CustomForm-finish').click();
    await page.locator('label').filter({ hasText: 'mandcops' }).locator('span').nth(2).click();
    await page.getByRole('button', { name: 'JOIN' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.locator('p').filter({ hasText: 'Run-Time Management' }).click();
    await page.getByText('Monitoring').click();
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('button', { name: 'Create new folder' }).click();
    await page.getByLabel('Name:').click();
    await page.getByLabel('Name:').fill('uddss');
    await page.getByLabel('CustomModal-body').getByText('SESSION [mandcops]').click();
    await page.getByLabel('CustomForm-finish').click();
    await page.getByRole('button', { name: 's/Admin mandcops ' }).click();
    await page.getByRole('button', { name: ' Log out' }).click();

    


  });


  test('stworzenie alphanumeric', async ({ page }) => {
    const password = '12345678';
    const userID = 'superadminek';
  //   await page.goto('http://localhost:3222/');

  //   await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').click();
  //   await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').fill(userID);
  //   await page.locator('input[type="password"]').click();
  //   await page.locator('input[type="password"]').fill(password);
  //   await page.locator('input[type="password"]').press('Enter');
  //   await page.locator('.egs-cc-components-Select__input-container').click();
  //   await page.getByText('Admin', { exact: true }).click();
  //   await page.getByLabel('CustomForm-finish').click();
  //   await page.locator('label').filter({ hasText: 'mandcops' }).locator('span').nth(2).click();
  //   await page.getByRole('button', { name: 'JOIN' }).click();
  //   await page.getByRole('button', { name: 'OK' }).click();
  //   await page.locator('p').filter({ hasText: 'Run-Time Management' }).click();
  //   await page.getByText('Monitoring').click();
  // //   await page.getByRole('button', { name: '+New widget' }).click();
  
  // // await page.locator('#egs-cc-components-PerspectiveList i').click();
  // // await page.getByText('Monitoring').click();
  // await page.getByRole('button', { name: '+New widget' }).click();
  // await page.locator('#AddWidgetModal-nameInput').click();
  // await page.locator('#AddWidgetModal-nameInput').fill('alphanumeric6');
  // await page.getByRole('button', { name: 'ADD' }).click();
  // await page.getByLabel('ButtonWithHotKey').click();
  // await page.goto('http://localhost:3222/');
  // await page.goto('chrome-error://chromewebdata/');
  // await page.getByRole('button', { name: 'Zaawansowane' }).click();
  // await page.locator('#final-paragraph').click();
  // await page.getByRole('link', { name: 'Otwórz stronę 10.10.15.164 (' }).click();
  await page.goto('http://localhost:3222/');
  await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').fill('s');
  await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').press('Tab');
  await page.locator('input[type="password"]').fill('12345678');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.locator('.egs-cc-components-Select__input-container').click();
  await page.getByText('Admin', { exact: true }).click();
  await page.getByLabel('CustomForm-finish').click();
  await page.getByText('mandcops').click();
  await page.getByRole('button', { name: 'JOIN' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.locator('#egs-cc-components-PerspectiveList i').click();
  await page.getByText('Monitoring').click();
  await page.getByRole('button', { name: '+New widget' }).click();
  await page.locator('#AddWidgetModal-nameInput').click();
  await page.locator('#AddWidgetModal-nameInput').fill('matrixalphanumeric8');
  await page.locator('.egs-cc-components-Select__input-container').click();
  await page.getByText('Matrix Alphanumeric', { exact: true }).click();
  await page.getByRole('button', { name: 'ADD' }).click();
  await page.getByLabel('ButtonWithHotKey').click();
  await page.getByLabel('CustomModal-body').getByText('LOCAL', { exact: true }).click();
  await page.getByLabel('CustomForm-finish').click();
  await page.getByRole('paragraph').click();
  await page.getByText('Run-Time Management').click();
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('button', { name: 'Close all' }).click();
  await page.getByRole('button', { name: 's/Admin mandcops ' }).click();
  await page.getByRole('button', { name: ' Log out' }).click();
  // await page.locator('div').filter({ hasText: /^LOCAL$/ }).nth(1).click();
  // await page.getByLabel('CustomForm-finish').click();


  });

  test('stworzenie matrixalphanumeric', async ({ page }) => {
    const password = '12345678';
    const userID = 'superadminek';
    await page.goto('http://localhost:3222/');

    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').fill(userID);
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill(password);
    await page.locator('input[type="password"]').press('Enter');
    await page.locator('.egs-cc-components-Select__input-container').click();
    await page.getByText('Admin', { exact: true }).click();
    await page.getByLabel('CustomForm-finish').click();
    await page.locator('label').filter({ hasText: 'mandcops' }).locator('span').nth(2).click();
    await page.getByRole('button', { name: 'JOIN' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.locator('p').filter({ hasText: 'Run-Time Management' }).click();
    await page.getByText('Monitoring').click();
  //   await page.getByRole('button', { name: '+New widget' }).click();
  
  // await page.locator('#egs-cc-components-PerspectiveList i').click();
  // await page.getByText('Monitoring').click();
  await page.getByRole('button', { name: '+New widget' }).click();
  await page.locator('.new-widget-modal-select > .egs-cc-components-Select__control > .egs-cc-components-Select__value-container > .egs-cc-components-Select__input-container').click();
  await page.getByText('Matrix Alphanumeric', { exact: true }).click();
  await page.locator('#AddWidgetModal-nameInput').click();
  await page.locator('#AddWidgetModal-nameInput').fill('matrixalphanumeric6');
  await page.getByRole('button', { name: 'ADD' }).click();
  await page.getByLabel('ButtonWithHotKey').click();
  await page.locator('div').filter({ hasText: /^LOCAL$/ }).nth(1).click();
  await page.getByLabel('CustomForm-finish').click();


  });

  test('stworzenie scrolla', async ({ page }) => {
    const password = '12345678';
    const userID = 'superadminek';
    await page.goto('http://localhost:3222/');

    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').fill(userID);
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill(password);
    await page.locator('input[type="password"]').press('Enter');
    await page.locator('.egs-cc-components-Select__input-container').click();
    await page.getByText('Admin', { exact: true }).click();
    await page.getByLabel('CustomForm-finish').click();
    await page.locator('label').filter({ hasText: 'mandcops' }).locator('span').nth(2).click();
    await page.getByRole('button', { name: 'JOIN' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.locator('p').filter({ hasText: 'Run-Time Management' }).click();
    await page.getByText('Monitoring').click();
  //   await page.getByRole('button', { name: '+New widget' }).click();
  
  // await page.locator('#egs-cc-components-PerspectiveList i').click();
  // await page.getByText('Monitoring').click();
  await page.getByRole('button', { name: '+New widget' }).click();
  await page.locator('.new-widget-modal-select > .egs-cc-components-Select__control > .egs-cc-components-Select__value-container > .egs-cc-components-Select__input-container').click();
  await page.getByText('Scroll', { exact: true }).click();
  await page.locator('#AddWidgetModal-nameInput').click();
  await page.locator('#AddWidgetModal-nameInput').fill('scroll6');
  await page.getByRole('button', { name: 'ADD' }).click();
  await page.getByLabel('ButtonWithHotKey').click();
  await page.locator('div').filter({ hasText: /^LOCAL$/ }).nth(1).click();
  await page.getByLabel('CustomForm-finish').click();


  });

  test('stworzenie timeline', async ({ page }) => {
    const password = '12345678';
    const userID = 'superadminek';
    await page.goto('http://localhost:3222/');

    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').fill(userID);
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill(password);
    await page.locator('input[type="password"]').press('Enter');
    await page.locator('.egs-cc-components-Select__input-container').click();
    await page.getByText('Admin', { exact: true }).click();
    await page.getByLabel('CustomForm-finish').click();
    await page.locator('label').filter({ hasText: 'mandcops' }).locator('span').nth(2).click();
    await page.getByRole('button', { name: 'JOIN' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.locator('p').filter({ hasText: 'Run-Time Management' }).click();
    // await page.locator('p').filter({ hasText: 'Monitoring' }).click();
    await page.getByText('Monitoring').click();
  //   await page.getByRole('button', { name: '+New widget' }).click();
  
  // await page.locator('#egs-cc-components-PerspectiveList i').click();
  // await page.getByText('Monitoring').click();
  await page.getByRole('button', { name: '+New widget' }).click();
  await page.locator('.new-widget-modal-select > .egs-cc-components-Select__control > .egs-cc-components-Select__value-container > .egs-cc-components-Select__input-container').click();
  await page.getByText('Timeline', { exact: true }).click();
  await page.locator('#AddWidgetModal-nameInput').click();
  await page.locator('#AddWidgetModal-nameInput').fill('timeline6');
  await page.getByRole('button', { name: 'ADD' }).click();
  await page.getByRole('button', { name: '' }).click();
  await page.locator('p').filter({ hasText: 'Monitoring' }).click();
  await page.getByText('Run-Time Management').click();
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('button', { name: 's/Admin' }).click();
  await page.getByRole('button', { name: ' Log out' }).click();


  });



  test('stworzenie timeseries', async ({ page }) => {
    const password = '12345678';
    const userID = 'superadminek';
    await page.goto('http://localhost:3222/');

    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').fill(userID);
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill(password);
    await page.locator('input[type="password"]').press('Enter');
    await page.locator('.egs-cc-components-Select__input-container').click();
    await page.getByText('Admin', { exact: true }).click();
    await page.getByLabel('CustomForm-finish').click();
    await page.locator('label').filter({ hasText: 'mandcops' }).locator('span').nth(2).click();
    await page.getByRole('button', { name: 'JOIN' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.locator('p').filter({ hasText: 'Run-Time Management' }).click();
    await page.getByText('Monitoring').click();
  //   await page.getByRole('button', { name: '+New widget' }).click();
  
  // await page.locator('#egs-cc-components-PerspectiveList i').click();
  // await page.getByText('Monitoring').click();
  await page.getByRole('button', { name: '+New widget' }).click();
  await page.locator('.new-widget-modal-select > .egs-cc-components-Select__control > .egs-cc-components-Select__value-container > .egs-cc-components-Select__input-container').click();
  await page.getByText('Timeseries', { exact: true }).click();
  await page.locator('#AddWidgetModal-nameInput').click();
  await page.locator('#AddWidgetModal-nameInput').fill('timeseries6');
  await page.getByRole('button', { name: 'ADD' }).click();
  await page.getByLabel('ButtonWithHotKey').click();
  await page.locator('div').filter({ hasText: /^LOCAL$/ }).nth(1).click();
  await page.getByLabel('CustomForm-finish').click();
  await page.locator('#egs-cc-components-PerspectiveList i').click();
  await page.getByLabel('Run-Time Management').getByText('Run-Time Management').click();
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('button', { name: 's/Admin' }).click();
  await page.getByRole('button', { name: ' Log out' }).click();
  


  });


  test('stworzenie xyzPlot', async ({ page }) => {
    const password = '12345678';
    const userID = 'superadminek';
    await page.goto('http://localhost:3222/');

    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').fill(userID);
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill(password);
    await page.locator('input[type="password"]').press('Enter');
    await page.locator('.egs-cc-components-Select__input-container').click();
    await page.getByText('Admin', { exact: true }).click();
    await page.getByLabel('CustomForm-finish').click();
    await page.locator('label').filter({ hasText: 'mandcops' }).locator('span').nth(2).click();
    await page.getByRole('button', { name: 'JOIN' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.locator('p').filter({ hasText: 'Run-Time Management' }).click();
    await page.getByText('Monitoring').click();
  //   await page.getByRole('button', { name: '+New widget' }).click();
  
  // await page.locator('#egs-cc-components-PerspectiveList i').click();
  // await page.getByText('Monitoring').click();
  await page.getByRole('button', { name: '+New widget' }).click();
  await page.locator('.new-widget-modal-select > .egs-cc-components-Select__control > .egs-cc-components-Select__value-container > .egs-cc-components-Select__input-container').click();
  await page.getByText('XYZ Plot', { exact: true }).click();
  await page.locator('#AddWidgetModal-nameInput').click();
  await page.locator('#AddWidgetModal-nameInput').fill('xyzPlot6');
  await page.getByRole('button', { name: 'ADD' }).click();
  await page.getByLabel('ButtonWithHotKey').click();
  await page.locator('div').filter({ hasText: /^LOCAL$/ }).nth(1).click();
  await page.getByLabel('CustomForm-finish').click();


  });
  // uddki:
  // await page.getByRole('dialog').locator('svg').click();
  // await page.getByText('Matrix Alphanumeric', { exact: true }).click();
  // await page.getByRole('dialog').locator('svg').click();
  // await page.getByText('Scroll', { exact: true }).click();
  // await page.getByRole('dialog').locator('svg').click();
  // await page.getByText('Timeline', { exact: true }).click();
  // await page.getByText('Timeseries', { exact: true }).click();
  // await page.getByRole('dialog').locator('svg').first().click();
  // await page.getByText('XYZ Plot', { exact: true }).click();
  // await page.locator('#react-select-4-input').click();
  test.use({ignoreHTTPSErrors: true,})
  const userID = 'superadminek';
  const password = '12345678';
  
  test('test', async ({ page }) => {
    await page.goto('http://localhost:8181/');
    
    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').fill(userID);
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').fill(password);
    await page.locator('input[type="password"]').press('Enter');
    await page.locator('.egs-cc-components-Select__input-container').click();
    await page.getByText('Admin', { exact: true }).click();
    await page.getByLabel('CustomForm-finish').click();
    await page.locator('label').filter({ hasText: 'mandcops' }).locator('span').nth(2).click();
    await page.getByRole('button', { name: 'JOIN' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.locator('p').filter({ hasText: 'Run-Time Management' }).click();
    await page.getByText('Monitoring').click();
    await page.getByRole('button', { name: '+New widget' }).click();
    await page.locator('#AddWidgetModal-nameInput').click();
    await page.locator('#AddWidgetModal-nameInput').fill('stack');
    await page.locator('.new-widget-modal-select > .egs-cc-components-Select__control > .egs-cc-components-Select__value-container > .egs-cc-components-Select__input-container').click();
    await page.locator('#react-select-4-input').fill('stac');
    await page.getByText('Activity Stack', { exact: true }).click();
    await page.locator('#AddWidgetModal-nameInput').click();
    await page.locator('#AddWidgetModal-nameInput').fill('stack1');
    await page.getByRole('button', { name: 'ADD' }).click();
    await page.getByRole('button', { name: 'SEARCH ' }).click();
    await page.getByLabel('TreeSearch').getByLabel('SearchBar-input').click();
    await page.getByLabel('TreeSearch').getByLabel('SearchBar-input').fill('act_ping');
    await page.getByText('ACT_PING', { exact: true }).click();
    await page.getByRole('button', { name: '利 ACT_PING', exact: true }).press('Shift+F10');
    await page.getByText('Add to stack').click();
    await page.locator('#egs-cc-components-ActivityModal-routeId > .egs-cc-components-Select__control > .egs-cc-components-Select__value-container > .egs-cc-components-Select__input-container').click();
    await page.getByLabel('CustomModal-body').getByText('CnC', { exact: true }).click();
    await page.locator('div:nth-child(7) > div:nth-child(2) > .col-sm-10 > label:nth-child(2) > .egs-cc-components-RadioButton-outerCircle > .egs-cc-components-RadioButton-inside').click();
    await page.getByRole('textbox').first().click();
    await page.getByRole('textbox').first().fill('3');
    await page.getByPlaceholder('2025-02-02 02:02:02.000').click();
    // tu nie przejdzzie wpisywnai tekstu xd nie mam czsau na rozpracowanie tego
    await page.getByRole('button', { name: 'ADD TO STACK' }).click();
   
  });

  test.use({ignoreHTTPSErrors: true,})
  test('zmiana_sesji', async ({ page }) => {
    await page.goto('http://localhost:8181/');

    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').fill('superadmin');
    await page.locator('input[type="password"]').click();
    //test dla commita
    await page.locator('input[type="password"]').fill('12345678');
    await page.locator('input[type="password"]').press('Enter');
    await page.locator('.egs-cc-components-Select__input-container').click();
    await page.getByText('Admin', { exact: true }).click();
    await page.getByLabel('CustomForm-finish').click();
    await page.locator('label').filter({ hasText: 'mandcops' }).locator('span').nth(2).click();
    await page.getByRole('button', { name: 'JOIN' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.locator('p').filter({ hasText: 'Run-Time Management' }).click();
    await page.locator('.egs-cc-components-CustomTree-row').click();
    await page.locator('div').filter({ hasText: /^preparation$/ }).nth(3).click();
    await page.locator('div').filter({ hasText: /^preparation$/ }).nth(1).press('Shift+F10');
    await page.getByRole('button', { name: 'Join' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.getByRole('button', { name: 's/Admin preparation ' }).click();
    // await page.getByLabel('s/Adminpreparation').getByText('preparation').click();
    await expect(page.locator('#nav-dropdown-session')).toHaveText('preparation');
  });


  test.use({ignoreHTTPSErrors: true,})
  test('stworzenie activity stacka', async ({ page }) => {
  await page.goto('http://localhost:8181/');
  // await page.goto('chrome-error://chromewebdata/');
  // await page.getByText('ERR_CONNECTION_REFUSED').click();
  // await page.getByText('ERR_CONNECTION_REFUSED').click();
  await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Username$/ }).getByRole('textbox').fill('superadmin');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('12345678');
  await page.locator('input[type="password"]').press('Enter');
  await page.locator('.egs-cc-components-Select__input-container').click();
  await page.getByText('Admin', { exact: true }).click();
  await page.getByLabel('CustomForm-finish').click();
  await page.getByText('mandcops').click();
  await page.getByRole('button', { name: 'JOIN' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: '+New widget' }).click();
  await page.locator('#AddWidgetModal-nameInput').click();
  await page.locator('#AddWidgetModal-nameInput').fill('activitystacktest1');
  await page.locator('#AddWidgetModal-nameInput').press('Tab');
  await page.locator('.new-widget-modal-select > .egs-cc-components-Select__control > .egs-cc-components-Select__value-container > .egs-cc-components-Select__input-container').click();
  await page.getByText('Activity Stack', { exact: true }).click();
  await page.locator('div').filter({ hasText: /^ADD$/ }).click();
  await page.getByRole('button', { name: 'ADD' }).click();
  
});
});