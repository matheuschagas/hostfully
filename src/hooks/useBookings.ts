import { useState, useEffect, useCallback } from 'react';
import {Booking, BookingStatus} from '../models/booking';
import bookingService from '../services/bookingService';

interface createBookingProps {
  propertyId: number;
  startDate: Date;
  endDate: Date;
  amountPaid: number;
}

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await bookingService.fetchBookings();
      setBookings(data);
    } catch (err) {
      setError('Failed to fetch bookings');
    }
    setLoading(false);
  }, []);

  const createBooking = async (booking: createBookingProps):Promise<Booking | undefined> => {
    try {
      // Additional logic to check for overlapping bookings
      const overlap = bookings.some(b => b.propertyId === booking.propertyId &&
        !((b.endDate <= booking.startDate) || (b.startDate >= booking.endDate)));
      if (overlap) {
        setError('Booking dates overlap with an existing booking');
        return;
      }
      const bookingData = {
        id: bookings.length + 1,
        propertyId: booking.propertyId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        status: BookingStatus.Pending,
        amountPaid: booking.amountPaid
      }
      const newBooking = await bookingService.createBooking(bookingData);
      setBookings(prev => [...prev, newBooking]);
    } catch (err) {
      setError('Failed to create booking');
    }
  };

  const updateBooking = async (bookingId: number, booking: Booking) => {
    try {
      const updatedBooking = await bookingService.updateBooking(bookingId, booking);
      setBookings(prev => prev.map(b => b.id === bookingId ? updatedBooking : b));
    } catch (err) {
      setError('Failed to update booking');
    }
  };

  const deleteBooking = async (bookingId: number) => {
    try {
      await bookingService.deleteBooking(bookingId);
      setBookings(prev => prev.filter(b => b.id !== bookingId));
    } catch (err) {
      setError('Failed to delete booking');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return {
    bookings,
    fetchBookings,
    createBooking,
    updateBooking,
    deleteBooking,
    error,
    loading
  };
};