import { test, expect } from '@playwright/test';
import { SimpleElements, AccountPage, SimpleReservations } from '../pages/gad.page';

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
    
    test("simple redervation", async ({ page }) => {
        await page.goto('http://localhost:3000/practice/simple-reservation-v1.html');

        const elementsPage = new SimpleReservations(page);
        await elementsPage.food.click();
        await elementsPage.date23102024.click();
        await elementsPage.checkoutButton.click();
        await expect.soft(elementsPage.results).toHaveText("Reservation for 23.10.2024 with features: Food for total price: 150$");
  
      });
  });

});