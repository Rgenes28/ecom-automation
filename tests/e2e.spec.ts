import { test } from '@playwright/test'
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
  await homePage.clikCloseModal();
  await homePage.clickProfileIcon();
  await loginPage.clickNewRegister();
  await registerPage.fillFormRegisterUser(
    userData.name,
    userData.lastname,
    userData.email,
    userData.password
  );
  await loginPage.loginCredentials(userData.email, userData.password);
  await myAccountPage.clickLogoEcomus();
  await homePage.clikCloseModal();
  await homePage.selectfirstRaquet();
  await productPage.selectColorFromPicker("white");
  await productPage.selectSizeFromPicker('s');
  await productPage.setItemQuantity(2);
  await productPage.clickAddToCartButton();
 
});
