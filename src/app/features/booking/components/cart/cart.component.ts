import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookingStore } from '../../store/booking.state';

@Component({
    selector: 'app-cart',
    imports: [CommonModule, RouterLink],
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent {
    private bookingStore = inject(BookingStore);

    selectedTests = this.bookingStore.selectedTests;

    totalAmount = this.bookingStore.totalAmount;

    removeTest(testId: number): void {
        this.bookingStore.removeTest(testId);
    }
}
