import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { SampleCollectionDay, Test, TestCategory } from '../models/test.model';
import { mapBackendTestToUI } from '../mappers/test.mapper';

@Injectable({ providedIn: 'root' })
export class TestsService {
  constructor(private http: HttpClient) {}

  getTestCategories(): Observable<TestCategory[]> {
    return this.http.get<TestCategory[]>(
      '/assets/mock-data/booking/tests.categories.mock.json'
    );
  }

  getTests(): Observable<Test[]> {
    return this.http.get<any[]>(
      '/assets/mock-data/booking/tests.mock.json'
    )
    .pipe(
      map((backendTests: any[]) =>
        backendTests.map(mapBackendTestToUI)
      )
    );
  }

  getAvailableSlots(): Observable<SampleCollectionDay[]> {
    return this.http.get<SampleCollectionDay[]>(
      '/assets/mock-data/booking/tests.slots.mock.json'
    );
  }
}
