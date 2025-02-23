import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 10000,
  },
  // zwiekszylem expecta do 10 sekund, standardowo bylo 5 sek

  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: true, // Uruchamia testy w tle
    viewport: { width: 1920, height: 1080 }, // Ustawia rozdzielczość na Full HD

    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",
    video: "retain-on-failure",
    launchOptions: {
      args: [
        // "--window-position=0,0",
        // "--window-size=1920,1080",
        "--start-maximized",
      ],
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium",
        viewport: { width: 1920, height: 1080 }, // Full HD
      },
    },

    /*
    {
      name: "iphone13",
      use: {
        ...devices["iPhone 13"],
      },
    },

    {
      name: "iphone13landscape",
      use: {
        ...devices["iPhone 13 landscape"],
      },
    },

    {
      name: "iphone11",
      use: {
        ...devices["iPhone 11"],
      },
    },

    {
      name: "iphone11landscape",
      use: {
        ...devices["iPhone 11 landscape"],
      },
    },

    {
      name: "iphone12landscape",
      use: {
        ...devices["iPhone 12 landscape"],
      },
    },

    {
      name: "iphone12",
      use: {
        ...devices["iPhone 12"],
      },
    },

    {
      name: "pixel7",
      use: {
        ...devices["Pixel 7"],
      },
    },

    {
      name: "pixel7landscape",
      use: {
        ...devices["Pixel 7 landscape"],
      },
    },
    

    {
      name: "firefox",
      use: {
        browserName: "firefox",
        viewport: { width: 1920, height: 1080 }, // Full HD
      },
    },

    {
      name: "webkit",
      use: {
        browserName: "webkit",
        viewport: { width: 1920, height: 1080 }, // Full HD
      },
    },
    */
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
