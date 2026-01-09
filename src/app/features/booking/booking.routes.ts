import { Routes } from '@angular/router';
import { cartNotEmptyGuard } from './guards/cart-not-empty.guard';
import { TestsService } from './services/tests.service';
import { testsResolver } from './resolvers/tests.resolver';
import { testsByCategoryResolver } from './resolvers/tests-by-category.resolver';
import { testCategoriesResolver } from './resolvers/test-categories.resolver';
import { BookingStore } from './store/booking.store';
import { availableSlotsResolver } from './resolvers/available-slots.resolver';

export const BOOKING_ROUTES: Routes = [
    {
        path: '',
        providers: [
            TestsService,
            BookingStore
        ],
        children: [
            // { 
            //     path: '', 
            //     loadComponent: () => import('./components/booking-home/booking-home').then(m => m.BookingHomeComponent),
            // },
            { 
                path: 'tests', 
                loadComponent: () => import('./components/tests/tests.components').then(m => m.TestsComponent),
                resolve: {
                    categories: testCategoriesResolver,
                    tests: testsResolver
                }
            },
            { 
                path: 'tests/:categoryId', 
                loadComponent: () => import('./components/tests/tests.components').then(m => m.TestsComponent),
                resolve: {
                    categories: testCategoriesResolver,
                    tests: testsByCategoryResolver
                }
            },
            {
                path: 'schedule',
                loadComponent: () => import('./components/schedule/schedule.component').then(m => m.ScheduleComponent),
                canActivate: [cartNotEmptyGuard],
                resolve: {
                    slots: availableSlotsResolver,
                }
            },
            { 
                path: 'cart', 
                loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent),
            },
            { 
                path: 'payment', 
                canActivate: [cartNotEmptyGuard],
                loadComponent: () => import('./components/payment/payment.component').then(m => m.PaymentComponent),
            },
            {
                path: '',
                redirectTo: 'tests',
                pathMatch: 'full'
            }
        ]
    }
];
