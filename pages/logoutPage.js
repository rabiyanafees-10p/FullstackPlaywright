export class LogoutPage {
    constructor(page) {      
        this.page = page;
        this.logoutLink = this.page.getByRole('link', { name: 'Log out' });
    }

    async gotoLogoutPage() {
        await this.logoutLink.waitFor({ state: 'visible' });
        await this.logoutLink.click();
    }
}
