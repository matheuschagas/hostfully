import {Booking} from "@/models/booking.ts";
import initialData from "../../mocks/booking";

const bookings: Booking[] = initialData as Booking[];

const fakeDelay = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
}
const fetchBookings = async (): Promise<Booking[]> => {
  //fake delay
  await fakeDelay();
  return bookings;
};

const createBooking = async (booking: Booking): Promise<Booking> => {
  //fake delay
  await fakeDelay();
  bookings.push(booking);
  return booking;
};

const updateBooking = async (bookingId: number, booking: Booking): Promise<Booking> => {
  //fake delay
  await fakeDelay();
  const index = bookings.findIndex(b => b.bookingId === bookingId);
  bookings[index] = booking;
  return booking;
};

const deleteBooking = async (bookingId: number): Promise<void> => {
  //fake delay
  await fakeDelay();
  const index = bookings.findIndex(b => b.bookingId === bookingId);
  bookings.splice(index, 1);
};

export default {
  fetchBookings,
  createBooking,
  updateBooking,
  deleteBooking
}