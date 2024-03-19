import { test, expect } from '@playwright/test';

test('First Case', async ({ page }) => {
    await page.goto('https://www.orangehrm.com/');
  
    // title
    await expect(page).toHaveTitle('Human Resources Management Software | OrangeHRM');
  });