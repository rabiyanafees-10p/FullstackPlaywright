import fs from 'fs';
import { test, expect } from '@playwright/test';
import AuthAPI from '../../api/AuthAPI';
import BookingAPI from '../../api/BookingAPI';
import DeleteAPI from '../../api/DeleteAPI'; // Import the Delete API
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

let authToken;
let bookingId;

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
        
        bookingId = createdBooking.bookingid; // Store booking ID for later use
    });

    test('DELETE booking - Delete Booking', async () => {
        const deleteAPI = new DeleteAPI(); // Use Delete API

        // Deleting the booking that was just created
        const deleteResponse = await deleteAPI.deleteBooking(authToken, bookingId);
        
        expect(deleteResponse.ok()).toBeTruthy(); // Expect deletion to be successful

        // Optional: Verify if the booking was really deleted
        const bookingAPI = new BookingAPI();
        const bookings = await bookingAPI.getBookings(authToken);
        const deletedBooking = bookings.find(booking => booking.bookingid === bookingId);

        expect(deletedBooking).toBeUndefined(); // Deleted booking should no longer exist
    });
});
