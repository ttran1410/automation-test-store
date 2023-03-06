import { expect, Locator, Page } from "@playwright/test";

export class TShirtPage {

    readonly page: Page;
    readonly mainText: Locator;
    readonly dropdownBox: Locator;
    readonly path: string;

    constructor(page: Page) {
        this.page = page;
        this.mainText = page.locator('[class="maintext"]');
        this.dropdownBox = page.locator('#sort');
        this.path = '?rt=product/category&path=68_70&sort=p.price-ASC&limit=20';
    }

    async shouldHaveText (input: string) {
        await expect(this.mainText).toHaveText(input);
    }

    async selectDropDownOption(input: string) {
        if(this.dropdownBox) {
            await this.dropdownBox.selectOption({label: input});
        }
    }

    async clickOnAddToCart() {
        await this.page.click('[title="Add to Cart"]');
    }

    async waitForPageLoad() {
        await this.page.waitForURL('https://automationteststore.com/index.php' + this.path);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async verifyURL() {
        expect(this.page.url()).toContain(this.path);
    }
}
