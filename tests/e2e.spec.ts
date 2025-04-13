import { test, expect } from '@playwright/test'
import { userData } from '../data/testdata'
import { HomePage } from '../pages/home.page'
import { LoginPage } from '../pages/login.page'
import { RegisterPage } from '../pages/register.page'
import { MyAccountPage } from '../pages/myaccount.page'
import { ProductPage } from '../pages/product.page'

test('End to End Test', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const myAccountPage = new MyAccountPage(page);
  const productPage = new ProductPage(page);

  await homePage.goto();

  await expect(page.getByRole('heading', { name: "Don’t miss out" })).toBeVisible();
  await homePage.clikCloseModal();

  await homePage.clickProfileIcon();
  await expect(page.getByRole('link', { name: "Forgot your password?" })).toBeVisible();

  await homePage.clickNewRegister();
  await expect(page.getByRole('heading', { name: "Register" })).toBeVisible();

  await registerPage.fillRegisterUser(
    userData.name,
    userData.lastname,
    userData.email,
    userData.password
  );

  await page.waitForURL('**/login', { timeout: 10000 });
  await loginPage.loginCredentials(userData.email, userData.password);
  console.log('Login exitoso');

  await expect(page.locator("#wrapper > section > div > div > div.col-lg-9 > div > div > h5")).toBeVisible();
  console.log('URL actual:', await page.url());

  await myAccountPage.clickLogoEcomus();
  await page.waitForURL('**/', { timeout: 10000 });

  await expect(page.getByRole('heading', { name: "Don’t miss out" })).toBeVisible({ timeout: 10000 });
  await homePage.clikCloseModal();


  await expect(page.locator(".home-pckaleball-page > div:nth-child(1) > div.card-product-info > a")
  ).toBeVisible();
//await page.pause(); 

  await page.screenshot({ path: 'debug-home.png', fullPage: true });

  await homePage.selectRacketCard();
  await expect(page.getByRole('heading', { name: "Franklin Signature Pickleball Paddle" })).toBeVisible({ timeout: 10000 });
 
  await productPage.selectColor();
  await page.screenshot({ path: 'before-color-select.png', fullPage: true });
  console.log('Esperando heading del producto...');
  //await page.pause();

  await productPage.selectSize();
  await productPage.fillQuantity(3);
  console.log('URL actual:', await page.url());

  await productPage.clickAddToCart();
  await expect(page.locator('#shoppingCart > div > div > div.header > div')).toBeVisible({ timeout: 10000 });

  //await page.pause();

 await page.screenshot({ path: 'debug-home.png', fullPage: true });
});
