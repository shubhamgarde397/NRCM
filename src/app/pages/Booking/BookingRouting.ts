
import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { BookingHandlerComponent } from './booking-handler/booking-handler.component';
import { BookingaddComponent } from './bookingadd/bookingadd.component';
import { BookingDisplayMainComponent } from './Display/booking-display-main/booking-display-main.component';
import { BookingdispComponent } from './Display/bookingdisp/bookingdisp.component';
import { BookingDateWiseDisplayComponent } from './Display/booking-date-wise-display/booking-date-wise-display.component';
import { BookingTruckWiseDisplayComponent } from './Display/booking-truck-wise-display/booking-truck-wise-display.component';
import { BookingDisplayCountByDateComponent } from './Display/booking-display-count-by-date/booking-display-count-by-date.component';
import { BookingUpdateComponent } from './booking-update/booking-update.component';
import { BookingTruckWisePartyComponent } from './Display/booking-truck-wise-party/booking-truck-wise-party.component';


export const BookingRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'Booking_Handler'
        },
        {
            path: 'Booking_Handler',
            component: BookingHandlerComponent,
            children:
                [
                    {
                        path: '',
                        redirectTo: 'BookAdd',
                        pathMatch: 'full'
                    },
                    {
                        path: 'BookAdd',
                        component: BookingaddComponent
                    },
                    {
                        path: 'BookDispMain',
                        component: BookingDisplayMainComponent,
                        children:
                            [
                                {
                                    path: '',
                                    component: BookingdispComponent
                                },
                                {
                                    path: 'BookDisp',
                                    component: BookingdispComponent
                                },
                                {
                                    path: 'BookDispDateWise',
                                    component: BookingDateWiseDisplayComponent
                                },
                                {
                                    path: 'BookDispTruckWise',
                                    component: BookingTruckWiseDisplayComponent
                                },
                                {
                                    path: 'BookDispTruckWiseParty',
                                    component: BookingTruckWisePartyComponent
                                },
                                {
                                    path: 'CountByDateDisplay',
                                    component: BookingDisplayCountByDateComponent
                                }
                            ]
                    },
                    {
                        path: 'BookingUpdate',
                        component: BookingUpdateComponent
                    }
                ]
        }
    ];
