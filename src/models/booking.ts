export interface Booking {
  id: number;
  propertyId: number; // This should match a Property's propertyId
  startDate: Date;
  endDate: Date;
  status: BookingStatus; // Enum for booking status
  amountPaid: number;
}

export enum BookingStatus {
  Pending = "Pending",
  Confirmed = "Confirmed",
  Cancelled = "Cancelled"
}