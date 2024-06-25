import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import * as data from '../testData/testData.json';


const validUsername = data.user_name;
const validPassword = data.password;
const invalidUsername = data.invalid_user_name;
const invalidPassword = data.invalid_password;

test.describe('Login Tests', () => {

     test('Login to Site with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        
        await loginPage.gotoLoginPage();
        console.log(`Attempting login with valid credentials: ${validUsername}/${validPassword}`);
       await loginPage.login(validUsername, validPassword);

        // Check if the logout button is visible indicating a successful login
        const isLogoutVisible = await loginPage.logout_button.isVisible();
        console.log('Logout button visible:', isLogoutVisible);
        expect(isLogoutVisible).toBe(true);
        console.log('Login successfull');
    });

    test('Login to Site with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        
        await loginPage.gotoLoginPage();
        console.log(`Attempting login with invalid credentials: ${invalidUsername}/${invalidPassword}`);
        await loginPage.login(invalidUsername, invalidPassword);
    
       // Optionally, verify the error message
        const errorMessage = await loginPage.getErrorMessage();
        console.log('Error message:', errorMessage);
        expect(errorMessage).toContain('User does not exist.');
    });
});
