import { Page,Locator } from "@playwright/test";

export class ProductPage {
    readonly page:Page;
    readonly colorOptions:Locator;
    readonly sizeOptions:Locator;
    readonly quantityInput:Locator;
    readonly addTocart:Locator;
    //readonly quantitySpanMinus:Locator;
    //readonly quantitySpanPlus:Locator;

    constructor(page:Page){
        this.page = page;
        this.colorOptions = page.locator('(//span[@class="btn-checkbox bg-color-black"])[1]');
        this.sizeOptions = page.locator("//div[@class='tf-product-info-list other-image-zoom']//p[contains(text(),'XL')]");
        this.quantityInput = page.locator('(//input[@name="number"])[1]');
        this.addTocart = page.locator('//*[@id="wrapper"]/section[1]/div[1]/div/div/div[2]/div/div[2]/div[8]/form/a[1]/span[1]')
        //this.quantitySpanMinus = page.locator('(//span[@class="btn-quantity minus-btn"])[1]');
        //this.quantitySpanPlus = page.locator('(//span[@class="btn-quantity plus-btn"])[1]');

    }
    async selectColor() {
        await this.colorOptions.click();
    }

    async selectSize() {
        await this.sizeOptions.click();
        
    }
    async fillQuantity(quantity: number) {
        await this.quantityInput.fill(''); 
        await this.quantityInput.fill(quantity.toString());
    }
    async clickAddToCart(){
        await this.addTocart.click();
    }


}