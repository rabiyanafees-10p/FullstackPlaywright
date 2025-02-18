export class Cart {
    constructor(page) {
        this.page = page;
    }

    async goToCart() {
        await this.page.getByRole('link', { name: 'Cart', exact: true }).click();
    }
}
