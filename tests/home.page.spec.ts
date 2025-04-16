import { test, expect} from '@playwright/test';
import { HomePage } from '../pages/home.page';

test('Visit Website', async({ page }) =>{
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.clikCloseModal();
  await homePage.clickProfileIcon();
  //await page.waitForTimeout(10000);

 
});
