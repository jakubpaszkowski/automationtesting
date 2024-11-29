import { expect, test } from "@playwright/test";

const yearlyMock = {
  "2020": 0,
  "2021": 0,
  "2022": 0,
  "2023": 0,
  "2024": 0,
};

test("visual regression testing region mock", async ({ page }) => {
  const apiPath = "**/api/stats/publications/articles/";
  await page.route(apiPath, async (route) => {
    const response = await route.fetch();
    const json = await response.json();
    json.yearly = yearlyMock;
    await route.fulfill({ response, json });
  });

  await page.goto("http://localhost:3000/stats/publicationstats.html");
  const chart = page
    .locator('iframe[title="Stats iframe"]')
    .contentFrame()
    .locator("svg > rect");
  await expect(chart).toHaveScreenshot();
});

test("playwright docs example @mock-ex11", async ({ page }) => {
  const expectedTitle = "How to write effective test cases";

  // 1. Example form official Playwright docs: https://playwright.dev/docs/mock
  // 2. API path to const apiPath
  // 3. Full response body object const articleJSON
  // 4. Changed value of title '💪 Mocked title value 😎'
  // 5. Use expectedTitle as reference

  await page.goto("http://localhost:3000/api/article.html?id=1");
  const observedTitle = page.getByTestId("article-title");

  await expect(observedTitle).toHaveText(expectedTitle);
});

test("playwright docs example @mock-ex11 ", async ({ page }) => {
  const expectedTitle = "How to write effective test cases";

  // example form official Playwright docs: https://playwright.dev/docs/mock

  await page.route("*/**/api/v1/fruits", async (route) => {
    const json = [{ name: "Strawberry", id: 21 }];
    await route.fulfill({ json });
  });

  // end of example

  await page.goto("/article.html?id=1");
  const observedTitle = page.getByTestId("article-title");

  await expect(observedTitle).toHaveText(expectedTitle);
});

test("api path @mock-ex12 @fail", async ({ page }) => {
  // This test should fail
  // It contains correct API path but incorrect json (left form example)

  const expectedTitle = "How to write effective test cases";

  // correct path to mock API resource
  const apiPath = "**/api/articles/1";

  // using path in mocking function
  await page.route(apiPath, async (route) => {
    const json = [{ name: "Strawberry", id: 21 }];
    await route.fulfill({ json });
  });

  await page.goto("/article.html?id=1");
  const observedTitle = page.getByTestId("article-title");

  await expect(observedTitle).toHaveText(expectedTitle);
});

test("article full json @mock-ex13", async ({ page }) => {
  const expectedTitle = "How to write effective test cases";

  const apiPath = "**/api/articles/1";

  // full response body object
  const articleJSON = {
    id: 1,
    title: "How to write effective test cases",
    body: "Test cases are the backbone of any testing process. They define what to test, how to test, and what to expect. Writing effective test cases can save time, effort, and resources. Here are some tips for writing effective test cases:\n- Use clear and concise language\n- Follow a consistent format and structure\n- Include preconditions, steps, expected results, and postconditions\n- Cover positive, negative, and boundary scenarios\n- Prioritize test cases based on risk and importance\n- Review and update test cases regularly",
    user_id: 1,
    date: "2021-07-13T16:35:00Z",
    image: ".\\data\\images\\256\\chuttersnap-9cCeS9Sg6nU-unsplash.jpg",
  };

  await page.route(apiPath, async (route) => {
    // assigning response body object
    const json = articleJSON;
    await route.fulfill({ json });
  });

  await page.goto("/article.html?id=1");
  const observedTitle = page.getByTestId("article-title");

  await expect(observedTitle).toHaveText(expectedTitle);
});

test("article full json modified title @mock-ex14 @fail", async ({ page }) => {
  // This test should fail due to changes in replaced title

  const expectedTitle = "How to write effective test cases";

  const apiPath = "**/api/articles/1";

  // Changed value of title
  const articleJSON = {
    id: 1,
    title: "💪 Mocked title value 😎",
    body: "Test cases are the backbone of any testing process. They define what to test, how to test, and what to expect. Writing effective test cases can save time, effort, and resources. Here are some tips for writing effective test cases:\n- Use clear and concise language\n- Follow a consistent format and structure\n- Include preconditions, steps, expected results, and postconditions\n- Cover positive, negative, and boundary scenarios\n- Prioritize test cases based on risk and importance\n- Review and update test cases regularly",
    user_id: 1,
    date: "2021-07-13T16:35:00Z",
    image: ".\\data\\images\\256\\chuttersnap-9cCeS9Sg6nU-unsplash.jpg",
  };

  await page.route(apiPath, async (route) => {
    const json = articleJSON;
    await route.fulfill({ json });
  });

  await page.goto("/article.html?id=1");
  const observedTitle = page.getByTestId("article-title");

  await expect(observedTitle).toHaveText(expectedTitle);
});

test("article expected data mock @mock-ex15", async ({ page }) => {
  // adjusting expected value to desired one
  const expectedTitle = "💪 Mocked title value 😎";

  const apiPath = "**/api/articles/1";

  // assigning expected value to title
  const articleJSON = {
    id: 1,
    title: expectedTitle,
    body: "Test cases are the backbone of any testing process. They define what to test, how to test, and what to expect. Writing effective test cases can save time, effort, and resources. Here are some tips for writing effective test cases:\n- Use clear and concise language\n- Follow a consistent format and structure\n- Include preconditions, steps, expected results, and postconditions\n- Cover positive, negative, and boundary scenarios\n- Prioritize test cases based on risk and importance\n- Review and update test cases regularly",
    user_id: 1,
    date: "2021-07-13T16:35:00Z",
    image: ".\\data\\images\\256\\chuttersnap-9cCeS9Sg6nU-unsplash.jpg",
  };

  await page.route(apiPath, async (route) => {
    const json = articleJSON;
    await route.fulfill({ json });
  });

  await page.goto("/article.html?id=1");
  const observedTitle = page.getByTestId("article-title");

  await expect(observedTitle).toHaveText(expectedTitle);
});
