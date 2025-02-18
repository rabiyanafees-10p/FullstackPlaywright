import { request } from '@playwright/test';

class DeleteAPI {
    async deleteBooking(token, bookingId) {
        const requestContext = await request.newContext({
            baseURL: 'https://restful-booker.herokuapp.com',
            extraHTTPHeaders: {
                'Content-Type': 'application/json',
                'Cookie': `token=${token}`
            }
        });

        const response = await requestContext.delete(`/booking/${bookingId}`);
        return response;
    }
}

export default DeleteAPI;
