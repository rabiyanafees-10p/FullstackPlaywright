import fs from 'fs';
import { test, expect } from '@playwright/test';
import AuthAPI from '../../api/AuthAPI';
import UpdateBookingAPI from '../../api/UpdateBookingAPI';
import path from 'path';

// Load testData.json file
const testDataPath = path.join(process.cwd(), 'testData.json');

if (!fs.existsSync(testDataPath)) {
    throw new Error(`testData.json not found at path: ${testDataPath}`);
}

// Load and parse test data
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));
// Authentication data
const { username, password } = testData.api.auth;

// Updated booking data
const updatedBookingData = testData.api.updatedBooking;

let authToken;
let bookingId; // This should be dynamically assigned

test.describe('@api Update Booking API Tests', () => {
    
    // Authenticate before all tests
    test.beforeAll(async () => {
        const authAPI = new AuthAPI();
        const authResponse = await authAPI.authenticate(username, password);

        expect(authResponse).toBeDefined();
        expect(authResponse.token).toBeTruthy();
        
        authToken = authResponse.token;

        console.log(`Auth Token: ${authToken}`);  // Log token here
    });

    test.beforeEach(async () => {
        const bookingAPI = new BookingAPI(); // Ensure BookingAPI is imported
        const createdBooking = await bookingAPI.createBooking(authToken, testData.api.booking);

        bookingId = createdBooking.bookingid; // Get the booking ID from the created booking
        console.log(`Booking ID created: ${bookingId}`); // Log booking ID
    });

    test('PUT /booking/:id - Update Booking', async () => {
        const updateBookingAPI = new UpdateBookingAPI();

        const updatedBooking = await updateBookingAPI.updateBooking(authToken, bookingId, updatedBookingData);

        expect(updatedBooking).toBeDefined();
        expect(updatedBooking.firstname).toBe(updatedBookingData.firstname);
        expect(updatedBooking.lastname).toBe(updatedBookingData.lastname);

        console.log(`Auth Token: ${authToken}`); // Log token again if needed
    });
});
