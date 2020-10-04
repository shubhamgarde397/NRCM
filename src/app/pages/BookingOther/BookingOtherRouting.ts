
import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { BookingOtherHandlerComponent } from './booking-other-handler/booking-other-handler.component';
import { BookingOtherAddComponent } from './booking-other-add/booking-other-add.component';

export const BookingOtherRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'BOOKING_OTHER_HANDLER'
        },
        {
            path: 'BOOKING_OTHER_HANDLER',
            component: BookingOtherHandlerComponent,
            children:
                [
                    {
                        path: 'BookingOtherAdd',
                        component: BookingOtherAddComponent
                    },
                ]
        }
    ]