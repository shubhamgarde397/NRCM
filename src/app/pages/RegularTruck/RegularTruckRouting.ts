
import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { RegularTruckDispComponent } from './regular-truck-disp/regular-truck-disp.component';
import { RegularTruckAddComponent } from './regular-truck-add/regular-truck-add.component';
import { RegularTruckUpdateComponent } from './regular-truck-update/regular-truck-update.component';
import { RegularTruckHandlerComponent } from './regular-truck-handler/regular-truck-handler.component';

export const RegularTruckRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'REGULAR_TRUCK_HANDLER'
        },
        {
            path: 'REGULAR_TRUCK_HANDLER',
            component: RegularTruckHandlerComponent,
            children:
                [
                    {
                        path: '',
                        component: RegularTruckDispComponent
                    },
                    {
                        path: 'RegularTruckAdd',
                        component: RegularTruckAddComponent
                    },
                    {
                        path: 'RegularTruckDisp',
                        component: RegularTruckDispComponent
                    },
                    {
                        path: 'RegularTruckUpdate',
                        component: RegularTruckUpdateComponent
                    }
                ]
        }
    ]