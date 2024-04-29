exports.LoginPage = class login {
    constructor(page) {
        this.page = page;
        
        this.username = page.locator('#loginusername');
        this.password = page.locator('#loginpassword');
        this.login_button = page.getByRole('button', { name: 'Log in' });
    }

    async gotoLoginPage() {
        await this.page.goto('https://www.demoblaze.com/index.html');
    }

    async login(username, password) {
        await this.page.getByRole('link', { name: 'Log in' }).click();
        await this.username.fill(username);
        await this.password.fill(password);
        await this.login_button.click();
       // await expect(page.waitForSelector('#logout2')).toBeTruthy();
    }
};
