import { Page, Locator } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly EmailInput:Locator;
    readonly PasswordInput:Locator;
    readonly LoginButton:Locator;
    

    
    
    constructor(page:Page) {
        this.page = page;
        this.EmailInput = page.locator('#loginEmail');
        this.PasswordInput = page.locator('#loginPassword');
        this.LoginButton = page.locator('#login > div > form > div:nth-child(4) > button');
       
        
    }
    async goTo(){
        await this.page.goto('https://automation-portal-bootcamp.vercel.app/login');
    }
    async loginCredentials(email:string,password:string){
        await this.EmailInput.fill(email);
        await this.PasswordInput.fill(password);
        await this.LoginButton.click();
    }
    
    

}