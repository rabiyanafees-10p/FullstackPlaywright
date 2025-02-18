import { test, expect } from '@playwright/test';
import {runAccessibilityCheck} from '../utils/accessUtil';

//import { runAccessibilityCheck } from '../Accessibility/accessibilityUtil';
//import { saveAccessibilityReport } from '../Accessibility/reportUtil';

test.describe('OrangeHRM Accessibility Tests', () => {
  test('First Case', async ({ page }) => {
    await page.goto('https://www.orangehrm.com/');
    //await expect(page).toHaveTitle('Human Resources Management Software | OrangeHRM');
    await runAccessibilityCheck(page, 'Orange HRM');
  });
});
