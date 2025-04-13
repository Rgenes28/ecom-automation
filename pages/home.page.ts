import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly profileIcon: Locator;
  readonly modalClose:Locator;
  readonly newRegister:Locator;
  readonly selectRacket:Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileIcon = page.locator("ul > li.nav-account > a");
    this.modalClose = page.locator("div.modal-top > span");
    this.newRegister = page.locator("div.bottom > div:nth-child(2) > button");
    this.selectRacket = page.locator("//*[@id='wrapper']/div/section[3]/div[2]/div[1]/div[2]/a");
  }

  async goto() {
    await this.page.goto('https://automation-portal-bootcamp.vercel.app');
  }
  async clickProfileIcon() {
    await this.profileIcon.click();
  }
  async clikCloseModal(){
    await this.modalClose.click();
  }
  async clickNewRegister(){
    await this.newRegister.click();
  }
  async selectRacketCard(){
    await this.selectRacket.waitFor({ state: 'visible',timeout: 60000 }); 
    await this.selectRacket.scrollIntoViewIfNeeded();
    await this.selectRacket.click({ force: true }); 
  }
}