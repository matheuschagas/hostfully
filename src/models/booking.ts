export interface Booking {
  bookingId: number;
  propertyId: number; // This should match a Property's propertyId
  startDate: Date;
  endDate: Date;
  status: BookingStatus; // Enum for booking status
}

export enum BookingStatus {
  Pending = "Pending",
  Confirmed = "Confirmed",
  Cancelled = "Cancelled"
}