import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly EmailInput: Locator;
    readonly PasswordInput: Locator;
    readonly LoginButton: Locator;
    readonly newRegister: Locator;
    readonly forgotPasswordLink:Locator;


    constructor(page: Page) {
        this.page = page;
        this.EmailInput = page.locator('#loginEmail');
        this.PasswordInput = page.locator('#loginPassword');
        this.LoginButton = page.locator('#login > div > form > div:nth-child(4) > button');
        this.newRegister = page.locator("div.bottom > div:nth-child(2) > button");
        this.forgotPasswordLink = page.locator('#login > div > form > div.mb_20 > a')


    }
    async goTo() {
        await this.page.goto('https://automation-portal-bootcamp.vercel.app/login');
    }
    async clickNewRegister() {
        await expect(this.newRegister).toBeVisible();
        await this.newRegister.click();
    }
    async loginCredentials(email: string, password: string) {
        await this.EmailInput.fill(email);
        await this.PasswordInput.fill(password);
        await this.LoginButton.click();
        await this.page.waitForURL('**/my-account');
    }
    async fillEmailTextField(email: string) {
        await this.EmailInput.fill(email);
    }

    async fillPasswordTextField(password: string) {
        await this.PasswordInput.fill(password);
    }

    async clickLoginButton() {
        await this.LoginButton.click();
        await this.page.waitForLoadState('networkidle')
    }

    async clickForgotPasswordLink() {
        await this.forgotPasswordLink.click();
    }

    async getTitle() {
        return await this.page.title();
    }


}