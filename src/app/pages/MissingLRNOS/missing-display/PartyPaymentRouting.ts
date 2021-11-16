
import { Routes } from '@angular/router';
import { MissingDisplayComponent } from './missing-display.component';

export const PartyPaymentRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'PARTY_PAYMENT_HANDLER'
        },
        {
            path: 'PARTY_PAYMENT_HANDLER',
            component: MissingDisplayComponent
        }
    ]