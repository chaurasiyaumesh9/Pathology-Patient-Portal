import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TestsService } from '../services/tests.service';
import { Test } from '../models/test.model';

export const testsResolver: ResolveFn<Test[]> = () => {
  const service = inject(TestsService);
  return service.getTests();
};
