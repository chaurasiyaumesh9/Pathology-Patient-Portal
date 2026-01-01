import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
