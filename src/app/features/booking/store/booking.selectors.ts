import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookingState } from './booking.state';
import { bookingFeatureKey } from './booking.reducer';

export const selectBookingState =
    createFeatureSelector<BookingState>(bookingFeatureKey);

export const selectSelectedTests = createSelector(
    selectBookingState,
    state => state.selectedTests
);

export const selectAppointment = createSelector(
    selectBookingState,
    state => state.appointment
);

export const selectPaymentStatus = createSelector(
    selectBookingState,
    state => state.paymentStatus
);

export const selectTotalAmount = createSelector(
    selectSelectedTests,
    tests => tests.reduce((sum, t) => sum + t.discounted_price || t.original_price, 0)
);
