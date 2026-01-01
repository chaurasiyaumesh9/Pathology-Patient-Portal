import { createAction, props } from '@ngrx/store';
import { AppointmentSlot, Test } from '../models/test.model';

export const addTest = createAction(
  '[Booking] Add Test',
  props<{ test: Test }>()
);

export const removeTest = createAction(
  '[Booking] Remove Test',
  props<{ testId: number }>()
);

export const setAppointment = createAction(
  '[Booking] Set Appointment',
  props<{ appointment: AppointmentSlot }>()
);

export const startPayment = createAction('[Booking] Start Payment');

export const paymentSuccess = createAction('[Booking] Payment Success');

export const paymentFailure = createAction('[Booking] Payment Failure');
