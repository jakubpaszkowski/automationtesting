# Test Automation training

## Links
- 
- test site https://demo-bank.vercel.app/  

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

    - running one test: 'test.only'#   a u t o m a t i o n - t e s t s 
 
 #   a u t o m a t i o n - t e s t s 
 
 #   a u t o m a t i o n - t e s t s 
 
 #   a u t o m a t i o n t e s t i n g  
 