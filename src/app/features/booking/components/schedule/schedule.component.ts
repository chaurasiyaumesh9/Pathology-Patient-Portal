import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import * as BookingActions from '../../store/booking.actions';
import { TestsService } from '../../services/tests.service';

@Component({
  selector: 'app-schedule',
  imports: [CommonModule, RouterLink],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {
  private testsService = inject(TestsService);
  private store = inject(Store);

  days$ = this.testsService.getAvailableSlots();

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

    this.store.dispatch(
      BookingActions.setAppointment({
        appointment: {
          date: this.selectedDate()!,
          time: this.selectedTime()!
        }
      })
    );
  }
}
