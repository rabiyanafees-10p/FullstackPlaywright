import { test, expect } from '@playwright/test';
import AuthAPI from '../../api/AuthAPI';
import BookingAPI from '../../api/BookingAPI';
import DeleteAPI from '../../api/DeleteAPI';
import UpdateBookingAPI from '../../api/UpdateBookingAPI';
import { data as testData } from '../../testData';

const { username, password } = testData.api.auth;
const bookingData = testData.api.booking;
const updatedBookingData = {
  firstname: "UpdatedFirstName",
  lastname: "UpdatedLastName",
  totalprice: 150,
  depositpaid: true,
  bookingdates: {
    checkin: "2024-02-01",
    checkout: "2024-02-02"
  },
  additionalneeds: "Breakfast"
};

let authToken;
let createdBooking;
let bookingId;

test.describe.serial('@api API Authentication Tests', () => {
  // Before all tests, authenticate and create a booking
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

  // Test 1: POST /auth - Token should be defined
  test('POST /auth - Token should be defined', async () => {
    expect(authToken).toBeDefined();
  });

  // Test 2: PUT /booking/:id - Update the created booking
  test('PUT /booking/:id - Update Booking', async () => {
    const updateBookingAPI = new UpdateBookingAPI();

    // Step 1: Update booking
    const updatedBooking = await updateBookingAPI.updateBooking(authToken, bookingId, updatedBookingData);

    // Step 2: Validate the updated booking data
    expect(updatedBooking).toBeDefined();
    expect(updatedBooking.firstname).toBe(updatedBookingData.firstname);
    expect(updatedBooking.lastname).toBe(updatedBookingData.lastname);
    expect(updatedBooking.totalprice).toBe(updatedBookingData.totalprice);
    expect(updatedBooking.additionalneeds).toBe(updatedBookingData.additionalneeds);

    console.log(`Booking with ID ${bookingId} updated.`);
  });

  // Test 3: GET /booking - Retrieve Bookings and check if our updated booking is listed
  test('GET /booking - Retrieve Bookings', async () => {
    const bookingAPI = new BookingAPI();
    const bookings = await bookingAPI.getBookings(authToken);
    const bookingIds = bookings.map(b => b.bookingid);
    expect(bookingIds).toContain(bookingId);
    console.log(`Booking ID ${bookingId} found in GET /booking response`);
  });

  // Test 4: DELETE /booking - Delete the updated booking and verify deletion
  test('DELETE /booking - Delete Booking and Verify Deletion', async () => {
    const deleteAPI = new DeleteAPI();

    // Step 1: Delete the booking
    const deleteResponse = await deleteAPI.deleteBooking(authToken, bookingId);
    expect(deleteResponse.ok()).toBeTruthy();
    console.log(`✅ Booking with ID ${bookingId} has been successfully deleted.`);

    // Step 2: Verify the booking is deleted by trying to retrieve it
    const bookingAPI = new BookingAPI();
    const response = await bookingAPI.getBookingById(authToken, bookingId);

    // Expecting a 404 error (not found) since the booking was deleted
    expect(response.status()).toBe(404);
    console.log(`✅ Booking ID ${bookingId} no longer exists (deleted).`);
  });
});
