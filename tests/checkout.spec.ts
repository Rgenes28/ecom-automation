import { test } from '@playwright/test'
import { CheckoutPage } from '../pages/checkout.page';
import { userData } from '../data/testdata';




test('Complete Order', async ({page})=>{
    const checkoutPage = new CheckoutPage(page);
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
    console.log('test exitoso');
    
    await page.pause();

    
});