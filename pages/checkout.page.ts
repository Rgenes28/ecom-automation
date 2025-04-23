import { Page, Locator, expect } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameTextfield: Locator;
  readonly lastNameTextfield: Locator;
  readonly countryRegionTextfield: Locator;
  readonly townCityTextfield: Locator;
  readonly addressTextfield: Locator;
  readonly phoneNumberTextfield: Locator;
  readonly emailTextfield: Locator;
  readonly otherNotesTextfields: Locator;
  readonly dicountCodeTextfield: Locator;
  readonly discountCodeApplyButton: Locator;
  readonly creditCardNumberTextfield: Locator;
  readonly mothYearExpTextfield: Locator;
  readonly cvcTextFields: Locator;
  readonly aggreeTerms: Locator;
  readonly placeOrderButton: Locator;
  readonly messageOrderPlacedLabel: Locator;



  constructor(page: Page) {
    this.page = page;
    this.firstNameTextfield = page.locator('#first-name');
    this.lastNameTextfield = page.locator('#last-name');
    this.countryRegionTextfield = page.locator('#country');
    this.townCityTextfield = page.locator('#city');
    this.addressTextfield = page.locator('#address');
    this.phoneNumberTextfield = page.locator('#phone');
    this.emailTextfield = page.locator('#email');
    this.otherNotesTextfields = page.locator('#note');
    this.dicountCodeTextfield = page.locator('//input[@placeholder="Discount code"]');
    this.discountCodeApplyButton = page.locator('//a[@class="tf-btn btn-sm radius-3 btn-fill btn-icon animate-hover-btn"]');
    this.creditCardNumberTextfield = page.locator('//input[@placeholder="Card Number (try 4242424242424242)"]');
    this.mothYearExpTextfield = page.locator('div.tf-page-cart-footer > div > form > div.box.grid-2 > div:nth-child(1) > input[type=text]');
    this.cvcTextFields = page.locator('div.tf-page-cart-footer > div > form > div.box.grid-2 > div:nth-child(2) > input[type=text]');
    this.aggreeTerms = page.locator('#check-agree');
    this.placeOrderButton = page.locator('div.tf-page-cart-footer > div > form > button');
    this.messageOrderPlacedLabel = page.locator('#order-message > p');
  }
  async goTo() {
    await this.page.goto('https://automation-portal-bootcamp.vercel.app/checkout');
  }

  async fillFirstName(firstName: string) {
    await expect(this.firstNameTextfield).toBeVisible();
    await this.firstNameTextfield.fill(firstName);
  }
  async fillLastName(lastName: string) {
    await this.lastNameTextfield.fill(lastName);
  }
  async fillCountryRegion(country: string) {
    await this.countryRegionTextfield.selectOption({ label: country });
  }
  async fillTownCity(city: string) {
    await this.townCityTextfield.fill(city);
  }
  async fillAddres(addres: string) {
    await this.addressTextfield.fill(addres);
  }
  async fillPhone(phone: string) {
    await this.phoneNumberTextfield.fill(phone);
  }
  async fillEmail(email: string) {
    await this.emailTextfield.fill(email);
  }
  async fillOtherNotes(notes: string) {
    await this.otherNotesTextfields.fill(notes);
  }
  async fillDiscountCode(discountCode: string) {
    await expect(this.dicountCodeTextfield).toBeVisible();
    await this.dicountCodeTextfield.fill(discountCode);
  }
  async clickDiscountCode() {
    await this.discountCodeApplyButton.click();
  }
  async fillCreditCart(creditCart: number) {
    await this.creditCardNumberTextfield.fill(creditCart.toString());
  }
  async fillMothYearExp(mYearExp: string) {
    await this.mothYearExpTextfield.fill(mYearExp);
  }
  async fillCvc(cvc: number) {
    await this.cvcTextFields.fill(cvc.toString());
  }
  async clickAggreeTerms() {
    await this.aggreeTerms.click();
  }
  async clickPlaceOrder() {
    await this.placeOrderButton.click();
    const successMessage = this.page.locator('text=Order saved successfully!');
    await expect(successMessage).toBeVisible({ timeout: 5000 });
    await this.page.screenshot({ path: 'screenshots/saved-successfully.png', fullPage: true });
  }


  async fillBillingDetailsForm(name: string,
    lastname: string, country: string, town: string,
    address: string, phone: string, email: string, notes: string
  ) {
    await this.fillFirstName(name);
    await this.fillLastName(lastname);
    await this.fillCountryRegion(country);
    await this.fillTownCity(town);
    await this.fillAddres(address);
    await this.fillPhone(phone);
    await this.fillEmail(email);
    await this.fillOtherNotes(notes);
  }

  async fillDiscountForm(discountCode: string) {
    await this.dicountCodeTextfield.fill(discountCode);
    await this.discountCodeApplyButton.click();
  }

  async fillCreditCartForm(creditCart: number, mYearExp: string, cvc: number) {
    await this.creditCardNumberTextfield.fill(creditCart.toString());
    await this.mothYearExpTextfield.fill(mYearExp);
    await this.cvcTextFields.fill(cvc.toString());
    await this.aggreeTerms.click();

  }
  async getPlacedOrderMessage() {
    return await this.messageOrderPlacedLabel.innerText();
    
  }

  async getOrderId(): Promise<string> {
    const msg = await this.getPlacedOrderMessage();
    // Dividimos por ":" y tomamos la última parte, luego eliminamos espacios
    const parts = msg.split(':');
    return parts[parts.length - 1].trim();
  }


  // Todo los fill, selectors, clickeabl atomicos
  // 3 metodos en encapsulen eso metodos atomicos 
  /// 1 metodo que reciba todo lo de billing y llame a los metodos atomicos
  // 1 metodo que reciba un discount code y lo aplique
  // 1 metodo que llene la TC
  // precionar button place order


}