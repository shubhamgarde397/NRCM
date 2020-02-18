import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { PochAccountHandlerComponent } from './poch-account-handler/poch-account-handler.component';
import { PochAccountAddComponent } from './poch-account-add/poch-account-add.component';
import { PochDisplayHandlerComponent } from './Display/poch-display-handler/poch-display-handler.component';
import { PochAccountDispComponent } from './Display/poch-account-disp/poch-account-disp.component';
import { PochAccountPartyDisplayComponent } from './Display/poch-account-party-display/poch-account-party-display.component';
import { PochAccountTruckComponent } from './Display/poch-account-truck/poch-account-truck.component';
import { PochAccountDateComponent } from './Display/poch-account-date/poch-account-date.component';
import { PochAccountCountComponent } from './Display/poch-account-count/poch-account-count.component';
import { PochAccountUpdateComponent } from './poch-account-update/poch-account-update.component';

export const PochAccountRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'PochAccount'
        },
        {
            path: 'PochAccount',
            component: PochAccountHandlerComponent,
            children:
                [
                    {
                        path: '',
                        redirectTo: 'PochDisp_HANDLER',
                        pathMatch: 'full'
                    },
                    {
                        path: 'PochAdd',
                        component: PochAccountAddComponent,
                        children:
                            [
                                // {
                                //     path: 'REGULAR_PARTY_HANDLER',
                                //     component: RegularPartyAddComponent,
                                // },
                                // {
                                //     path: 'VILLAGE_HANDLER',
                                //     component: VillageaddComponent,

                                // },
                                // {
                                //     path: 'REGULAR_TRUCK_HANDLER',
                                //     component: RegularTruckAddComponent,
                                // },
                            ]
                    },
                    {
                        path: 'PochDisp_HANDLER',
                        component: PochDisplayHandlerComponent,
                        children:
                            [
                                {
                                    path: '',
                                    component: PochAccountDispComponent
                                },
                                {
                                    path: 'Poch_Normal',
                                    component: PochAccountDispComponent
                                },
                                {
                                    path: 'Poch_Party_Display',
                                    component: PochAccountPartyDisplayComponent
                                },
                                {
                                    path: 'Poch_Truck',
                                    component: PochAccountTruckComponent
                                },
                                {
                                    path: 'Poch_Date',
                                    component: PochAccountDateComponent
                                },
                                {
                                    path: 'PochCount',
                                    component: PochAccountCountComponent
                                }
                            ]
                    },
                    {
                        path: 'PochAccountUpdate',
                        component: PochAccountUpdateComponent
                    }
                ]
        }
    ];
