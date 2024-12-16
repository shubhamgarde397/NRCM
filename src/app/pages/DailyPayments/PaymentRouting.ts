import {  Routes } from '@angular/router';
import { PaymentAddComponent } from './payment-add/payment-add.component';
import { PaymentDisplayComponent } from './payment-display/payment-display.component';
import { PaymentHandlerComponent } from './payment-handler/payment-handler.component';


export const PaymentRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'PAYMENT_HANDLER'
        },
        {
            path: 'PAYMENT_HANDLER',
            component: PaymentHandlerComponent,
            children:
                [
                    {
                        path: '',
                        redirectTo: 'PaymentDisp',
                        pathMatch: 'full'
                    },
                    {
                        path: 'PaymentAdd',
                        component: PaymentAddComponent,
                    },
                    {
                        path: 'PaymentDisp',
                        component: PaymentDisplayComponent
                    }
                ]
        }
    ];
