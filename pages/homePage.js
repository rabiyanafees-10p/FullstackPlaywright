exports.HomePage = class PageActions {
    constructor(page) {
        this.page = page;
    }

    async selectCategory(text) {
        await this.page.click(`//*[contains(text(), "${text}")]`);
    }

    async selectItem(text) {
        await this.page.click(`//a[contains(text(), "${text}")]`);[]
    }

    async clickAddToCartLink() {
        return await this.page.getByRole('link', { name: 'Add to cart' });

        //Dialog box close
        const dialog = await page.waitForEvent('dialog');
        console.log('Dialog message:', dialog.message());
        await dialog.accept();
    }
}

