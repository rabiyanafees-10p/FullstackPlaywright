import fs from 'fs';
import { test, expect } from '@playwright/test';
import AuthAPI from '../../api/AuthAPI';
import BookingAPI from '../../api/BookingAPI';
import path from 'path';

// load testdata.json file
const testDataPath = path.join(process.cwd(), 'testData.json');

if (!fs.existsSync(testDataPath)) {
    throw new Error(`testData.json not found at path: ${testDataPath}`);
}

// Load and parse test data
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));
const { username, password } = testData.api.auth; // Authentication data
const bookingData = testData.api.booking; // Booking data

let authToken;   //get the authtoken

test.describe('@api API Authentication Tests', () => {
    test('POST /auth - Authenticate User', async () => {
        const authAPI = new AuthAPI();
        const authResponse = await authAPI.authenticate(username, password);
        
        expect(authResponse).toBeDefined();
        expect(authResponse.token).toBeTruthy();
        
        authToken = authResponse.token;
    });

    //-------------------------------------
    test('POST booking - Create Booking', async () => {
        const bookingAPI = new BookingAPI();
        const createdBooking = await bookingAPI.createBooking(authToken, bookingData);
        
        expect(createdBooking).toBeDefined();
        expect(createdBooking.booking.firstname).toBe(bookingData.firstname);
        expect(createdBooking.booking.lastname).toBe(bookingData.lastname);   
    });
//----------------------------------------
    test('GET /booking - Retrieve Bookings', async () => {
        const bookingAPI = new BookingAPI();
        const bookings = await bookingAPI.getBookings(authToken);
        
        expect(bookings).toBeDefined();
        expect(Array.isArray(bookings)).toBe(true);
    });
});
