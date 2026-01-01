import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as BookingSelectors from '../../store/booking.selectors';
import * as BookingActions from '../../store/booking.actions';

@Component({
    selector: 'app-cart',
    imports: [CommonModule, RouterLink],
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent {
    private store = inject(Store);

    selectedTests = this.store.selectSignal(
        BookingSelectors.selectSelectedTests
    );

    totalAmount = this.store.selectSignal(
        BookingSelectors.selectTotalAmount
    );

    removeTest(testId: number): void {
        this.store.dispatch(
            BookingActions.removeTest({ testId })
        );
    }
}
