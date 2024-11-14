# Test Automation training from jaktestowac.pl

## Links
- course https://jaktestowac.pl/course/playwright-wprowadzenie/
- test site https://demo-bank.vercel.app/  
if link is broken check https://jaktestowac.pl/lesson/pw1s01l01/
- code repository https://github.com/jaktestowac/playwright_automatyzacja_wprowadzenie/tree/main

## Commands
- check `NodeJS` version  
`node -v`
- new project with Playwright  
`npm init playwright@latest`
- record tests for given site  
`npx playwright codegen https://demo-bank.vercel.app/`
- run tests without browser GUI  
`npx playwright test`
- run tests with browser GUI  
`npx playwright test --headed`
- view report  
`npx playwright show-report`

- uzywnie komend do startu testow z konkretnego pliku np. login, webui, etc.
`npx playwright test tests/login.spec.ts --headed`

## Playwright Config modifications
- config file `playwright.config.ts`
- disable browsers, i.e. Firefox  
    ```javascript
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    ```


## Visual Studio Code
- Preview: for README.md
- Auto Save: in File            -> Auto Save
- Timeline: file context menu
- Format Document: context menu -> format document or shift+alt+f

## Playwright snippets
- test:
   ```javascript
    test('test description', async ({page})) => {


    });
    ```

- describe:
    ```javasrcipt
    test.describe('Group description`, () => {


    });
    ```

    - running one test: 'test.only'