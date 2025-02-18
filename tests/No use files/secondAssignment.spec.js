import { test, expect } from '@playwright/test';


test.describe('My test suite', () => {

  test.beforeEach('Login case', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { timeout: 130000 });
    //await page.waitForTimeout(150000);
    await page.click('input[name="username"]');
    await page.locator('input[name="username"]').fill("Admin");
    await page.locator('//input[@class="oxd-input oxd-input--active"]').fill('admin123');
    await page.click('button[type="submit"].oxd-button.oxd-button--medium.oxd-button--main.orangehrm-login-button');
    await page.waitForTimeout(12000);
    //await page.waitForSelector('text=Dashboard');
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers', { timeout: 5000 });
   // Assertion: Check if the navigation bar element exists
   await page.waitForSelector('.oxd-navbar-nav').not.toBeNull();

});


test('Sync. Add Admin user ', async ({ page }) => {

  await page.waitForTimeout(12000);
  //click on Admin option from left nav. 
 await page.click('xpath=//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/ul/li[1]/a');
  
//Click Add Button
 await page.click('(//button[@class="oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space"])[1]');

 await page.getByText('-- Select --').first().click();
 await page.getByRole('option', { name: 'Admin' }).click();
 await page.getByPlaceholder('Type for hints...').click();
 await page.getByPlaceholder('Type for hints...').fill('Test');
 await page.getByRole('option', { name: 'Orange Test' }).click();
 await page.locator('div').filter({ hasText: /^-- Select --$/ }).nth(2).click();
 await page.getByRole('option', { name: 'Enabled' }).click();
 await page.getByRole('textbox').nth(2).click();
 await page.getByRole('textbox').nth(2).fill('Test 123');
 await page.getByRole('textbox').nth(3).click();
 await page.getByRole('textbox').nth(3).fill('Test@123');
 await page.getByRole('textbox').nth(4).click();
 await page.getByRole('textbox').nth(4).fill('Test@123');
 await page.getByRole('button', { name: 'Save' }).click();

});



  test ('Sync. Search Added user', async ({ page }) => {
   //click on Admin option from left nav. 
  await page.click('xpath=//*[@id="app"]/div[1]/div[1]/aside/nav/div[2]/ul/li[1]/a');
  

  await page.click('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]');
  await page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[1]/div/div[2]/input').fill('Test 123');
  
  await page.locator('.oxd-select-text').first().click();
  await page.getByRole('option', { name: 'Admin' }).click();
  await page.getByPlaceholder('Type for hints...').click();
  await page.getByPlaceholder('Type for hints...').fill('test');
  await page.getByRole('option', { name: 'Orange Test' }).click();
  await page.getByText('-- Select --').click();
  await page.getByRole('option', { name: 'Enabled' }).click();
 // await page.getByRole('button', { name: 'Search' }).click()
  await page.click('button[type="submit"].oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space');
  await page.waitForTimeout(2000); // Wait for 2 second
  //await expect(page).toHaveText('.oxd-table-cell oxd-padding-cell', 'Admin');
  await expect(page).toHaveText('.oxd-text.oxd-text--span:nth-child(1)', '(1) Record Found');
     });



 test.afterEach(async({page})=>{
  await page.close();

 })



     
 test.afterAll ('Sync. logout', async ({ page }) => {
  await page.getByText('tinubu user').click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();

 });


  });
