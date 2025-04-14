import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { LoginPage } from '../pages/loginPage';
import { Cart } from '../pages/cart';
import { PlaceOrder } from '../pages/placeOrder';
import { LogoutPage } from '../pages/logoutPage';
import { runAccessibilityCheck } from '../Accessibility/accessibilityUtil';
import { saveAccessibilityReport } from '../Accessibility/reportUtil';
import { data } from '../testData'; 

const {
    user_name: username,password,category,product,name,country,city,card,month,year,} = data.UI;

test('Place Order with Accessibility Checks', async ({ page }) => {
    const login = new LoginPage(page);
    const home = new HomePage(page);
    const cart = new Cart(page);
    const placeOrder = new PlaceOrder(page);
    const logout = new LogoutPage(page);

    // Step 1: Login to the application
    await login.gotoLoginPage();
    await runAccessibilityCheck(page, 'Login Page'); // Accessibility check
    
    await login.login(username, password);
    await runAccessibilityCheck(page, 'Home Page'); 

    // Step 2: Select a category and a product
    await home.selectCategory(category);
    await runAccessibilityCheck(page, 'Category Page');
    await home.selectItem(product);
    await runAccessibilityCheck(page, 'Product Page');

    // Step 3: Add product to cart
    const addToCartLink = await home.clickAddToCartLink();
    await addToCartLink.click();
    await runAccessibilityCheck(page, 'Cart Page');

    // Step 4: Go to Cart and verify item
    await cart.goToCart();
    await runAccessibilityCheck(page, 'Cart Items Verification');
    await expect(page.getByRole('cell', { name: product }).first()).toBeVisible();

    // Step 5: Place Order
    await placeOrder.placeOrder();
    await runAccessibilityCheck(page, 'Place Order Page');
    await placeOrder.userDetail(name, country, city, card, month, year);
    await expect(page.getByText('Cancel OK')).toBeVisible();
    //await placeOrder.sucessmessgae();

    // Step 6: Logout
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
    await logout.gotoLogoutPage();
    await runAccessibilityCheck(page, 'Logout Page');
});
