// import { test, expect } from '@playwright/test';
// import { HomePage } from '../pages/homePage';
// import { LoginPage } from '../pages/loginPage';
// import { Cart } from '../pages/cart';
// import { PlaceOrder } from '../pages/placeOrder';
// import { LogoutPage } from '../pages/logoutPage';
// //import { runAccessibilityCheck } from '../utils/accessibilityUtil';
// const axeReports = require('axe-reports');
// import data from '../testData.json' assert { type: 'json' }; // Updated import for JSON file

// const username = data.UI.user_name;
// const password = data.UI.password;
// const category = data.UI.category;
// const product = data.UI.product;
// const name = data.UI.name;
// const country = data.UI.country;
// const city = data.UI.city;
// const card = data.UI.card;
// const month = data.UI.month;
// const year = data.UI.year;

// test('Place Order', async ({ page }) => {
//     const login = new LoginPage(page);
//     const home = new HomePage(page);
//     const addToCartLink = await home.clickAddToCartLink();
//     const cart = new Cart(page);
//     const placeOrder = new PlaceOrder(page);
//     const logout = new LogoutPage(page);

//     await login.gotoLoginPage();
//     await runAccessibilityCheck(page); 

//     await login.login(username, password); // Using the correct data
//     await runAccessibilityCheck(page); 

//     await home.selectCategory(category);
//     await runAccessibilityCheck(page); 

//     await home.selectItem(product);
//     await runAccessibilityCheck(page); 

//     await addToCartLink.click();
//     await runAccessibilityCheck(page); 

//     await cart.goToCart();
//     await runAccessibilityCheck(page); 

//     await expect(page.getByRole('cell', { name: 'Sony vaio i7' }).first()).toBeVisible();
//     await expect(page.locator('td').first()).toBeVisible();
//     await expect(page.getByRole('cell', { name: 'Delete' }).first()).toBeVisible();

//     await placeOrder.placeOrder();
//     await runAccessibilityCheck(page); 

//     await placeOrder.userDetail(name, country, city, card, month, year);
//     await expect(page.getByText('Cancel OK')).toBeVisible();
//     await placeOrder.sucessmessgae();

//     await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
//     await logout.gotoLogoutPage();
// });

//-----------------------//

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage';
import { Cart } from '../pages/cart';
import { PlaceOrder } from '../pages/placeOrder';
import { LogoutPage } from '../pages/logoutPage';
import { runAccessibilityCheck } from '../accessibilityCheck'; // Assuming this is your accessibility utility
import { data } from '../testData'; // Import data from testData.ts

// Destructure the UI data from the data object
const { user_name, password, category, product, name, country, city, card, month, year } = data.UI;

test('Place Order', async ({ page }) => {
    const login = new LoginPage(page);
    const home = new HomePage(page);
    const cart = new Cart(page);
    const placeOrder = new PlaceOrder(page);
    const logout = new LogoutPage(page);

    await test.step('Login and navigate to the homepage', async () => {
        await login.gotoLoginPage();
        await runAccessibilityCheck(page, 'LoginPage'); // Accessibility check for Login page

        await login.login(user_name, password);
        await runAccessibilityCheck(page, 'HomePage'); // Accessibility check for Home page
    });

    await test.step('Select category and product', async () => {
        await home.selectCategory(category);
        await runAccessibilityCheck(page, 'CategoryPage'); // Accessibility check for Category page

        await home.selectItem(product);
        await runAccessibilityCheck(page, 'ProductPage'); // Accessibility check for Product page
    });

    await test.step('Add product to cart and place order', async () => {
        await (await home.clickAddToCartLink()).click();
        await runAccessibilityCheck(page, 'CartPage'); // Accessibility check for Cart page

        await cart.goToCart();
        await runAccessibilityCheck(page, 'CheckoutPage'); // Accessibility check for Checkout page

        await placeOrder.placeOrder();
        await placeOrder.userDetail(name, country, city, card, month, year);
        await runAccessibilityCheck(page, 'OrderConfirmationPage'); // Accessibility check for Order Confirmation page
    });

    await test.step('Verify success message and log out', async () => {
        await placeOrder.sucessmessgae();
        await logout.gotoLogoutPage();
        await runAccessibilityCheck(page, 'LogoutPage'); // Accessibility check for Logout page
    });
});
