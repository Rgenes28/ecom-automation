import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly profileIcon: Locator;
  readonly modalClose:Locator;
  readonly firstRaquet :Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileIcon = page.locator("ul > li.nav-account > a");
    this.modalClose = page.locator("div.modal-top > span");
    this.firstRaquet = page.locator("div:nth-child(1) > div.card-product-wrapper > a");
  }

  async goto() {
    await this.page.goto('https://automation-portal-bootcamp.vercel.app');
  }
  async clickProfileIcon() {
    await this.profileIcon.click();
  }
  async clikCloseModal(){
    await expect(this.modalClose).toBeVisible();
    await this.modalClose.click();
  }
  async selectfirstRaquet(){
    await this.firstRaquet.click();
    
  }
}