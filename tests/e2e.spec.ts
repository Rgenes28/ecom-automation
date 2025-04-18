import { test } from '@playwright/test'
import { userData } from '../data/testdata'
import { HomePage } from '../pages/home.page'
import { LoginPage } from '../pages/login.page'
import { RegisterPage } from '../pages/register.page'
import { MyAccountPage } from '../pages/myaccount.page'
import { ProductPage } from '../pages/product.page'
import { CheckoutPage } from '../pages/checkout.page'

const authToken = 'mi-token-super-secreto';

test.afterEach(async ({ request }) => {
  const response = await request.get(`https://automation-portal-bootcamp.vercel.app/api/user?email=${userData.email}`);
  const user = await response.json();
  
  console.log(user.id); 
  if (user?.id) {
    const deleteUser = await request.delete(
      `https://automation-portal-bootcamp.vercel.app/api/user/${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    );
    console.log(`Usuario eliminado correctamente: ${userData.email}`);
  } else {
    console.warn(`Usuario no encontrado para eliminar: ${userData.email}`);
  }
});

test('End to End Test', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const myAccountPage = new MyAccountPage(page);
  const productPage = new ProductPage(page);
  const checkoutPage = new CheckoutPage(page);

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
  await productPage.cartModal.clickCheckOutButton();
  await checkoutPage.fillBillingDetailsForm(userData.name,userData.lastname,
    userData.country,userData.town,userData.address,
    userData.phone,userData.email,userData.notes
  );
  await checkoutPage.fillDiscountForm('leon123');
  await checkoutPage.fillCreditCartForm(4242424242424242,"12/97",456);
 
});
