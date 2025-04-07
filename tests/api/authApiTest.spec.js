import { test, expect, request } from '@playwright/test';

import AuthAPI from '../../api/AuthAPI';
import BookingAPI from '../../api/BookingAPI';
import DeleteAPI from '../../api/DeleteAPI';
//import UpdateBookingAPI from '../../api/UpdateBookingAPI';
import { data as testData } from '../../testData';

const { username, password } = testData.api.auth;
const bookingData = testData.api.booking;

let authToken;
let createdBooking;
let bookingId;

test.describe.serial('@api API Authentication Tests', () => {
  test.beforeAll(async () => {
    const authAPI = new AuthAPI();
    const bookingAPI = new BookingAPI();

    // Step 1: Authenticate
    const authResponse = await authAPI.authenticate(username, password);
    expect(authResponse.token).toBeTruthy();
    authToken = authResponse.token;

    // Step 2: Create booking
    createdBooking = await bookingAPI.createBooking(authToken, bookingData);
    expect(createdBooking).toBeDefined();
    bookingId = createdBooking.bookingid;
    console.log(`Created Booking ID: ${bookingId}`);
  });

  test('POST /auth - Token should be defined', async () => {
    expect(authToken).toBeDefined();
  });

  test('GET /booking - Retrieve Bookings', async () => {
    const bookingAPI = new BookingAPI();
    const bookings = await bookingAPI.getBookings(authToken);
    const bookingIds = bookings.map(b => b.bookingid);
    expect(bookingIds).toContain(bookingId);
  });

  // test('Update Booking', async () => {
  //   const updateData = testData.api.updatedBooking;
  //   const updateResponse = await request.newContext().put(`${testData.api.baseURL}/booking/${bookingId}`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${authToken}`
  //     },
  //     data: JSON.stringify(updateData)
  //   });
  //   expect(updateResponse.status()).toBe(200);
  // });

  test('DELETE /booking - Delete Booking and Verify Deletion', async () => {
    const deleteAPI = new DeleteAPI();

    // Step 1: Delete the booking
    const deleteResponse = await deleteAPI.deleteBooking(authToken, bookingId);
    expect(deleteResponse.ok()).toBeTruthy();
    console.log(`Booking with ID ${bookingId} has been successfully deleted.`);

    // Step 2: Verify the booking is deleted by trying to retrieve it
    const bookingAPI = new BookingAPI();
    const response = await bookingAPI.getBookingById(authToken, bookingId);

    // Expecting a 404 error (not found) since the booking was deleted
    expect(response.status()).toBe(404);
  
    console.log(`Booking ID ${bookingId} is deleted`);
  });
});
