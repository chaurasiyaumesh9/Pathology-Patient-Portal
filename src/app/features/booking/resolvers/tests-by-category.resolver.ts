import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { map } from 'rxjs/operators';

import { TestsService } from '../services/tests.service';
import { Test } from '../models/test.model';

export const testsByCategoryResolver: ResolveFn<Test[]> = (route) => {
  const service = inject(TestsService);

  const categoryId = Number(route.paramMap.get('categoryId'));

  return service.getTests().pipe(
    map(tests =>
      tests.filter(test => test.category === categoryId)
    )
  );
};
