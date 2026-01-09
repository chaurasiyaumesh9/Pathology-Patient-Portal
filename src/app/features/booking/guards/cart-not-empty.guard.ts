import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BookingStore } from '../store/booking.state';

export const cartNotEmptyGuard: CanActivateFn = () => {
  const bookingStore = inject(BookingStore);
  const router = inject(Router);

  if (bookingStore.selectedTests().length === 0) {
    router.navigate(['/booking/tests']);
    return false;
  }

  return true;
};
