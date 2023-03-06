import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { mainMenu } from '../pages/mainMenu';
import { TShirtPage } from '../pages/TShirtPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CheckOutPage } from '../pages/CheckOutPage';

test('Verify sort by Price Low > High on T-Shirt page', async ({ page }) => {
  const homepage = new HomePage(page);
  const mainmenu = new mainMenu(page);
  const tShirtsPage = new TShirtPage(page);
  const productdetailpage = new ProductDetailPage(page);
  const checkoutpage = new CheckOutPage(page);

  await homepage.visitWebApp();

  //Hover the menu
  await mainmenu.hoverOnApparelAndAccessories();
  
  // I can see Shoes and T-short categories in the menu
  await mainmenu.shoesVisible();
  await mainmenu.tShirtsVisible();
  
  // Click on the T-shirt menu.
  await mainmenu.clickOnTshirts();

  // I can see the T-shirt page
  await tShirtsPage.shouldHaveText('T-shirts');

  // I can select Sort by Price Low > High on T-Shirt page
  await tShirtsPage.selectDropDownOption('Price Low > High');

  // wait for the page to compele loading
  await tShirtsPage.waitForPageLoad();

  // verify urL
  await tShirtsPage.verifyURL();

  // sort the prices into an array
const itemsPriceLocator = await page.$$('.list-inline .oneprice');
const prices: number[] = [];

for (const itemPriceElement of itemsPriceLocator) {
  const price = await itemPriceElement.getProperty('textContent');
  const priceText = await price.jsonValue();
  // Extract numeric values from text
  const priceNumber = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
  prices.push(priceNumber);
}

// verify all items were sorted by Price Low > High
for (let i = 1; i < prices.length; i++) {
  if (prices[i] < prices[i - 1]) {
    throw new Error('Prices are not sorted in ascending order');
  }
}

// Click on Add to Cart icon
tShirtsPage.clickOnAddToCart();

// Should see details
await productdetailpage.shouldSeeProductDetail();

// Click on Add to Cart button
await productdetailpage.clickOnAddToCartButton();

// Should see shopping cart Title
await checkoutpage.shouldTitleVisible();

});
