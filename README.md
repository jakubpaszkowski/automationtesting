# Test Automation Training

## Links

- Test site: [https://demo-bank.vercel.app/](https://demo-bank.vercel.app/)

## Commands

- **Check NodeJS version:**

  ```bash
  node -v
  ```

- **Create a new project with Playwright:**

  ```bash
  npm init playwright@latest
  ```

- **Record tests for a given site:**

  ```bash
  npx playwright codegen https://demo-bank.vercel.app/
  ```

- **Run tests without browser GUI:**

  ```bash
  npx playwright test
  ```

- **Run tests with browser GUI:**

  ```bash
  npx playwright test --headed
  ```

- **View report:**

  ```bash
  npx playwright show-report
  ```

- **Run specific test files (e.g., login, webui, etc.):**
  ```bash
  npx playwright test tests/login.spec.ts --headed
  ```

## Playwright Config Modifications

- **Config file:** `playwright.config.ts`
- **Disable browsers (e.g., Firefox):**
  ```javascript
  // {
  //   name: 'firefox',
  //   use: {
  //     ...devices['Desktop Firefox'],
  //   },
  // },
  ```

## Visual Studio Code Tips

- **Preview README.md:** Built-in preview option.
- **Enable Auto Save:** File -> Auto Save.
- **View Timeline:** File context menu -> Timeline.
- **Format Document:** Right-click context menu -> Format Document or press `Shift + Alt + F`.

## Playwright Snippets

- **Basic test:**

  ```javascript
  test("test description", async ({ page }) => {
    // Test code here
  });
  ```

- **Group tests with describe:**

  ```javascript
  test.describe("Group description", () => {
    // Grouped tests here
  });
  ```

- **Run a single test:**
  ```javascript
  test.only("specific test description", async ({ page }) => {
    // Test code here
  });
  ```
