
import { Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { DisplayComponent } from './display/display.component';
import { UpdateComponent } from './update/update.component';
import { HandlerComponent } from './handler/handler.component';

export const PartyPaymentRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'PARTY_PAYMENT_HANDLER'
        },
        {
            path: 'PARTY_PAYMENT_HANDLER',
            component: HandlerComponent,
            children:
                [
                    {
                        path: '',
                        component: DisplayComponent
                    },
                    {
                        path: 'Add',
                        component: AddComponent
                    },
                    {
                        path: 'Display',
                        component: DisplayComponent
                    },
                    {
                        path: 'Update',
                        component: UpdateComponent
                    }
                ]
        }
    ]