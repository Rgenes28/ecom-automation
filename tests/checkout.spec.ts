import { test, expect } from '@playwright/test'
import { CheckoutPage } from '../pages/checkout.page';
import { userData } from '../data/testdata';
import { OrderApiClient } from '../api-clients/order.api-client';



test.describe('@functional', () => {
    test('Complete Order', async ({ page, request }) => {
        const checkoutPage = new CheckoutPage(page);
        const orderApi = new OrderApiClient(request);

        await checkoutPage.goTo();
        await checkoutPage.fillFirstName(userData.name);
        await checkoutPage.fillLastName(userData.lastname);
        await checkoutPage.fillCountryRegion(userData.country);
        await checkoutPage.fillTownCity(userData.town);
        await checkoutPage.fillAddres(userData.address);
        await checkoutPage.fillPhone(userData.phone);
        await checkoutPage.fillEmail(userData.email);
        await checkoutPage.fillOtherNotes("ahsoaheoiasndojnasansioahsiahsiahsihaishaisaishaishaishaohsoa");
        await checkoutPage.fillDiscountCode("545ASDDE");
        await checkoutPage.clickDiscountCode();
        await checkoutPage.fillCreditCart(4242424242424242);
        await checkoutPage.fillMothYearExp("12/97");
        await checkoutPage.fillCvc(456);
        await checkoutPage.clickAggreeTerms();
        await checkoutPage.clickPlaceOrder();


        const orderId = await checkoutPage.getOrderId();
        console.log('Order ID:', orderId);

        const order = await orderApi.getOrderById(orderId);
        console.log('Order:', order);

    });
});