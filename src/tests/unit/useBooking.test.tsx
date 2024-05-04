import {render, screen} from '@testing-library/react';
import bookingService from '../../services/bookingService.ts';
import {useBooking} from "../../hooks/useBooking.ts";
import {Booking, BookingStatus} from "../../models/booking.ts";
import {expect, jest} from '@jest/globals';

// Mock the bookingService methods
jest.mock('../../services/bookingService.ts', () => ({
  fetchBookings: jest.fn(),
  createBooking: jest.fn(),
  updateBooking: jest.fn(),
  deleteBooking: jest.fn()
}));
const mockedBookingService = bookingService as jest.Mocked<typeof bookingService>;

// Create a test component that uses the hook
function TestComponent() {
  const { bookings, error } = useBooking();
  return (
    <div>
      {bookings.map(booking => (
          <div key={booking.bookingId}>{booking.guestName}</div>
        ))}
  {error && <div>{error}</div>}
  </div>
  );
  }

  describe('useBooking', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should fetch bookings on initial render', async () => {
      const mockedBookings: Booking[] = [{
        bookingId: 1,
        propertyId: 101,
        guestName: 'John Doe',
        startDate: new Date('2024-05-10'),
        endDate: new Date('2024-05-15'),
        status: BookingStatus.Confirmed
      }];
      mockedBookingService.fetchBookings.mockResolvedValue(mockedBookings);

      render(<TestComponent />);
      await screen.findByText('John Doe');

      expect(screen.getByText('John Doe')).toBeTruthy();
    });

    it('should display an error when fetch bookings fails', async () => {
      mockedBookingService.fetchBookings.mockRejectedValue(new Error('Failed to fetch bookings'));

      render(<TestComponent />);
      await screen.findByText('Failed to fetch bookings');

      expect(screen.getByText('Failed to fetch bookings')).toBeTruthy();
    });

    // Additional tests can be added here
  });