import { test, expect } from '@playwright/test';


test.describe('My test suite', () => {

  test('Sync. Case 1', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.click('input[name="username"]');
    await page.locator('input[name="username"]').fill("Admin");
    await page.locator('//input[@class="oxd-input oxd-input--active"]').fill('admin123');
    await page.click('button[type="submit"].oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button');
    await page.waitForTimeout(12000);
    await page.waitForSelector('text=Dashboard');
});


  test('Sync. Case 2', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await expect(page).toHaveTitle('OrangeHRM');
    await page.click('input[name="username"]');
    await page.locator('input[name="username"]').fill("Admin");
    await page.locator('//input[@class="oxd-input oxd-input--active"]').fill('admin123');
    await page.click('button[type="submit"].oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button');
    await page.waitForSelector('text=Dashboard');
 
    //click on Admin option from left nav. 
    await page.click('xpath=//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/ul/li[1]/a');
    

    await page.click('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]');
    await page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[1]/div/div[2]/input').fill('Admin');
    await page.click('button[type="submit"].oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space');
    await page.waitForTimeout(2000); // Wait for 2 second
    //await expect(page).toHaveText('.oxd-table-cell oxd-padding-cell', 'Admin');
    await expect(page).toHaveText('.oxd-text.oxd-text--span:nth-child(1)', '(1) Record Found');

   });
  });
