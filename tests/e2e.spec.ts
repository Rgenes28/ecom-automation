import { test, expect } from '@playwright/test'
import { userData } from '../data/testdata'
import { HomePage } from '../pages/home.page'
import { LoginPage } from '../pages/login.page'
import { RegisterPage } from '../pages/register.page'
import { MyAccountPage } from '../pages/myaccount.page'
import { ProductPage } from '../pages/product.page'
import { CheckoutPage } from '../pages/checkout.page'
import { OrderApiClient } from '../api-clients/order.api-client'
import { UserApiClient } from '../api-clients/user.api-client'


const authToken = 'mi-token-super-secreto';
const testEmail2 = 'rangers@gmail.com'

test.beforeAll(async ({ request }) => {
  const userApi = new UserApiClient(request);

  for (const email of [userData.email, testEmail2]) {
    const user = await userApi.findUserByEmail(email);

    if (user?.id) {
      const deletedUser = await userApi.deleteUserById(user.id, authToken);
      console.log(`Usuario ${email} eliminado:`, deletedUser);
    } else {
      console.log(`Usuario ${email} no encontrado.`);
    }
  }
});

test.describe('@e2e', () => {
  test('doing a checkout e2e successfully', async ({ page, request }) => {
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const myAccountPage = new MyAccountPage(page);
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);
    const orderApi = new OrderApiClient(request);

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
    console.log('Order ID:', orderId);

    const order = await orderApi.getOrderById(orderId);
    console.log('Order:', order);

    //Implementar expect para comparar 4 valores del json importante del item 
    expect(order.items[0].title).toBe('Franklin Signature Pickleball Paddle');
    expect(order.items[0].price).toBe(100);
    expect(order.items[0].quantity).toBe(5);
    expect(order.items[0].orderId).toBe(order.id);


  });

  test('doing a checkout e2e unsuccessfully', async ({ page }) => {
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
      testEmail2,
      userData.password
    );
    await loginPage.loginCredentials(testEmail2, userData.password);
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
    await checkoutPage.fillCreditCartForm(4242424242424241, "12/97", 456);
    await checkoutPage.clickPlaceOrder();

    const messageOfOrderPlaced = await checkoutPage.getPlacedOrderMessage();
    expect(messageOfOrderPlaced).toContain('Card not valid for this jurisdiction');
  });
});
