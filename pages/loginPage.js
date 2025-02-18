export class LoginPage {
    constructor(page) {
        this.page = page;
        this.username = page.locator('#loginusername');
        this.password = page.locator('#loginpassword');
        this.login_button = page.getByRole('button', { name: 'Log in' });
        this.error_message = page.locator('.alert-danger');
    }

    async gotoLoginPage() {
        await this.page.goto('https://www.demoblaze.com/index.html');
    }

    async login(username, password) {
        await this.page.getByRole('link', { name: 'Log in' }).click();
        await this.username.fill(username);
        await this.password.fill(password);
        await this.login_button.click();
    }

    async isLoginSuccessful() {
        return await this.page.locator('#logout2').isVisible();
    }

    async getErrorMessage() {
        return await this.error_message.textContent();
    }
}
