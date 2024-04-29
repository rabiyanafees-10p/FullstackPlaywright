import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import * as data from '../testData/testData.json'


const username = data.user_name;
const password = data.password;
const category = data.category;
const product = data.product;

const login = new LoginPage(page);
const home = new HomePage(page);
const addToCartLink = await home.clickAddToCartLink();

test('Select Item', async ({ page }) => {


  await loginPage.gotoLoginPage();
  await loginPage.login(username,password);


  await home.selectCategory(category);
  await home.selectItem(product);


  await addToCartLink.click();

  //Dialog box close
  const dialog = await page.waitForEvent('dialog');
  console.log('Dialog message:', dialog.message());
  await dialog.accept();

});
