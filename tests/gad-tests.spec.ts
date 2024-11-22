import { test, expect } from "@playwright/test";
import { extractDelays, handleDelays } from "../test-data/delayUtils";
import {
  NestedTableConstants,
  testConstants,
} from "../test-data/gad-test-Constants-data"; //for gad tests
import {
  SimpleElements,
  AccountPage,
  SimpleReservations,
  DisabledElements,
  WeatherTable,
  NestedTable,
  SlowLoadedTable,
} from "../pages/gad.page";
import exp from "constants";

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

    test("button are not present for X seconds and not enabeld for Y seconds - dynamic", async ({
      page,
    }) => {
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
      await expect
        .soft(elementsPage.results)
        .toHaveText(testConstants.buttonClickedResultText);
    });

    test("TABLE", async ({ page }) => {
      await page.goto("http://localhost:3000/practice/simple-tables.html");
      const elementsPage = new DisabledElements(page);
      const button = elementsPage.buttonId;
      const temperatureTestId = await page
        .locator('[data-testid="dti-cell-1-3"]')
        .textContent();
      console.log(`Temperature: ${temperatureTestId}`);

      const temperatureId = await page.locator("#cell-1-3").textContent();
      console.log(`Temperature: ${temperatureId}`);

      // The textContent() method will return text that may contain whitespace characters.
      // If you want to remove unnecessary spaces, you can use .trim()
      const temperature = (
        await page.locator("#cell-1-3").textContent()
      )?.trim();
      console.log(`Temperature: ${temperature}`);

      const temperature3rd = await page
        .locator("tr > td:nth-child(4)")
        .nth(1)
        .textContent();
      console.log(`Temperature: ${temperature3rd}`);
    });

    test("Weather table all data and 1 specific", async ({ page }) => {
      await page.goto("http://localhost:3000/practice/simple-tables.html");
      const elementsPage = new WeatherTable(page);
      const dates = await page
        .locator("tr > td:nth-child(1)")
        .allTextContents();
      console.log(`All dates: ${dates}`);
      const specificDate = await page
        .locator("tr > td:nth-child(1)", { hasText: "2022-01-07" })
        .textContent();
      console.log(`Specific date: ${specificDate}`);
    });

    test("Weather table all weather and 1 specific", async ({ page }) => {
      await page.goto("http://localhost:3000/practice/simple-tables.html");
      const elementsPage = new WeatherTable(page);
      const weather = await page
        .locator("tr > td:nth-child(2)")
        .allTextContents();
      console.log(`All dates: ${weather}`);
      const specificWeather = await page
        .locator("tr > td:nth-child(2)", { hasText: "Snowy" })
        .textContent();
      console.log(`Specific date: ${specificWeather}`);
    });

    test("Weather table all temperatures and 1 specific 25C", async ({
      page,
    }) => {
      await page.goto("http://localhost:3000/practice/simple-tables.html");
      const elementsPage = new WeatherTable(page);
      const button = elementsPage.buttonId;
      const dateText = await elementsPage.date20220101.textContent();
      console.log(`Date: ${dateText}`);

      const temperatures = await page
        .locator("tr > td:nth-child(3)")
        .allTextContents();
      console.log(`All temperatures: ${temperatures}`);
      const specificTemp = await page
        .locator("tr > td:nth-child(3)", { hasText: "25°C" })
        .textContent();
      console.log(`Specific temperature: ${specificTemp}`);
    });

    test("Weather table all sunrise - sunset and 1 specific", async ({
      page,
    }) => {
      await page.goto("http://localhost:3000/practice/simple-tables.html");
      const elementsPage = new WeatherTable(page);
      const SunriseSunset = await page
        .locator("tr > td:nth-child(4)")
        .allTextContents();
      console.log(`All dates: ${SunriseSunset}`);
      const specificSunriseSunset = await page
        .locator("tr > td:nth-child(4)", { hasText: "7:00 AM - 7:00 PM" })
        .textContent();
      console.log(`Specific date: ${specificSunriseSunset}`);
    });

    test("Weather table specific date and temprature", async ({ page }) => {
      await page.goto("http://localhost:3000/practice/simple-tables.html");
      const elementsPage = new WeatherTable(page);

      const rowLocator = page.locator("tr", {
        has: page.locator("td", { hasText: "2022-01-07" }),
      });
      const temperature = await rowLocator
        .locator("td:nth-child(3)")
        .textContent();
      console.log(`Temperature for 2022-01-01: ${temperature}`);
    });

    test("Weather table Forecast", async ({ page }) => {
      await page.goto(
        "http://localhost:3000/practice/simple-weather-forecast.html"
      );
      const elementsPage = new WeatherTable(page);

      const rowLocator = page.locator("tr", {
        has: page.locator("td", { hasText: "2024-11-17" }),
      });
      const temperature = await rowLocator
        .locator("td:nth-child(3)")
        .textContent();
      const weather = await rowLocator.locator("td:nth-child(2)").textContent();

      const humidity = await rowLocator
        .locator("td:nth-child(3)")
        .textContent();

      const dayLenght = await rowLocator
        .locator("td:nth-child(4)")
        .textContent();

      const cloudCover = await rowLocator
        .locator("td:nth-child(5)")
        .textContent();

      console.log(
        `Temperature for 2024-11-17: ${weather} ${temperature}°C ${humidity} ${dayLenght} ${cloudCover}`
      );
    });

    test("Nested table actions", async ({ page }) => {
      await page.goto(
        "http://localhost:3000/practice/simple-nested-table-v1.html"
      );
      const elementsPage = new NestedTable(page);
      await elementsPage.row1stRow1stClick.first().click();
      await expect
        .soft(elementsPage.resultsHistory)
        .toHaveText(NestedTableConstants.clickedResultsText);
      console.log(NestedTableConstants.clickedResultsText);

      await elementsPage.row1stRow1stClick.nth(1).click();
      await expect
        .soft(elementsPage.resultsHistory)
        .toHaveText(NestedTableConstants.clickedResultsText);

      await elementsPage.row1stRow1stClick.nth(2).click();
      await expect
        .soft(elementsPage.resultsHistory)
        .toHaveText(NestedTableConstants.clickedResultsText);
      console.log(NestedTableConstants.clickedResultsText);

      await elementsPage.row2ndRow1stClick.first().click();
      await expect
        .soft(elementsPage.resultsHistory)
        .toHaveText(NestedTableConstants.clickedResultsText);
      // await elementsPage.row2ndRow2ndClick.click();
      await elementsPage.row2ndRow2ndClick.first().click();
      // await elementsPage.row2ndRow2ndClick.nth(1).click();
      //is visible?
      await expect.soft(elementsPage.resultsHistory).toBeVisible();
      await elementsPage.row2ndRow3rdClick.click();
      await elementsPage.row2ndRow4thClick.click();
      await expect
        .soft(elementsPage.resultsHistory)
        .toHaveText(NestedTableConstants.clickedResultsText);
      await expect.soft(elementsPage.resultsHistory).toBeVisible();

      //3rd rows
      await elementsPage.row3rdRow1stClick.first().click();
      await expect
        .soft(elementsPage.resultsHistory)
        .toHaveText(NestedTableConstants.clickedResultsText);
      await expect.soft(elementsPage.resultsHistory).toBeVisible();
      await elementsPage.row3rdRow2ndClick.first().click();
      await expect
        .soft(elementsPage.resultsHistory)
        .toHaveText(NestedTableConstants.clickedResultsText);
      await expect.soft(elementsPage.resultsHistory).toBeVisible();
      await elementsPage.row3rdRow3rdClick.first().click();
      await expect
        .soft(elementsPage.resultsHistory)
        .toHaveText(NestedTableConstants.clickedResultsText);
      await expect.soft(elementsPage.resultsHistory).toBeVisible();
      await elementsPage.row3rdRow4thClick.click();
      await expect
        .soft(elementsPage.resultsHistory)
        .toHaveText(NestedTableConstants.clickedResultsText);
      await expect.soft(elementsPage.resultsHistory).toBeVisible();
      await elementsPage.row3rdRow5thClick.click();
      await expect
        .soft(elementsPage.resultsHistory)
        .toHaveText(NestedTableConstants.clickedResultsText);
      await expect.soft(elementsPage.resultsHistory).toBeVisible();
    });

    test("slow loading table content on page", async ({ page }) => {
      await page.goto(
        "http://localhost:3000/practice/slowly-loaded-table-1.html"
      );
      const elementsPage = new SlowLoadedTable(page);

      // wait for element to be visible
      const dataLocator = page.getByTestId("dti-row-0-date");
      await expect(dataLocator).toBeVisible({ timeout: 15000 }); // Timeout 15s for long loading
      //wait to load last one row before atempt with testing
      await expect(page.getByTestId("dti-row-14-date")).toHaveText(
        "2022-01-15"
      );

      // await page.waitForLoadState('networkidle');
    });

    test("slow loading table content on page networkidle method", async ({
      page,
    }) => {
      await page.goto(
        "http://localhost:3000/practice/slowly-loaded-table-1.html"
      );
      const elementsPage = new SlowLoadedTable(page);
      // wait for idle in network
      await page.waitForLoadState("networkidle");

      const dataLocator = page.getByTestId("dti-row-0-date");
      // wait for element to be visible
      await expect(dataLocator).toBeVisible({ timeout: 15000 }); // Timeout 15s for long loading
      //wait to load last one row before atempt with testing
      await expect(page.getByTestId("dti-row-14-date")).toHaveText(
        "2022-01-15"
      );
      await expect(elementsPage.row6).toHaveText("2022-01-07");
      await elementsPage.row6.click();
      await expect(elementsPage.row6Weather).toHaveText("❄️ Snowy");
      await elementsPage.row6Weather.click();
      await expect(elementsPage.row6Weather).toBeVisible();
      await elementsPage.row6Temperature.click();
      await elementsPage.row6Hours.first().click();

      // prepare to be shown in console
      const row6HoursContext = await elementsPage.row6Hours
        .first()
        .textContent();
      console.log(row6HoursContext);
    });

    test("slow loading table content on page dynamic waiting method", async ({
      page,
    }) => {
      await page.goto(
        "http://localhost:3000/practice/slowly-loaded-table-1.html"
      );
      const elementsPage = new SlowLoadedTable(page);
      // wait for idle in network

      const rows = page.locator('[data-testid^="dti-row-"]');

      // Poczekaj na elementy
      await page.waitForSelector('[data-testid^="dti-row-"]');

      // Policz elementy po załadowaniu
      const rowCount = await rows.count();
      console.log(`Liczba wierszy: ${rowCount}`);

      const rowTexts: string[] = [];
      for (let i = 0; i < rowCount; i++) {
        const rowLocator = rows.nth(i);
        const rowText = await rowLocator.textContent();

        if (rowText !== null) {
          rowTexts.push(rowText.trim());
        }
      }

      console.log("Teksty w wierszach:", rowTexts);

      console.log(rowCount);
      console.log(rowTexts);
      const parentHTML = await page
        .locator('[data-testid^="dti-row-"]')
        .first()
        .locator("..")
        .innerHTML();
      console.log(parentHTML);
    });

    test("visual testing", async ({ page }) => {
      await page.goto("http://localhost:3000/practice/charts-1.html");
      const elementsPage = new SlowLoadedTable(page);

      // wait for element to be visible
      // const dataLocator = page.getByTestId("dti-row-0-date");
      // await expect(dataLocator).toBeVisible({ timeout: 15000 }); // Timeout 15s for long loading
      // //wait to load last one row before atempt with testing
      // await expect(page.getByTestId("dti-row-14-date")).toHaveText(
      //   "2022-01-15"
      // );

      await page.goto("http://localhost:3000/practice/charts-1.html");
      const dataPoint = page.locator("circle").nth(3);
      await dataPoint.hover();

      await page.getByRole("img").getByText("-06-20").click();
      // await page.waitForLoadState('networkidle');
    });

   


    test('Debugowanie widoczności elementu', async ({ page }) => {
      await page.goto('http://localhost:3000/practice/charts-1.html');
      console.log('Czekam na załadowanie strony...');
      await page.waitForLoadState('networkidle');
      
      // Poczekaj chwilę, aby upewnić się, że wszystkie zasoby są załadowane
      await page.waitForTimeout(5000); // Poczekaj 5 sekund
      
      await page.locator('circle').first().hover();
      await page.locator('circle').first().click();
      await page.locator('circle').nth(2).hover();
      await page.locator('circle').nth(2).click();

      await page.locator('circle').nth(3).hover();
      await page.locator('circle').nth(3).click();
      // await page.locator('circle').nth(4).click({
      //   button: 'right'
      // });
      await page.locator('circle').nth(4).dblclick();
      await page.locator('circle').nth(4).click();
      await page.locator('circle').nth(3).click();
  });
  


const yearlyMock = {
  "2020": 0,
  "2021": 0,
  "2022": 0,
  "2023": 0,
  "2024": 0,
};



test('Wskaż punkt na wykresie', async ({ page }) => {
  // Załaduj stronę wykresu
  await page.goto('http://localhost:3000/practice/charts-1.html');
  
  // Poczekaj na załadowanie strony (lub dostosuj w razie potrzeby)
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(5000); // Poczekaj 5 sekund, aby upewnić się, że zasoby są załadowane

  // Selekcja koła na podstawie współrzędnych cx i cy
  const cx = "224.5";
  const cy = "168.3571428571429";
  const circle = await page.locator(`circle[cx="${cx}"][cy="${cy}"]`);

  await page.locator('circle:nth-child(4)').first().hover();
  await page.locator('circle:nth-child(4)').first().click();
  await page.locator('circle:nth-child(4)').nth(2).hover();
  await page.locator('circle:nth-child(4)').nth(2).click();

  await page.locator('circle:nth-child(4)').nth(3).hover();
  await page.locator('circle:nth-child(4)').nth(3).click();
  // await page.locator('circle').nth(4).click({
  //   button: 'right'
  // });
  await page.locator('circle:nth-child(4)').nth(4).dblclick();
  await page.locator('circle:nth-child(4)').nth(4).click();
  await page.locator('circle:nth-child(4)').nth(3).click();

  await page.locator('circle:nth-child(4)').click();
  await page.locator('circle:nth-child(4)').click();
 
  await page.getByRole('img').getByText('-06-20').click();
  await page.locator('circle').nth(4).click();
  // Upewnij się, że element jest widoczny
  await expect(circle).toBeVisible();
  console.log(`Znaleziono koło w punkcie: cx=${cx}, cy=${cy}`);
  
  // Możesz wykonać akcję, np. najechać kursorem na punkt
  await circle.hover();
  
  // Dodatkowo, jeżeli chcesz odczytać współrzędne koła
  const cxAttribute = await circle.getAttribute('cx');
  const cyAttribute = await circle.getAttribute('cy');
  console.log(`Współrzędne punktu: cx=${cxAttribute}, cy=${cyAttribute}`);
  
  // Możesz także kliknąć w ten punkt, jeśli to jest wymagane
  await circle.click();
  await page.locator('g').filter({ hasText: 'Weather Data' }).locator('rect').click();

    


});

  
    
test('Debugowanie widoczności elementu2', async ({ page }) => {
    await page.goto('http://localhost:3000/practice/charts-1.html');

    console.log('Czekam na załadowanie strony...');
    await page.waitForLoadState('networkidle');
    await page.waitForFunction(() => document.querySelector('circle'));
// Oczekiwanie na widoczność kontenera wykresu
console.log('Czekam na widoczność kontenera wykresu...');
await page.waitForSelector('.chart-container');
await page.waitForTimeout(2000); // dodatkowy czas na renderowanie

// Szukanie elementów <circle> z odpowiednim kolorem obramowania
const circles = page.locator('circle[stroke="#dc3912"]');
const count = await circles.count();
console.log('Liczba kół z tym kolorem obramowania:', count);

for (let i = 0; i < count; i++) {
    const cx = await circles.nth(i).getAttribute('cx');
    const cy = await circles.nth(i).getAttribute('cy');
    console.log(`Circle ${i}: cx=${cx}, cy=${cy}`);
}

if (count === 0) {
    await page.screenshot({ path: 'debug-element-not-found.png' });
    throw new Error('Element nie został znaleziony!');
}



  });
})
});
