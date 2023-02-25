import { test, expect } from '@playwright/test';

test('Verify sort by Price Low > High on T-Shirt page', async ({ page }) => {
  await page.goto('https://automationteststore.com/');

  //Hover the menu
  const menu = page.locator('[class="nav-pills categorymenu"]').locator('text=Apparel & accessories')
  await menu.hover();

  //I can see Shoes and T-short categories in the menu
  await expect(page.locator('[class="nav-pills categorymenu"]').locator('text=Shoes')).toBeVisible();
  await expect(page.locator('[class="nav-pills categorymenu"]').locator('text=T-shirts')).toBeVisible();

  // Click on the T-shirt menu.
  await page.click('text=T-shirts');

  // I can see the T-shirt page
  await expect(page.locator('[class="maintext"]')).toHaveText('T-shirts');

  // I can select Sort by Price Low > High on T-Shirt page
  const dropdownBox = await page.$('#sort');
  if (dropdownBox) {
    await dropdownBox.selectOption({ label: 'Price Low > High' });
  }

  // wait for the page to compele loading
  await page.waitForURL('https://automationteststore.com/index.php?rt=product/category&path=68_70&sort=p.price-ASC&limit=20');
  await page.waitForLoadState('domcontentloaded');

  // sort the prices into an array
  const itemsPriceLocator = await page.$$('.list-inline .oneprice');
  const prices = [];

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

  // Add item to cart
  await page.click('[title="Add to Cart"]');

  // Should see details
  await expect(page.locator('text=Size')).toBeVisible();
  await expect(page.locator('text=Total Price')).toBeVisible();

  // Click on Add to Cart button
  await page.click('text=Add to Cart');

  // Should see shopping cart page
  await expect(page.locator('text=SHOPPING CART')).toBeVisible();
});
