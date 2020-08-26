import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { DriverdetailshandlerComponent } from './driverdetailshandler/driverdetailshandler.component';
import { DriverDispComponent } from './driver-disp/driver-disp.component';
import { DriverAddComponent } from './driver-add/driver-add.component';
import { DriverUpdateComponent } from './driver-update/driver-update.component';

export const DriverRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'DRIVER_HANDLER'
        },
        {
            path: 'DRIVER_HANDLER',
            component: DriverdetailshandlerComponent,
            children:
                [
                    {
                        path: '',
                        component: DriverDispComponent
                    },
                    {
                        path: 'DriverAdd',
                        component: DriverAddComponent
                    },
                    {
                        path: 'DriverDisp',
                        component: DriverDispComponent
                    },
                    {
                        path: 'DriverUpdate',
                        component: DriverUpdateComponent
                    }
                ]
        }
    ]