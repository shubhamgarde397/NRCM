import {  Routes } from '@angular/router';
import { TransportAddComponent } from './transport-add/transport-add.component';
import { TransportDisplayComponent } from './transport-display/transport-display.component';
import { TransportHandlerComponent } from './transport-handler/transport-handler.component';
import { TransportUpdateComponent } from './transport-update/transport-update.component';

export const TransportRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'TRANSPORT_HANDLER'
        },
        {
            path: 'TRANSPORT_HANDLER',
            component: TransportHandlerComponent,
            children: [
                {
                    path: '',
                    component: TransportDisplayComponent
                },
                {
                    path: 'TRANSPORTAdd',
                    component: TransportAddComponent
                },
                {
                    path: 'TRANSPORTDisp',
                    component: TransportDisplayComponent
                },
                {
                    path: 'TRANSPORTUpdate',
                    component: TransportUpdateComponent
                }
            ]
        }
    ]