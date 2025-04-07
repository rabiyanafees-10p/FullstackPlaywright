import { request } from '@playwright/test';

class BookingAPI {
    constructor() { 
        this.baseURL = process.env.BASE_URL || 'https://restful-booker.herokuapp.com'; 
    }

    async createBooking(authToken, bookingData) {
        const requestContext = await request.newContext();

        try {
            const response = await requestContext.post(`${this.baseURL}/booking`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${authToken}`,
                },
                data: new URLSearchParams({
                    firstname: bookingData.firstname,
                    lastname: bookingData.lastname,
                    totalprice: bookingData.totalprice,
                    depositpaid: bookingData.depositpaid,
                    'bookingdates[checkin]': bookingData.bookingdates.checkin,
                    'bookingdates[checkout]': bookingData.bookingdates.checkout,
                }).toString(),
            });

            const responseBody = await response.json();
            if (!response.ok) {
                throw new Error(`Failed to create booking with status ${response.status}: ${responseBody}`);
            }

            return responseBody;
        } catch (error) {
            throw new Error(`Error in createBooking: ${error.message}`);
        }
    }

    async getBookings(authToken) {
        const requestContext = await request.newContext();

        try {
            const response = await requestContext.get(`${this.baseURL}/booking`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            const responseBody = await response.json();
            if (!response.ok) {
                throw new Error(`Failed to retrieve bookings with status ${response.status}`);
            }

            return responseBody;
        } catch (error) {
            throw new Error(`Error in getBookings: ${error.message}`);
        }
    }

    // Method to get a booking by ID
    async getBookingById(authToken, bookingId) {
        const requestContext = await request.newContext();

        try {
            const response = await requestContext.get(`${this.baseURL}/booking/${bookingId}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            return response; // Return the full response, including status
        } catch (error) {
            throw new Error(`Error in getBookingById: ${error.message}`);
        }
    }
}

export default BookingAPI;
