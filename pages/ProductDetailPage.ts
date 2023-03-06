import { expect, Locator, Page } from "@playwright/test";

export class ProductDetailPage {

    readonly page: Page;
    readonly totalPrice: Locator;
    readonly size: Locator;
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.totalPrice = page.locator('text=Total Price');
        this.size = page.locator('text=Size');
        this.addToCartButton = page.locator('text=Add to Cart');
    } 
    
    async shouldSeeProductDetail() {
        await expect(this.size).toBeVisible();
        await expect(this.totalPrice).toBeVisible();
    }

    async clickOnAddToCartButton() {
        await this.addToCartButton.waitFor({state:"visible"});
        await this.addToCartButton.click();
    }
}