import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly EmailInput:Locator;
    readonly PasswordInput:Locator;
    readonly LoginButton:Locator;
    readonly newRegister:Locator;
    
    
    constructor(page:Page) {
        this.page = page;
        this.EmailInput = page.locator('#loginEmail');
        this.PasswordInput = page.locator('#loginPassword');
        this.LoginButton = page.locator('#login > div > form > div:nth-child(4) > button');
        this.newRegister = page.locator("div.bottom > div:nth-child(2) > button");
       
        
    }
    async goTo(){
        await this.page.goto('https://automation-portal-bootcamp.vercel.app/login');
    }
    async clickNewRegister(){
        await expect(this.newRegister).toBeVisible();
        await this.newRegister.click();
    }
    async loginCredentials(email:string,password:string){
        await this.EmailInput.fill(email);
        await this.PasswordInput.fill(password);
        await this.LoginButton.click();
        await this.page.waitForURL('**/my-account');
    }
    
    

}