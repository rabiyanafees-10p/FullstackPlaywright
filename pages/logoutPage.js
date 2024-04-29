exports.LogoutPage = class LogoutPage {
    constructor(page) {      
        this.page = page;
    }
  
    async gotoLogoutPage() {
        await this.page.getByRole('link', { name: 'Log out' }).click()
    }
}
