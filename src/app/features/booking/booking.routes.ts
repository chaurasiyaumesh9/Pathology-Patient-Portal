import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { bookingFeatureKey, bookingReducer } from './store/booking.reducer';
import { BookingHomeComponent } from './components/booking-home/booking-home';
import { cartNotEmptyGuard } from './guards/cart-not-empty.guard';
import { TestsComponent } from './components/tests/tests.components';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';

export const BOOKING_ROUTES: Routes = [
    {
        path: '',
        providers: [
            provideState(bookingFeatureKey, bookingReducer)
        ],
        children: [
            { path: '', component: BookingHomeComponent },
            { path: 'tests', component: TestsComponent },
            {
                path: 'schedule',
                component: ScheduleComponent,
                canActivate: [cartNotEmptyGuard]
            },
            { path: 'cart', component: CartComponent },
            { path: 'payment', component: PaymentComponent }
        ]
    }
];
