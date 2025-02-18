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
import { HomePage } from '../../pages/homePage';
import { LoginPage } from '../../pages/loginPage';
import { Cart } from '../../pages/cart';
import { PlaceOrder } from '../../pages/placeOrder';
import { LogoutPage } from '../../pages/logoutPage';
import { runAccessibilityCheck } from '../../utils/accessibilityUtil';
import { data } from '../../testData'; 


const { user_name, password, category, product, name, country, city, card, month, year } = data.UI;

test('Place Order', async ({ page }) => {
    const login = new LoginPage(page);
    const home = new HomePage(page);
    const cart = new Cart(page);
    const placeOrder = new PlaceOrder(page);
    const logout = new LogoutPage(page);

    // Step 1: Login
    await login.gotoLoginPage();
    let results = await runAccessibilityCheck(page);
    
    expect(results.violations.length).toBe(0); // Ensure no accessibility violations on login page
    await login.login(user_name, password);
    results = await runAccessibilityCheck(page);
    expect(results.violations.length).toBe(0); // Ensure no violations after login

    // Step 2: Navigate and Select Items
    await home.selectCategory(category);
    results = await runAccessibilityCheck(page);
    expect(results.violations.length).toBe(0); // Accessibility check on category page
    await home.selectItem(product);
    results = await runAccessibilityCheck(page);
    expect(results.violations.length).toBe(0); // Accessibility check on product details page

    // Step 3: Add to Cart
    const addToCartLink = await home.clickAddToCartLink();
    await addToCartLink.click();
    results = await runAccessibilityCheck(page);
    expect(results.violations.length).toBe(0); // Accessibility check after adding to cart

    // Step 4: Verify Cart Items
    await cart.goToCart();
    results = await runAccessibilityCheck(page);
    expect(results.violations.length).toBe(0); // Accessibility check on cart page
    await expect(page.getByRole('cell', { name: product }).first()).toBeVisible();

    // Step 5: Place Order
    await placeOrder.placeOrder();
    results = await runAccessibilityCheck(page);
    expect(results.violations.length).toBe(0); // Accessibility check on place order page
    await placeOrder.userDetail(name, country, city, card, month, year);

    // Step 6: Verify Success Message
    await expect(page.getByText('Cancel OK')).toBeVisible();
    await placeOrder.successMessage();

    // Step 7: Logout
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
    await logout.gotoLogoutPage();
});
