import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Test, TestCategory } from '../../models/test.model';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { BookingStore } from '../../store/booking.state';

@Component({
    selector: 'app-tests',
    imports: [CommonModule, RouterLink],
    templateUrl: './tests.components.html',
    styleUrls: ['./tests.components.scss']
})
export class TestsComponent {
    private bookingStore = inject(BookingStore);
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
    selectedTests = this.bookingStore.selectedTests;    

    addTest(test: Test) {
        this.bookingStore.addTest(test);
    }

    removeTest(testId: number) {
        this.bookingStore.removeTest(testId);
    }

    isSelected(testId: number): boolean {
        return this.selectedTests().some(t => t.id === testId);
    }
}
