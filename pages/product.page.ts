import { Page, Locator, expect } from "@playwright/test"; 
import { CartComponent } from "./cart.component";

type ColorOption = 'beige' | 'black' | 'blue' | 'white';
type SizeOption = 's' | 'm' | 'l' | 'xl';

export class ProductPage {
    readonly page: Page;
    readonly colorPicker: Locator;
    readonly qtyItemSelector: Locator;
    readonly sizeItemSelector: Locator;
    readonly addToCartButton: Locator;
    readonly cartModal: CartComponent;
    
    constructor(page:Page){
      this.page = page;
      this.colorPicker = page.locator(
        'div:nth-child(2) > div > div.tf-product-info-list.other-image-zoom > div.tf-product-info-variant-picker > div:nth-child(1) > form'
      );
      this.qtyItemSelector = page.locator(
        'div:nth-child(2) > div > div.tf-product-info-list.other-image-zoom > div.tf-product-info-quantity > div.wg-quantity'
      );
      this.sizeItemSelector = page.locator(
        'div:nth-child(2) > div > div.tf-product-info-list.other-image-zoom > div.tf-product-info-variant-picker > div:nth-child(2) > form'
      )
      this.addToCartButton = page.locator(
        'div:nth-child(2) > div > div.tf-product-info-list.other-image-zoom > div.tf-product-info-buy-button > form > a.tf-btn.btn-fill.justify-content-center.fw-6.fs-16.flex-grow-1.animate-hover-btn'
      )
      this.cartModal = new CartComponent(page);
    }
    
    async selectColorFromPicker(colorToPick: ColorOption) {
        const colorId = `values-${colorToPick.toLowerCase()}`;
        const label = this.colorPicker.locator(`label[for="${colorId}"]`);
        await label.click();
    }

    async setItemQuantity(quantity: number) {
        const plusBtn = this.qtyItemSelector.locator('.plus-btn');
      
        for (let i = 0; i < quantity; i++) {
          await plusBtn.click();
        }
    }

      async selectSizeFromPicker(sizeToPick: SizeOption) {
        const sizeId = `values-${sizeToPick.toLowerCase()}`;
        const label = this.sizeItemSelector.locator(`label[for="${sizeId}"]`);
        await label.waitFor({ state: 'visible' });
        await label.click();
    }

      async clickAddToCartButton() {
        await this.addToCartButton.click();
    }

}