import { expect, Locator, Page } from "@playwright/test";

export class mainMenu {

    readonly page: Page;
    readonly accessories: Locator;
    readonly shoes: Locator;
    readonly tShirts: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accessories = page.locator('[class="nav-pills categorymenu"]').locator('text=Apparel & accessories');
        this.shoes = page.locator('[class="nav-pills categorymenu"]').locator('text=Shoes');
        this.tShirts = page.locator('[class="nav-pills categorymenu"]').locator('text=T-shirts');
    }

    async hoverOnApparelAndAccessories() {
        await expect(this.accessories).toBeVisible();
        await this.accessories.hover();
    }

    async shoesVisible() {
        await expect(this.shoes).toBeVisible();
    }
    async tShirtsVisible() {
        await expect(this.tShirts).toBeVisible();
    }

    async clickOnShoes() {
        await this.shoes.waitFor({state:"visible"});
        await this.shoes.click();
    }

    async clickOnTshirts() {
        await this.tShirts.waitFor({state:"visible"});
        await this.tShirts.click();
    }
}