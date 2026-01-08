import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { TestsService } from '../services/tests.service';
import { TestCategory } from '../models/test.model';

export const testCategoriesResolver: ResolveFn<TestCategory[]> = () => {
  const service = inject(TestsService);
  return service.getTestCategories();
};
