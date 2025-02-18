import { test, expect } from '@playwright/test';
import AuthAPI from '../../api/AuthAPI';
import BookingAPI from '../../api/BookingAPI';
import { data as testData } from '../../testData'; // Ensure correct import

// Extracting test data
const { username, password } = testData.api.auth; 
const bookingData = testData.api.booking; 

let authToken;

test.describe('@api API Authentication Tests', () => {
    test('POST /auth - Authenticate User', async () => {
        const authAPI = new AuthAPI();
        const authResponse = await authAPI.authenticate(username, password);
        
        expect(authResponse).toBeDefined();
        expect(authResponse.token).toBeTruthy();
        
        authToken = authResponse.token;
    });

    test('POST booking - Create Booking', async () => {
        const bookingAPI = new BookingAPI();
        const createdBooking = await bookingAPI.createBooking(authToken, bookingData);
        
        expect(createdBooking).toBeDefined();
        expect(createdBooking.booking.firstname).toBe(bookingData.firstname);
        expect(createdBooking.booking.lastname).toBe(bookingData.lastname);   
    });

    test('GET /booking - Retrieve Bookings', async () => {
        const bookingAPI = new BookingAPI();
        const bookings = await bookingAPI.getBookings(authToken);
        
        expect(bookings).toBeDefined();
        expect(Array.isArray(bookings)).toBe(true);
    });
});
