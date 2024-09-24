import { request } from '@playwright/test';

class AuthAPI {
    constructor() {
        this.baseURL = process.env.BASE_URL|| 'https://restful-booker.herokuapp.com' ;
    }

    async authenticate(username, password) {
        const requestContext = await request.newContext();

        const response = await requestContext.post(`${this.baseURL}/auth`, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const responseBody = await response.text();
            throw new Error(`Authentication failed with status ${response.status}: ${responseBody}`);
        }

        return await response.json();
    }
}

export default AuthAPI;
