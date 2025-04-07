// UpdateBookingAPI.js
import { request } from '@playwright/test';

class UpdateBookingAPI {
    constructor() {
        this.baseURL = process.env.BASE_URL || 'https://restful-booker.herokuapp.com';
    }

    async updateBooking(authToken, bookingId, updatedBookingData) {
        const requestContext = await request.newContext();

        try {
            const response = await requestContext.put(`${this.baseURL}/booking/${bookingId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authToken}`  // Use Authorization header
                },
                data: JSON.stringify(updatedBookingData)
            });

            // Handle non-JSON response (Forbidden error)
            if (response.status() === 403) {
                throw new Error(`Update booking failed: Forbidden (403). Check token and booking permissions.`);
            }

            const responseBody = await response.json();

            if (!response.ok()) {
                throw new Error(`Failed to update booking with status ${response.status()}: ${responseBody}`);
            }

            return responseBody;
        } catch (error) {
            throw new Error(`Error in updateBooking: ${error.message}`);
        }
    }
}

export default UpdateBookingAPI;