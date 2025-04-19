import { Page, Locator, expect } from "@playwright/test"; 

export class CartComponent {
    readonly page: Page;
    readonly checkOutButton: Locator;
    
    
    constructor(page:Page){
        this.page = page;
        this.checkOutButton = page.locator(
          'div.tf-mini-cart-view-checkout > a.tf-btn.btn-fill.animate-hover-btn.radius-3.w-100.justify-content-center > span'
        );
      }

    async clickCheckOutButton() {
      await this.checkOutButton.click();
    }

}