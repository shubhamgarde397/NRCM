
import {  Routes } from '@angular/router';
import { OwnerhandlerComponent } from './ownerhandler/ownerhandler.component';
import { OddispComponent } from './oddisp/oddisp.component';
import { OwnerUpdateComponent } from './owner-update/owner-update.component';

export const OwnerRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'OWNER_HANDLER'
        },
        {
            path: 'OWNER_HANDLER',
            component: OwnerhandlerComponent,
            children:
                [
                    {
                        path: '',
                        component: OddispComponent
                    },
                    {
                        path: 'OwnerDisp',
                        component: OddispComponent
                    },
                    {
                        path: 'OwnerUpdate',
                        component: OwnerUpdateComponent
                    }
                ]
        }
    ]