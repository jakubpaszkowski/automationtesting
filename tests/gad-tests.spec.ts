import { test, expect } from '@playwright/test';
import { SimpleElements, AccountPage, SimpleReservations, DisabledElements } from '../pages/gad.page';

test.describe("Locator filters", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/practice/simple-elements.html');
  });


  test.describe("Finding element - different approaches", () => {
    test("Single button click using options", async ({ page }) => {
      
        const elementsPage = new SimpleElements(page);
    await elementsPage.buttonId.click();
    await expect.soft(elementsPage.resultsId).toHaveText("You clicked the button!");
    await elementsPage.checkboxId.click();
    
   
        
    await expect.soft(elementsPage.resultsId).toHaveText("Checkbox is checked!");
    await elementsPage.dropDownNoId1.selectOption('option2');
    await expect.soft(elementsPage.resultsId).toHaveText("Selected option: option2");
    await elementsPage.inputId.fill("testing");
    await elementsPage.inputId.blur();
    await expect.soft(elementsPage.resultsId).toHaveText("Input value changed to: testing");
    await elementsPage.radioButtons1Id.click();
    await expect.soft(elementsPage.resultsId).toHaveText("Radio Button 1 clicked!");
    await page.getByRole('radio').nth(1).click();
    await expect.soft(elementsPage.resultsId).toHaveText("Radio Button 2 clicked!");
    await elementsPage.rangeId.fill("50");
    await expect.soft(elementsPage.resultsId).toHaveText("Range value changed to: 50");
    await elementsPage.colorPaletteId.fill("#02f2d6");
    await expect.soft(elementsPage.resultsId).toHaveText("New selected color: #02f2d6 as hex and in RGB: rgb(2, 242, 214)");


    
    });


    test("Single button click (using filter and hasText)", async ({ page }) => {
      
      // Arrange:
      const elementRole = "button";
      const resultId = "dti-results";
      const expectedMessage = "You clicked the button!";
      const elementText = "Click me!";

      const buttonLocator = page.getByRole(elementRole).filter({hasText: elementText});
        const resultsLocator = page.getByTestId(resultId);
      
      // Act:
        await buttonLocator.click();


      // Assert:
      await expect(resultsLocator).toHaveText(expectedMessage);


    });
    
    test("Simple redervation", async ({ page }) => {
        await page.goto('http://localhost:3000/practice/simple-reservation-v1.html');

        const elementsPage = new SimpleReservations(page);
        await elementsPage.food.click();
        await elementsPage.date23102024.click();
        await elementsPage.checkoutButton.click();
        await expect.soft(elementsPage.results).toHaveText("Reservation for 23.10.2024 with features: Food for total price: 150$");
  
      });

      test("Elements with changing state", async ({ page }) => {
        await page.goto('http://localhost:3000/practice/disabled-elements-1.html');
        const textToInput = "test";
        const inputValueText = "Input value changed to: test";
        const textareaInputValue = "Textarea value changed to: test";
        const dropdownOption2 = 'option2';
        const textRadioButton2 = "Radio Button 2 clicked!";
        const textRangeValue = "Range value changed to: 52";
        const rangeValue = "52";
        const dateToFill = "2024-11-16"
        const selectedDate = "Selected date: 2024-11-16"
        const colorToFill = "#00fbff";
        const colorResults = "New selected color: #00fbff as hex and in RGB: rgb(0, 251, 255)";
        const elementsPage = new DisabledElements(page);

         // Find span element
  const delayLabel = page.locator('#delayLabel');

  // Wait until element is visible
  await delayLabel.waitFor({ state: 'visible' });

  // Take element's text
  const delayText = await delayLabel.textContent();

  // Convert text to number (seconds)
  const delayInSeconds = parseFloat(delayText || '0');

  // Dynamic waiting (conversion to milliseconds)
  if (!isNaN(delayInSeconds)) {
    await page.waitForTimeout(delayInSeconds * 1000);
    console.log(`Waited for ${delayInSeconds} seconds`);
  } else {
    console.error('Invalid delay value in #delayLabel');
  }

  // Continue testing after dynamic waiting
   await expect.soft(page.getByRole('heading', { name: 'Elements are now: ENABLED -' })).toHaveText(/Elements are now: ENABLED - please wait.*/);
   await elementsPage.buttonId.click();
   await expect.soft(elementsPage.results).toHaveText("You clicked the button!");
   await elementsPage.checkbox.click();
   //multiple assertion types :)
   await expect.soft(elementsPage.results).toHaveText("Checkbox is checked!");
   await expect.soft(elementsPage.results).toBeVisible();
   await expect(elementsPage.checkbox).toBeChecked();
   // click again to uncheck
   await elementsPage.checkbox.click();

   // verify if checkbox is NOT checked
   await expect(elementsPage.checkbox).not.toBeChecked();

  

 //assertion
  await expect.soft(elementsPage.heading).toBeVisible();
  await elementsPage.input.fill(textToInput);
  await elementsPage.input.blur();
  await expect.soft(elementsPage.results).toHaveText(inputValueText);
  await elementsPage.textarea.fill(textToInput);
  await elementsPage.textarea.blur();
  await expect.soft(elementsPage.results).toHaveText(textareaInputValue);
  await elementsPage.dropdown.selectOption(dropdownOption2);
  await expect.soft(elementsPage.results).toHaveText(`Selected option: ${dropdownOption2}`);
  await elementsPage.radio.check();
  await expect.soft(elementsPage.results).toHaveText(textRadioButton2);
  await elementsPage.range.fill(rangeValue);
  await expect.soft(elementsPage.results).toHaveText(textRangeValue);
  await elementsPage.date.fill(dateToFill);
  await expect.soft(elementsPage.results).toHaveText(selectedDate);
  await elementsPage.color.fill(colorToFill);
  await expect.soft(elementsPage.results).toHaveText(colorResults);

  });

  test("button are no displayed for X seconds, hardcoded", async ({ page }) => {
    await page.goto('http://localhost:3000/practice/not-displayed-elements-1.html');

    const elementsPage = new DisabledElements(page);
    const button = elementsPage.buttonId;
    await button.waitFor({ state: 'visible', timeout: 5000 });

  });

  test("button are no displayed for X seconds dynamic", async ({ page }) => {
    await page.goto('http://localhost:3000/practice/not-displayed-elements-1.html');

    const elementsPage = new DisabledElements(page);
    // const button = elementsPage.buttonId;
    // await button.waitFor({ state: 'visible', timeout: 5000 });

        // Find span element
  const delayLabel = page.locator('#delayLabel');

  // Wait until element is visible
  await delayLabel.waitFor({ state: 'visible' });

  // Take element's text
  const delayText = await delayLabel.textContent();

  // Convert text to number (seconds)
  const delayInSeconds = parseFloat(delayText || '0');

  // Dynamic waiting (conversion to milliseconds)
  if (!isNaN(delayInSeconds)) {
    await page.waitForTimeout(delayInSeconds * 1000);
    console.log(`Waited for ${delayInSeconds} seconds`);
  } else {
    console.error('Invalid delay value in #delayLabel');
  }

  // Continue testing after dynamic waiting
   await expect.soft(page.getByRole('heading', { name: 'Elements are now: DISPLAYED -' })).toHaveText(/Elements are now: DISPLAYED - please wait.*/);
   await elementsPage.buttonId.click();








  });
  });

});