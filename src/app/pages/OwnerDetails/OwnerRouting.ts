
import {  Routes } from '@angular/router';
import { OwnerhandlerComponent } from './ownerhandler/ownerhandler.component';
import { OddispComponent } from './oddisp/oddisp.component';
import { OdaddComponent } from './odadd/odadd.component';
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
                        path: 'OwnerAdd',
                        component: OdaddComponent
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