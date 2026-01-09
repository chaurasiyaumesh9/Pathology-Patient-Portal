import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TestsService } from '../services/tests.service';
import { SampleCollectionDay } from '../models/test.model';

export const availableSlotsResolver: ResolveFn<SampleCollectionDay[]> = () => {
  const testsService = inject(TestsService);
  return testsService.getAvailableSlots();
};
