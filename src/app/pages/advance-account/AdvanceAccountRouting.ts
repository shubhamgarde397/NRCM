import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { AdvanceAccountHandlerComponent } from './advance-account-handler/advance-account-handler.component';
import { AdvanceAccountAddComponent } from './advance-account-add/advance-account-add.component';
import { DisplayHandlerComponent } from './Display/display-handler/display-handler.component';
import { AdvanceAccountDisplayComponent } from './Display/advance-account-display/advance-account-display.component';
import { AdvanceAccountPartyDisplayComponent } from './Display/advance-account-party-display/advance-account-party-display.component';
import { AdvanceAccountTruckComponent } from './Display/advance-account-truck/advance-account-truck.component';
import { AdvanceAccountDateComponent } from './Display/advance-account-date/advance-account-date.component';
import { AdvanceAccountCountComponent } from './Display/advance-account-count/advance-account-count.component';
import { AdvanceAccountUpdateComponent } from './advance-account-update/advance-account-update.component';

export const AdvanceAccountRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'AdvanceAccount'
        },
        {
            path: 'AdvanceAccount',
            component: AdvanceAccountHandlerComponent,
            children:
                [
                    {
                        path: '',
                        redirectTo: 'AdvanceDisp_HANDLER',
                        pathMatch: 'full'
                    },
                    {
                        path: 'AdvanceAdd',
                        component: AdvanceAccountAddComponent,
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
                        path: 'AdvanceDisp_HANDLER',
                        component: DisplayHandlerComponent,
                        children:
                            [
                                {
                                    path: '',
                                    component: AdvanceAccountDisplayComponent
                                },
                                {
                                    path: 'Advance_Normal',
                                    component: AdvanceAccountDisplayComponent
                                },
                                {
                                    path: 'Advance_Party_Display',
                                    component: AdvanceAccountPartyDisplayComponent
                                },
                                {
                                    path: 'Advance_Truck',
                                    component: AdvanceAccountTruckComponent
                                },
                                {
                                    path: 'Advance_DateWise',
                                    component: AdvanceAccountDateComponent
                                },
                                {
                                    path: 'Advance_Count',
                                    component: AdvanceAccountCountComponent
                                }
                            ]
                    },
                    {
                        path: 'AdvanceAccountUpdate',
                        component: AdvanceAccountUpdateComponent
                    }
                ]
        }
    ];
