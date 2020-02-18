import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { DailyDataHandlerComponent } from './daily-data-handler/daily-data-handler.component';
import { DailyDataaddComponent } from './daily-dataadd/daily-dataadd.component';
import { DisplayMainComponent } from './Display/display-main/display-main.component';
import { DailyDataDispComponent } from './Display/daily-data-disp/daily-data-disp.component';
import { DisplayPartyComponent } from './Display/display-party/display-party.component';
import { DailyDataDateWiseComponent } from './Display/daily-data-date-wise/daily-data-date-wise.component';
import { DailyDataTruckWiseComponent } from './Display/daily-data-truck-wise/daily-data-truck-wise.component';
import { DailyDataCountByDateComponent } from 'src/app/pages/DailyData/Display/daily-data-count-by-date/daily-data-count-by-date.component';
import { DailyDataUpdateComponent } from './daily-data-update/daily-data-update.component';
import { DailyDataTruckWisePartyComponent } from './Display/daily-data-truck-wise-party/daily-data-truck-wise-party.component';
import { DailyDataDailyComponent } from './Display/daily-data-daily/daily-data-daily.component';

export const DailyDataRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'DailyData_HANDLER'
        },
        {
            path: 'DailyData_HANDLER',
            component: DailyDataHandlerComponent,
            children:
                [
                    {
                        path: '',
                        redirectTo: 'DailyDataDisp',
                        pathMatch: 'full'
                    },
                    {
                        path: 'DailyDataAdd',
                        component: DailyDataaddComponent,
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
                        path: 'DailyDataDisp',
                        component: DisplayMainComponent,
                        children:
                            [
                                {
                                    path: '',
                                    component: DailyDataDailyComponent
                                },
                                {
                                    path: 'TodayDisplay',
                                    component: DailyDataDailyComponent
                                },
                                {
                                    path: 'DefaultDisplay',
                                    component: DailyDataDispComponent
                                },
                                {
                                    path: 'PartyDisplay',
                                    component: DisplayPartyComponent
                                },
                                {
                                    path: 'DateDisplay',
                                    component: DailyDataDateWiseComponent
                                },
                                {
                                    path: 'TruckDisplay',
                                    component: DailyDataTruckWiseComponent
                                },
                                {
                                    path: 'CountByDateDisplay',
                                    component: DailyDataCountByDateComponent
                                },
                                {
                                    path: 'TruckWiseParty',
                                    component: DailyDataTruckWisePartyComponent
                                }
                            ]
                    },
                    {
                        path: 'DailyDataUpdate',
                        component: DailyDataUpdateComponent
                    }
                ]
        }
    ];
