import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BookingStore } from '../../store/booking.state';

@Component({
    selector: 'app-payment',
    imports: [CommonModule, RouterLink],
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
    private bookingStore = inject(BookingStore);
    private router = inject(Router);

    selectedServices = this.bookingStore.selectedTests;
    appointment = this.bookingStore.appointment;
    totalAmount = this.bookingStore.totalAmount;
    paymentStatus = this.bookingStore.paymentStatus;

    payNow(): void {
        this.bookingStore.startPayment();

        setTimeout(() => {
            this.bookingStore.paymentSuccess();
            this.router.navigate(['/booking/confirmation']);
        }, 1500);
    }
}
