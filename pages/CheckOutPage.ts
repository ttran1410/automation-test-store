import { expect, Locator, Page } from "@playwright/test";

export class CheckOutPage {

    readonly page: Page;
    readonly mainText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mainText = page.locator('text=SHOPPING CART');
    }

    async shouldTitleVisible() {
        await expect(this.mainText).toBeVisible();
    }
}