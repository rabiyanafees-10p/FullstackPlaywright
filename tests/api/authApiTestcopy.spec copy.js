import fs from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';
import AuthAPI from '../../api/AuthAPI';
import BookingAPI from '../../api/BookingAPI';
import UpdateBookingAPI from '../../api/UpdateBookingAPI';

// Load testdata.json file
const testDataPath = path.join(process.cwd(), 'testData.json');
if (!fs.existsSync(testDataPath)) {
    throw new Error(`testData.json not found at path: ${testDataPath}`);
}

// Load and parse test data
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));
const { username, password } = testData.api.auth; // Authentication data
const bookingData = testData.api.booking; // Booking data
const updatedBookingData = testData.api.updatedBooking; // Updated booking data

let authToken;
let bookingId;

test.describe('@api API Authentication Tests', () => {
    test('POST /auth - Authenticate User', async () => {
        const authAPI = new AuthAPI();
        const authResponse = await authAPI.authenticate(username, password);
        
        expect(authResponse).toBeDefined();
        expect(authResponse.token).toBeTruthy();
        
        authToken = authResponse.token; // Assign token here
        console.log(`Auth Token: ${authToken}`);
    });

    test('POST booking - Create Booking', async () => {
        const bookingAPI = new BookingAPI();
        const createdBooking = await bookingAPI.createBooking(authToken, bookingData);

        expect(createdBooking).toBeDefined();
        expect(createdBooking.booking.firstname).toBe(bookingData.firstname);
        expect(createdBooking.booking.lastname).toBe(bookingData.lastname);

        bookingId = createdBooking.bookingid;  // Capture the booking ID
        console.log(`Booking ID created: ${bookingId}`);  // Log the booking ID
    });

    test('PUT /booking/:id - Update Booking', async () => {
        const updateBookingAPI = new UpdateBookingAPI();
        console.log(`Attempting to update booking with ID: ${bookingId} using Auth Token: ${authToken}`);

        const updatedBooking = await updateBookingAPI.updateBooking(authToken, bookingId, updatedBookingData);

        // Log the response for debugging
        console.log('Update Booking Response:', updatedBooking);

        expect(updatedBooking).toBeDefined();
        expect(updatedBooking.firstname).toBe(updatedBookingData.firstname);
        expect(updatedBooking.lastname).toBe(updatedBookingData.lastname);
    });
});
