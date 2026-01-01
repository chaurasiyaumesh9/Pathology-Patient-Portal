import { AppointmentSlot, PAYMENT_STATUS, PaymentStatus, Test } from "../models/test.model";

export interface BookingState {
  selectedTests: Test[];
  appointment: AppointmentSlot | null;
  paymentStatus: PaymentStatus;
}
  
export const initialBookingState: BookingState = {
  selectedTests: [],
  appointment: null,
  paymentStatus: PAYMENT_STATUS.IDLE
};
  