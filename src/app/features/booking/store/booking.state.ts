import { computed } from '@angular/core';
import {
    signalStore,
    withState,
    withComputed,
    withMethods,
    patchState,
} from '@ngrx/signals';

import {
    AppointmentSlot,
    PAYMENT_STATUS,
    PaymentStatus,
    Test,
} from '../models/test.model';

export const BookingStore = signalStore(
    withState({
        selectedTests: [] as Test[],
        appointment: null as AppointmentSlot | null,
        paymentStatus: PAYMENT_STATUS.IDLE as PaymentStatus,
    }),

    withComputed(({ selectedTests, appointment, paymentStatus }) => ({
        totalAmount: computed(() =>
            selectedTests().reduce(
                (sum, test) =>
                    sum + (test.discounted_price ?? test.original_price),
                0
            )
        )
    })),

    withMethods((store) => ({
        addTest(test: Test): void {
            patchState(store, {
                selectedTests: [...store.selectedTests(), test],
            });
        },

        removeTest(testId: number): void {
            patchState(store, {
                selectedTests: store.selectedTests().filter(
                    (t) => t.id !== testId
                ),
            });
        },

        clearTests(): void {
            patchState(store, { selectedTests: [] });
        },

        setAppointment(appointment: AppointmentSlot): void {
            patchState(store, { appointment });
        },

        clearAppointment(): void {
            patchState(store, { appointment: null });
        },

        startPayment(): void {
            patchState(store, {
                paymentStatus: PAYMENT_STATUS.PROCESSING,
            });
        },

        paymentSuccess(): void {
            patchState(store, {
                paymentStatus: PAYMENT_STATUS.SUCCESS,
            });
        },

        paymentFailure(): void {
            patchState(store, {
                paymentStatus: PAYMENT_STATUS.FAILED,
            });
        },

        resetPayment(): void {
            patchState(store, {
                paymentStatus: PAYMENT_STATUS.IDLE,
            });
        },

        resetBooking(): void {
            patchState(store, {
                selectedTests: [],
                appointment: null,
                paymentStatus: PAYMENT_STATUS.IDLE,
            });
        },
    }))
);
