import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { TptHireDetailsHandlerComponent } from './tpt-hire-details-handler/tpt-hire-details-handler.component';
import { TptHireDetailsAddComponent } from './tpt-hire-details-add/tpt-hire-details-add.component';
// tslint:disable-next-line:max-line-length
import { TptHireDetailsDisplayHandlerComponent } from './Display/tpt-hire-details-display-handler/tpt-hire-details-display-handler.component';
import { TptHireDetailsDisplayComponent } from './Display/tpt-hire-details-display/tpt-hire-details-display.component';
import { TptHireDetailsUpdateComponent } from './tpt-hire-details-update/tpt-hire-details-update.component';
import { TPTHireDetailsPartyWiseComponent } from './Display/tpthire-details-party-wise/tpthire-details-party-wise.component';


export const TptHireRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'TPTHire_HANDLER'
        },
        {
            path: 'TPTHire_HANDLER',
            component: TptHireDetailsHandlerComponent,
            children:
                [
                    {
                        path: '',
                        redirectTo: 'TPTHireDisplay_Main',
                        pathMatch: 'full'
                    },
                    {
                        path: 'TPTHireAdd',
                        component: TptHireDetailsAddComponent,
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
                        path: 'TPTHireDisplay_Main',
                        component: TptHireDetailsDisplayHandlerComponent,
                        children:
                            [
                                {
                                    path: '',
                                    component: TptHireDetailsDisplayComponent
                                },
                                {
                                    path: 'TPTHireDisplay_Normal',
                                    component: TptHireDetailsDisplayComponent
                                },
                                {
                                    path: 'TPTHireDisplay_Party',
                                    component: TPTHireDetailsPartyWiseComponent
                                }
                            ]
                    },
                    {
                        path: 'TPTHireUpdate',
                        component: TptHireDetailsUpdateComponent
                    }
                ]
        }
    ];
