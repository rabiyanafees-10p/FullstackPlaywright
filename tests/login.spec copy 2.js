import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import * as data from '../testData/testData.json';

const username = data.user_name;
const password = data.password;

test('Login to Site', async ({ page }) => {
    const loginPage = new LoginPage(page); 
    
    await loginPage.gotoLoginPage();
    await loginPage.login(username,password);
});
