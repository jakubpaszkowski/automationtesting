import { test, expect } from "@playwright/test";
import { extractDelays, handleDelays } from "../test-data/delayUtils";
import { testConstants } from "../test-data/gad-test-Constants-data"; //for gad tests
import {
  SimpleElements,
  AccountPage,
  SimpleReservations,
  DisabledElements,
} from "../pages/gad.page";

test.describe("Locator filters", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/practice/simple-elements.html");
  });

  test.describe("Finding element - different approaches", () => {
    test("Single button click using options", async ({ page }) => {
      const elementsPage = new SimpleElements(page);
      await elementsPage.buttonId.click();
      await expect
        .soft(elementsPage.resultsId)
        .toHaveText("You clicked the button!");
      await elementsPage.checkboxId.click();

      await expect
        .soft(elementsPage.resultsId)
        .toHaveText("Checkbox is checked!");
      await elementsPage.dropDownNoId1.selectOption("option2");
      await expect
        .soft(elementsPage.resultsId)
        .toHaveText("Selected option: option2");
      await elementsPage.inputId.fill("testing");
      await elementsPage.inputId.blur();
      await expect
        .soft(elementsPage.resultsId)
        .toHaveText("Input value changed to: testing");
      await elementsPage.radioButtons1Id.click();
      await expect
        .soft(elementsPage.resultsId)
        .toHaveText("Radio Button 1 clicked!");
      await page.getByRole("radio").nth(1).click();
      await expect
        .soft(elementsPage.resultsId)
        .toHaveText("Radio Button 2 clicked!");
      await elementsPage.rangeId.fill("50");
      await expect
        .soft(elementsPage.resultsId)
        .toHaveText("Range value changed to: 50");
      await elementsPage.colorPaletteId.fill("#02f2d6");
      await expect
        .soft(elementsPage.resultsId)
        .toHaveText(
          "New selected color: #02f2d6 as hex and in RGB: rgb(2, 242, 214)"
        );
    });

    test("Single button click (using filter and hasText)", async ({ page }) => {
      // Arrange:
      const elementRole = "button";
      const resultId = "dti-results";
      const expectedMessage = "You clicked the button!";
      const elementText = "Click me!";

      const buttonLocator = page
        .getByRole(elementRole)
        .filter({ hasText: elementText });
      const resultsLocator = page.getByTestId(resultId);

      // Act:
      await buttonLocator.click();

      // Assert:
      await expect(resultsLocator).toHaveText(expectedMessage);
    });

    test("Simple redervation", async ({ page }) => {
      await page.goto(
        "http://localhost:3000/practice/simple-reservation-v1.html"
      );

      const elementsPage = new SimpleReservations(page);
      await elementsPage.food.click();
      await elementsPage.date23102024.click();
      await elementsPage.checkoutButton.click();
      await expect
        .soft(elementsPage.results)
        .toHaveText(
          "Reservation for 23.10.2024 with features: Food for total price: 150$"
        );
    });

    test("Elements with changing state", async ({ page }) => {
      await page.goto(
        "http://localhost:3000/practice/disabled-elements-1.html"
      );
      const elementsPage = new DisabledElements(page);

      // Find span element
      const delayLabel = page.locator("#delayLabel");

      // Wait until element is visible
      await delayLabel.waitFor({ state: "visible" });

      // Take element's text
      const delayText = await delayLabel.textContent();

      // Convert text to number (seconds)
      const delayInSeconds = parseFloat(delayText || "0");

      // Dynamic waiting (conversion to milliseconds)
      if (!isNaN(delayInSeconds)) {
        await page.waitForTimeout(delayInSeconds * 1000);
        console.log(`Waited for ${delayInSeconds} seconds`);
      } else {
        console.error("Invalid delay value in #delayLabel");
      }

      // Continue testing after dynamic waiting
      await expect
        .soft(
          page.getByRole("heading", { name: "Elements are now: ENABLED -" })
        )
        .toHaveText(/Elements are now: ENABLED - please wait.*/);
      await elementsPage.buttonId.click();
      await expect
        .soft(elementsPage.results)
        .toHaveText("You clicked the button!");
      await elementsPage.checkbox.click();
      //multiple assertion types :)
      await expect
        .soft(elementsPage.results)
        .toHaveText("Checkbox is checked!");
      await expect.soft(elementsPage.results).toBeVisible();
      await expect(elementsPage.checkbox).toBeChecked();
      // click again to uncheck
      await elementsPage.checkbox.click();

      // verify if checkbox is NOT checked
      await expect(elementsPage.checkbox).not.toBeChecked();

      //assertion
      await expect.soft(elementsPage.heading).toBeVisible();
      await elementsPage.input.fill(testConstants.textToInput);
      await elementsPage.input.blur();
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.inputValueText);
      await elementsPage.textarea.fill(testConstants.textToInput);
      await elementsPage.textarea.blur();
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.textareaInputValue);
      await elementsPage.dropdown.selectOption(testConstants.dropdownOption2);
      await expect
        .soft(elementsPage.results)
        .toHaveText(`Selected option: ${testConstants.dropdownOption2}`);
      await elementsPage.radio.check();
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.textRadioButton2);
      await elementsPage.range.fill(testConstants.rangeValue);
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.textRangeValue);
      await elementsPage.date.fill(testConstants.dateToFill);
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.selectedDate);
      await elementsPage.color.fill(testConstants.colorToFill);
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.colorResults);
    });

    test("button are no displayed for X seconds, hardcoded", async ({
      page,
    }) => {
      await page.goto(
        "http://localhost:3000/practice/not-displayed-elements-1.html"
      );

      const elementsPage = new DisabledElements(page);
      const button = elementsPage.buttonId;
      await button.waitFor({ state: "visible", timeout: 5000 });
    });

    test("button are no displayed for X seconds dynamic", async ({ page }) => {
      await page.goto(
        "http://localhost:3000/practice/not-displayed-elements-1.html"
      );
      const elementsPage = new DisabledElements(page);
      // const button = elementsPage.buttonId;
      // await button.waitFor({ state: 'visible', timeout: 5000 });

      // Find span element
      const delayLabel = page.locator("#delayLabel");

      // Wait until element is visible
      await delayLabel.waitFor({ state: "visible" });

      // Take element's text
      const delayText = await delayLabel.textContent();

      // Convert text to number (seconds)
      const delayInSeconds = parseFloat(delayText || "0");

      // Dynamic waiting (conversion to milliseconds)
      if (!isNaN(delayInSeconds)) {
        await page.waitForTimeout(delayInSeconds * 1000);
        console.log(`Waited for ${delayInSeconds} seconds`);
      } else {
        console.error("Invalid delay value in #delayLabel");
      }

      // Continue testing after dynamic waiting
      await expect
        .soft(
          page.getByRole("heading", { name: "Elements are now: DISPLAYED -" })
        )
        .toHaveText(/Elements are now: DISPLAYED - please wait.*/);
      await elementsPage.buttonId.click();
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.buttonClickedResultText);
      await elementsPage.checkbox.check();
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.checkboxClickedResultText);
      await expect.soft(elementsPage.checkbox).toBeChecked();
      //different method for checkbox
      await elementsPage.checkbox.setChecked(false);
      await expect.soft(elementsPage.checkbox).not.toBeChecked();
      await elementsPage.input.fill(testConstants.textToInput);
      await elementsPage.input.blur();
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.inputValueText);
      await elementsPage.textarea.fill(testConstants.textToInput);
      await elementsPage.textarea.blur();
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.textareaInputValue);
      await elementsPage.dropdown.selectOption(testConstants.dropdownOption2);
      await expect
        .soft(elementsPage.results)
        .toHaveText(`Selected option: ${testConstants.dropdownOption2}`);
      await elementsPage.radio.check();
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.textRadioButton2);
      await elementsPage.range.fill(testConstants.rangeValue);
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.textRangeValue);
      await elementsPage.date.fill(testConstants.dateToFill);
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.selectedDate);
      await elementsPage.color.fill(testConstants.colorToFill);
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.colorResults);
    });

    test("button are not displayed for X seconds and not enabled for Y seconds dynamic", async ({
      page,
    }) => {
      await page.goto(
        "http://localhost:3000/practice/not-present-disabled-elements-1.html"
      );
      const elementsPage = new DisabledElements(page);
      // const button = elementsPage.buttonId;
      // await button.waitFor({ state: 'visible', timeout: 5000 });

      // Find span element
      const delayLabel = page.locator("#delayLabel");

      // Wait until element is visible
      await delayLabel.waitFor({ state: "visible" });
      // Wait until the delayLabel element is visible
      await delayLabel.waitFor({ state: "visible" });

      // Take the element's text
      const delayText = await delayLabel.textContent();

      // Extract both delay times using a regular expression
      const delayRegex = /([\d.]+)\[s\] for displayed and ([\d.]+)/;
      const match = delayText?.match(delayRegex);

      if (match) {
        const delayForDisplayed = parseFloat(match[1]); // Time to wait for elements to be displayed
        const delayForEnabled = parseFloat(match[2]); // Time to wait for elements to be enabled

        // Wait for elements to be displayed
        if (!isNaN(delayForDisplayed)) {
          await page.waitForTimeout(delayForDisplayed * 1000);
          console.log(
            `Waited for ${delayForDisplayed} seconds for elements to be displayed.`
          );
        } else {
          console.error("Invalid delay value for displayed in #delayLabel");
        }

        // Assert elements are now displayed
        await expect
          .soft(
            page.getByRole("heading", { name: "Elements are now: DISPLAYED -" })
          )
          .toHaveText(/.*/);

        // Wait for elements to be enabled
        if (!isNaN(delayForEnabled)) {
          const additionalWaitTime =
            (delayForEnabled - delayForDisplayed) * 1000;
          if (additionalWaitTime > 0) {
            await page.waitForTimeout(additionalWaitTime);
            console.log(
              `Waited an additional ${
                additionalWaitTime / 1000
              } seconds for elements to be enabled.`
            );
          }
        } else {
          console.error("Invalid delay value for enabled in #delayLabel");
        }

        // Perform actions on the enabled elements
        await elementsPage.buttonId.click();
      } else {
        console.error("Failed to extract delay values from #delayLabel");
      }
      // Continue testing after dynamic waiting
      await expect
        .soft(
          page.getByRole("heading", { name: "Elements are now: DISPLAYED -" })
        )
        .toHaveText(/.*/);
      await elementsPage.buttonId.click();
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.buttonClickedResultText);
      await elementsPage.checkbox.check();
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.checkboxClickedResultText);
      await expect.soft(elementsPage.checkbox).toBeChecked();
      //different method for checkbox
      await elementsPage.checkbox.setChecked(false);
      await expect.soft(elementsPage.checkbox).not.toBeChecked();
      await elementsPage.input.fill(testConstants.textToInput);
      await elementsPage.input.blur();
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.inputValueText);
      await elementsPage.textarea.fill(testConstants.textToInput);
      await elementsPage.textarea.blur();
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.textareaInputValue);
      await elementsPage.dropdown.selectOption(testConstants.dropdownOption2);
      await expect
        .soft(elementsPage.results)
        .toHaveText(`Selected option: ${testConstants.dropdownOption2}`);
      await elementsPage.radio.check();
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.textRadioButton2);
      await elementsPage.range.fill(testConstants.rangeValue);
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.textRangeValue);
      await elementsPage.date.fill(testConstants.dateToFill);
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.selectedDate);
      await elementsPage.color.fill(testConstants.colorToFill);
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.colorResults);
    });

    test("button are not present for X seconds dynamic", async ({ page }) => {
      await page.goto(
        "http://localhost:3000/practice/not-present-elements-1.html"
      );
      const elementsPage = new DisabledElements(page);
      // const button = elementsPage.buttonId;
      // await button.waitFor({ state: 'visible', timeout: 5000 });

      // Find span element
      const delayLabel = page.locator("#delayLabel");

      // Wait until element is visible
      await delayLabel.waitFor({ state: "visible" });
      // Wait until the delayLabel element is visible
      await delayLabel.waitFor({ state: "visible" });

      // Take the element's text
      const delayText = await delayLabel.textContent();

      // Extract both delay times using a regular expression
      const delayRegex = /([\d.]+)\[s\] for displayed and ([\d.]+)/;
      const match = delayText?.match(delayRegex);

      if (match) {
        const delayForDisplayed = parseFloat(match[1]); // Time to wait for elements to be displayed
        const delayForEnabled = parseFloat(match[2]); // Time to wait for elements to be enabled

        // Wait for elements to be displayed
        if (!isNaN(delayForDisplayed)) {
          await page.waitForTimeout(delayForDisplayed * 1000);
          console.log(
            `Waited for ${delayForDisplayed} seconds for elements to be displayed.`
          );
        } else {
          console.error("Invalid delay value for displayed in #delayLabel");
        }

        // Assert elements are now displayed
        await expect
          .soft(
            page.getByRole("heading", { name: "Elements are now: DISPLAYED -" })
          )
          .toHaveText(/.*/);

        // Wait for elements to be enabled
        if (!isNaN(delayForEnabled)) {
          const additionalWaitTime =
            (delayForEnabled - delayForDisplayed) * 1000;
          if (additionalWaitTime > 0) {
            await page.waitForTimeout(additionalWaitTime);
            console.log(
              `Waited an additional ${
                additionalWaitTime / 1000
              } seconds for elements to be enabled.`
            );
          }
        } else {
          console.error("Invalid delay value for enabled in #delayLabel");
        }



      // Znajdź pole tekstowe za pomocą lokatora
      const textarea = await page.getByTestId("dti-textarea");
      // Ustaw nowy rozmiar pola tekstowego
      await textarea.evaluate((el) => {
        (el as HTMLTextAreaElement).style.width = "500px";
        (el as HTMLTextAreaElement).style.height = "300px";
      });
      // Sprawdź, czy rozmiar pola tekstowego został zmieniony
      const width = await textarea.evaluate(
        (el) => (el as HTMLTextAreaElement).style.width
      );
      const height = await textarea.evaluate(
        (el) => (el as HTMLTextAreaElement).style.height
      );
      expect(width).toBe("500px");
      expect(height).toBe("300px");

      await elementsPage.buttonId.click();
      await expect(elementsPage.results).toHaveText(
        testConstants.buttonClickedResultText
      );
      await textarea.evaluate((el) => {
        (el as HTMLTextAreaElement).style.width = "50px";
        (el as HTMLTextAreaElement).style.height = "30px";
      });
      await textarea.evaluate((el) => {
        (el as HTMLTextAreaElement).style.width = "500px";
        (el as HTMLTextAreaElement).style.height = "300px";
      });

     

      await expect(elementsPage.buttonId).toBeVisible();
      await expect(elementsPage.dropdown).toBeHidden();
      // const rangeSlider = page.getByTestId('dti-textarea');
      // const sliderPosition = await rangeSlider.boundingBox();
      // await rangeSlider.dragTo(page.locator('body'), { targetPosition: { x: sliderPosition.x + 50, y: sliderPosition.y } });
      await elementsPage.buttonId.click();

  
      await elementsPage.buttonId.click();
        // Perform actions on the enabled elements
        await elementsPage.buttonId.click();
      } else {
        console.error("Failed to extract delay values from #delayLabel");
      }
      // Continue testing after dynamic waiting
      await expect
        .soft(
          page.getByRole("heading", { name: "Elements are now: DISPLAYED -" })
        )
        .toHaveText(/.*/);
      await elementsPage.buttonId.click();
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.buttonClickedResultText);
      await elementsPage.checkbox.check();
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.checkboxClickedResultText);
      await expect.soft(elementsPage.checkbox).toBeChecked();
      //different method for checkbox
      await elementsPage.checkbox.setChecked(false);
      await expect.soft(elementsPage.checkbox).not.toBeChecked();
      await elementsPage.input.fill(testConstants.textToInput);
      await elementsPage.input.blur();
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.inputValueText);
      await elementsPage.textarea.fill(testConstants.textToInput);
      await elementsPage.textarea.blur();
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.textareaInputValue);
      await elementsPage.dropdown.selectOption(testConstants.dropdownOption2);
      await expect
        .soft(elementsPage.results)
        .toHaveText(`Selected option: ${testConstants.dropdownOption2}`);
      await elementsPage.radio.check();
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.textRadioButton2);
      await elementsPage.range.fill(testConstants.rangeValue);
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.textRangeValue);
      await elementsPage.date.fill(testConstants.dateToFill);
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.selectedDate);
      await elementsPage.color.fill(testConstants.colorToFill);
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.colorResults);
    });

    test("button are not present for X seconds and not enabeld for Y seconds - dynamic", async ({ page }) => {
      await page.goto(
        "http://localhost:3000/practice/not-present-disabled-elements-2.html"
      );
      const elementsPage = new DisabledElements(page);
      const button = elementsPage.buttonId;
      // await button.waitFor({ state: 'visible', timeout: 5000 });

      // Find span element
      const delayLabel = page.locator("#delayLabel");

      // Wait until element is visible
      await delayLabel.waitFor({ state: "visible" });
      // Wait until the delayLabel element is visible
      await delayLabel.waitFor({ state: "visible" });

      // Take the element's text
      const delayText = await delayLabel.textContent();
      // // Extract delay times
      // const delayText = await delayLabel.textContent();
      const delays = extractDelays(delayText);
      // Handle delays and assertions
      await handleDelays(page, delays);

      await elementsPage.buttonId.click();
      await expect.soft(elementsPage.results).toHaveText(testConstants.buttonClickedResultText);

    });



  });
});
