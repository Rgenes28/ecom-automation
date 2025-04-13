import { Page, Locator } from "@playwright/test"; 


export class RegisterPage {
    readonly page: Page;
    readonly nameInput:Locator;
    readonly LastNameInput:Locator;
    readonly EmailInput:Locator;
    readonly PasswordInput:Locator;
    readonly RegisterButton:Locator;

    constructor(page:Page){
        this.page = page;
        this.nameInput = page.locator('#register-form > div:nth-child(1) > input');
        this.LastNameInput = page.locator('#register-form > div:nth-child(2) > input');
        this.EmailInput = page.locator('#register-form > div:nth-child(3) > input');
        this.PasswordInput = page.locator('#register-form > div.tf-field.style-1.mb_30 > input');
        this.RegisterButton = page.locator('#register-form > div.mb_20 > button');

    }
    async goTo() {
        await this.page.goto('https://automation-portal-bootcamp.vercel.app/register');
    }
   
    /*async fillName(name: string) {
        await this.nameInput.fill(name);
    }
    async fillLastName(Lastname: string) {
        await this.LastNameInput.fill(Lastname);
    }
    async fillEmail(Email: string) {
        await this.EmailInput.fill(Email);
    }
    async fillPassword(Password: string) {
        await this.PasswordInput.fill(Password);
    }
    async clickRegisterButton(){
        await this.RegisterButton.click();
    
    }*/
    async waitForAlertAfterSubmit(): Promise<string> {
        const dialogUserRegistered = await this.page.waitForEvent('dialog');
        const message = dialogUserRegistered.message();
        await dialogUserRegistered.accept();
        return message;
      
    }
    async fillRegisterUser(Name:string,Lastname: string,Email: string,Password: string){
        await this.nameInput.fill(Name);
        await this.LastNameInput.fill(Lastname);
        await this.EmailInput.fill(Email);
        await this.PasswordInput.fill(Password);
        await this.RegisterButton.click();

    }


}