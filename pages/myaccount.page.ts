import { Page,Locator } from "@playwright/test";

export class MyAccountPage {
    readonly page:Page;
    readonly clickLogo:Locator;
    readonly logOut:Locator;


    constructor(page:Page){
        this.page = page;
        this.clickLogo = page.locator("#header > div > div > div.col-xl-3.col-md-4.col-6 > a");
        this.logOut = page.locator("//a[@class='my-account-nav-item']");
    
    }
    async clickLogoEcomus(){
        this.clickLogo.click();
    }
    async clickLogOut(){
        this.logOut.click();
    }
}

