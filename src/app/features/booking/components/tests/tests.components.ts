import { Component, computed, effect, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import * as BookingActions from '../../store/booking.actions';
import * as BookingSelectors from '../../store/booking.selectors';
import { selectSelectedTests } from '../../store/booking.selectors';
import { Test, TestCategory } from '../../models/test.model';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-tests',
    imports: [CommonModule, RouterLink],
    templateUrl: './tests.components.html',
    styleUrls: ['./tests.components.scss']
})
export class TestsComponent {
    private store = inject(Store);
    private route = inject(ActivatedRoute);

    private resolvedTests = toSignal(
        this.route.data.pipe(map(data => data['tests'] as Test[])),
        { initialValue: [] }
    );

    categories$ = this.route.data.pipe(
        map(data => data['categories'] as TestCategory[])
    );

    searchInput = signal('');

    searchTerm = signal('');

    private debounceEffect = effect(() => {
        const value = this.searchInput();

        const handle = setTimeout(() => {
        this.searchTerm.set(value.trim().toLowerCase());
        }, 250);

        return () => clearTimeout(handle);
    });

    filteredTests = computed(() => {
        const term = this.searchTerm();
        const tests = this.resolvedTests();

        if (!term) {
            return tests;
        }

        return tests.filter(test =>
            test.name.toLowerCase().includes(term)
        );
    });

    selectedCategoryId = () => Number(this.route.snapshot.paramMap.get('categoryId')) || null;

    tests$ = this.route.data.pipe(
        map(data => data['tests'])
    );
    selectedTests = this.store.selectSignal(selectSelectedTests);
    selectedTestsCount = this.store.selectSignal(
        BookingSelectors.selectSelectedTests
    );

    addTest(test: Test) {
        this.store.dispatch(BookingActions.addTest({ test }));
    }

    removeTest(testId: number) {
        this.store.dispatch(BookingActions.removeTest({ testId }));
    }

    isSelected(testId: number): boolean {
        return this.selectedTests().some(t => t.id === testId);
    }
}
