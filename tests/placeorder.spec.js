import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { Cart } from '../pages/cart';
import { PlaceOrder } from '../pages/placeOrder';
import { LogoutPage } from '../pages/logoutPage';
import * as data from '../testData/testData.json';

const username = data.user_name;
const password = data.password;
const category = data.category;
const product = data.product;
const name = data.name;
const country = data.country;
const city = data.city;
const card = data.card;
const month = data.month;
const year = data.year;

test('Place Order', async ({ page }) => {
    const login = new LoginPage(page); // Corrected login
    const home = new HomePage(page);
    const addToCartLink = await home.clickAddToCartLink();
    const cart = new Cart(page);
    const placeOrder = new PlaceOrder(page);
    const logout = new LogoutPage(page);
    
    
    await login.gotoLoginPage();
    await login.login(username,password);

    await home.selectCategory(category);
    await home.selectItem(product);

    //await expect(page.getByRole('link', { name: 'Add to cart' })).toBeVisible();
    await addToCartLink.click();
    /*await Promise.all([
        expect(page.getByRole('link', { name: 'Add to cart' })).toBeVisible(),
        addToCartLink.click()
    ]);*/


    try {
        // Try to close the dialog if it appears
        const dialog = await page.waitForEvent('dialog', { timeout: 5000 }); // Adjust timeout as needed
        console.log('Dialog message:', dialog.message());
        await dialog.accept();
    } catch (error) {
        // If dialog does not appear, continue with next step
        console.log('Dialog did not appear, proceeding with next step...');
    }

    await cart.goToCart();

    await expect(page.getByRole('cell', { name: 'Sony vaio i7' }).first()).toBeVisible();
    await expect(page.locator('td').first()).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Delete' }).first()).toBeVisible();

    await placeOrder.placeOrder();
    await placeOrder.userDetail(name, country, city, card, month, year)
    await expect(page.getByText('Cancel OK')).toBeVisible();
    await placeOrder.sucessmessgae();

    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
    await logout.gotoLogoutPage();

});
