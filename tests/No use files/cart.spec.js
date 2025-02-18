import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { HomePage } from '../../pages/homePage';
import { Cart } from '../../pages/cart';



test('Add Item', async ({ page }) => {
    const login = new LoginPage(page);
    const home = new HomePage(page);
    const cart = new Cart(page);
    

    await login.gotoLoginPage(); // Wait for login page to load
    await login.login('Test_QA', 'Test-123'); 

    const category = 'Laptops';
    await home.selectCategory(category); // Wait for category to  selected

    const laptopName = 'Sony vaio i7';
    await home.selectItem(laptopName); // Wait for item to  selected

    const addToCartLink = await home.clickAddToCartLink();
    await addToCartLink.click();
    

    await cart.goToCart();
    
    await expect(page.getByRole('cell', { name: 'Sony vaio i7' }).first()).toBeVisible();
    await expect(page.locator('td').first()).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Delete' }).first()).toBeVisible();

});
