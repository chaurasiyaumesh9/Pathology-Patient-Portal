import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as BookingSelectors from '../../store/booking.selectors';
import * as BookingActions from '../../store/booking.actions';

@Component({
    selector: 'app-payment',
    imports: [CommonModule, RouterLink],
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
    private store = inject(Store);
    private router = inject(Router);

    selectedServices = this.store.selectSignal(
        BookingSelectors.selectSelectedTests
    );

    appointment = this.store.selectSignal(
        BookingSelectors.selectAppointment
    );

    totalAmount = this.store.selectSignal(
        BookingSelectors.selectTotalAmount
    );

    paymentStatus = this.store.selectSignal(
        BookingSelectors.selectPaymentStatus
    );

    payNow(): void {
        this.store.dispatch(BookingActions.startPayment());

        // MOCK PAYMENT FLOW
        setTimeout(() => {
            this.store.dispatch(BookingActions.paymentSuccess());
            this.router.navigate(['/booking/confirmation']);
        }, 1500);
    }
}
