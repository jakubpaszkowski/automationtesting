import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  test.beforeEach (async ({ page }) => {
    const url = 'https://the-internet.herokuapp.com/';
    await page.goto(url);

    
  });
test('test',
  

  async ({ page }) => {
  
  await page.getByRole('heading', { name: 'Welcome to the-internet' }).click();
  await page.getByRole('link', { name: 'A/B Testing' }).click();
  await page.getByRole('heading', { name: 'A/B Test Variation' }).click();
  await expect(page.getByRole('heading')).toHaveText("A/B Test Variation");
});



test('test - add/remove elements', async ({ page }) => {
 
  await page.getByRole('link', { name: 'Add/Remove Elements' }).click();
  await page.getByRole('heading', { name: 'Add/Remove Elements' }).click();
  await page.getByRole('button', { name: 'Add Element' }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByRole('heading')).toHaveText("Add/Remove Elements");
  
});



test('test - checkboxes', async ({ page }) => {
  await page.getByRole('link', { name: 'Checkboxes' }).click();
  await page.getByRole('checkbox').first().check();
  await page.getByRole('checkbox').nth(1).uncheck();
  await expect(page.getByRole('heading')).toHaveText("Checkboxes");
});

});