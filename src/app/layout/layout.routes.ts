import { Routes } from '@angular/router';
import { ShellComponent } from './shell/shell';

export const LAYOUT_ROUTES: Routes = [
    {
        path: '',
        component: ShellComponent,
        children: [
            {
                path: 'booking',
                loadChildren: () => import('../features/booking/booking.routes').then(m => m.BOOKING_ROUTES)
            },
            {
                path: '',
                redirectTo: 'booking',
                pathMatch: 'full'
            }
        ]
    }
];
