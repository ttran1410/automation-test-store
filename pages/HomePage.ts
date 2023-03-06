import { Page } from "@playwright/test";

export class HomePage {

    readonly page: Page;
    readonly url: string;

    constructor(page: Page) {
        this.page = page;
        this.url = 'https://automationteststore.com';
    }

    async visitWebApp() {
        await this.page.goto(this.url);
    }
}
