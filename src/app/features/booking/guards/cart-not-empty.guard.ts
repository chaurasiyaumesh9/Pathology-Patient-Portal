import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

import { selectSelectedTests } from '../store/booking.selectors';

export const cartNotEmptyGuard: CanActivateFn = async () => {
  const store = inject(Store);
  const router = inject(Router);

  const tests = await firstValueFrom(
    store.select(selectSelectedTests)
  );

  if (tests.length === 0) {
    router.navigate(['/booking/tests']);
    return false;
  }

  return true;
};
