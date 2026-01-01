import { createReducer, on } from '@ngrx/store';
import { initialBookingState } from './booking.state';
import * as BookingActions from './booking.actions';
import { PAYMENT_STATUS } from '../models/test.model';
export const bookingFeatureKey = 'booking';

export const bookingReducer = createReducer(
  initialBookingState,

  on(BookingActions.addTest, (state, { test }) => ({
    ...state,
    selectedTests: [...state.selectedTests, test]
  })),

  on(BookingActions.removeTest, (state, { testId }) => ({
    ...state,
    selectedTests: state.selectedTests.filter(t => t.id !== testId)
  })),

  on(BookingActions.setAppointment, (state, { appointment }) => ({
    ...state,
    appointment
  })),

  on(BookingActions.startPayment, state => ({
    ...state,
    paymentStatus: PAYMENT_STATUS.PROCESSING
  })),

  on(BookingActions.paymentSuccess, state => ({
    ...state,
    paymentStatus: PAYMENT_STATUS.SUCCESS
  })),

  on(BookingActions.paymentFailure, state => ({
    ...state,
    paymentStatus: PAYMENT_STATUS.FAILED
  }))
);
