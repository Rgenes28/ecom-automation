import { test, expect } from '@playwright/test'
import { userData } from '../data/testdata'
import { HomePage } from '../pages/home.page'
import { LoginPage } from '../pages/login.page'
import { RegisterPage } from '../pages/register.page'
import { MyAccountPage } from '../pages/myaccount.page'
import { ProductPage } from '../pages/product.page'
import { CheckoutPage } from '../pages/checkout.page'
import { UserApiClient } from '../api-clients/user.api-client'


const authToken = 'mi-token-super-secreto';

test.afterEach(async ({ request }) => {
  const userApi = new UserApiClient(request);

  const user = await userApi.findUserByEmail(userData.email);

  console.log('Usuario encontrado:', user.id);

  if (user.id) {
    const deletedUser = await userApi.deleteUserById(user.id, authToken);
    console.log('Usuario eliminado:', deletedUser);
  } else {
    console.log('No se encontró el usuario para eliminar');
  }
});

test('End to End Test', async ({ page, request }) => {
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
  await productPage.selectSizeFromPicker('m');
  await productPage.setItemQuantity(4);
  await productPage.clickAddToCartButton();
  await productPage.cartModal.clickCheckOutButton();
  await checkoutPage.fillBillingDetailsForm(userData.name, userData.lastname,
    userData.country, userData.town, userData.address,
    userData.phone, userData.email, userData.notes
  );
  await checkoutPage.fillDiscountForm('leon123');
  await checkoutPage.fillCreditCartForm(4242424242424242, "12/97", 456);
  await checkoutPage.clickPlaceOrder();
  
  const messageOfOrderPlaced = await checkoutPage.getPlacedOrderMessage()
  expect(messageOfOrderPlaced).toContain('Order saved successfully! Your order ID is')

  const orderId = await checkoutPage.getOrderId();
  console.log(orderId)
  const orderResponse = await request.get(
    `https://automation-portal-bootcamp.vercel.app/api/orders/${orderId}`,
  );
  expect(orderResponse.ok()).toBeTruthy();

  const order = await orderResponse.json();
  console.log(order)
  //Implementar expect para comparar 4 valores del json importante del item 
  expect(order.items[0].title).toBe('Franklin Signature Pickleball Paddle');
  expect(order.items[0].price).toBe(100);
  expect(order.items[0].quantity).toBe(5); 
  expect(order.items[0].orderId).toBe(order.id);

  


});
