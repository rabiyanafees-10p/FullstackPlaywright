export class PlaceOrder {
    constructor(page) {
        this.page = page;

        // Define locators
        this.name = this.page.locator('//*[@id="name"]');
        this.country = this.page.getByLabel('Country:');
        this.city = this.page.getByLabel('City:');
        this.card = this.page.getByLabel('Credit card:');
        this.month = this.page.getByLabel('Month:');
        this.year = this.page.getByLabel('Year:');
    }

    async placeOrder() {
        await this.page.getByRole('button', { name: 'Place Order' }).click();
    }

    async userDetail(username, country, city, cardNumber, month, year) {
        await this.name.fill(username);
        await this.country.fill(country);
        await this.city.fill(city);
        await this.card.fill(cardNumber);
        await this.month.fill(month);
        await this.year.fill(year);
        await this.page.getByRole('button', { name: 'Purchase' }).click();
    }

    async successMessage() {
        await this.page.getByRole('button', { name: 'OK' }).click();
    }
}
