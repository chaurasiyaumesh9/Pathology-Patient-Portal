import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import * as BookingActions from '../../store/booking.actions';
import * as BookingSelectors from '../../store/booking.selectors';
import { selectSelectedTests } from '../../store/booking.selectors';
import { TestsService } from '../../services/tests.service';
import { Test } from '../../models/test.model';

@Component({
  selector: 'app-tests',
  imports: [CommonModule, RouterLink],
  templateUrl: './tests.components.html',
  styleUrls: ['./tests.components.scss']
})
export class TestsComponent {
  private store = inject(Store);
  private testsService = inject(TestsService);

  tests$ = this.testsService.getTests();
  selectedTests = this.store.selectSignal(selectSelectedTests);
  selectedTestsCount = this.store.selectSignal(
    BookingSelectors.selectSelectedTests
  );

  addTest(test: Test ) {
    this.store.dispatch(BookingActions.addTest({ test }));
  }

  removeTest(testId: number) {
    this.store.dispatch(BookingActions.removeTest({ testId }));
  }

  isSelected(testId: number): boolean {
    return this.selectedTests().some(t => t.id === testId);
  }
}
