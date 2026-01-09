import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookingStore } from '../../store/booking.store';
import { SampleCollectionDay } from '../../models/test.model';

@Component({
    selector: 'app-schedule',
    imports: [CommonModule, RouterLink],
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {
    private route = inject(ActivatedRoute);
    private bookingStore = inject(BookingStore);

    days = signal<SampleCollectionDay[]>(
        this.route.snapshot.data['slots']
    );

    selectedDate = signal<string | null>(null);
    selectedTime = signal<string | null>(null);

    selectDate(date: string): void {
        this.selectedDate.set(date);
        this.selectedTime.set(null);
    }

    selectTime(time: string): void {
        this.selectedTime.set(time);
    }

    confirmAppointment(): void {
        if (!this.selectedDate() || !this.selectedTime()) return;
        this.bookingStore.setAppointment({
            date: this.selectedDate()!,
            time: this.selectedTime()!
        });
    }
}
