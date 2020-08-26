import { NgModule } from '@angular/core';
import { BookingRouting } from './BookingRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookingHandlerComponent } from './booking-handler/booking-handler.component';
import { BookingaddComponent } from './bookingadd/bookingadd.component';
import { BookingDisplayMainComponent } from './Display/booking-display-main/booking-display-main.component';
import { BookingdispComponent } from './Display/bookingdisp/bookingdisp.component';
import { BookingDateWiseDisplayComponent } from './Display/booking-date-wise-display/booking-date-wise-display.component';
import { BookingTruckWiseDisplayComponent } from './Display/booking-truck-wise-display/booking-truck-wise-display.component';
import { BookingDisplayCountByDateComponent } from './Display/booking-display-count-by-date/booking-display-count-by-date.component';
import { BookingUpdateComponent } from './booking-update/booking-update.component';
import { BookingTruckWisePartyComponent } from './Display/booking-truck-wise-party/booking-truck-wise-party.component';

@NgModule({
    declarations: [
        BookingHandlerComponent,
        BookingaddComponent,
        BookingDisplayMainComponent,
        BookingdispComponent,
        BookingDateWiseDisplayComponent,
        BookingTruckWiseDisplayComponent,
        BookingDisplayCountByDateComponent,
        BookingUpdateComponent,
        BookingTruckWisePartyComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(BookingRouting),
    ],
    providers: [],
    bootstrap: []
})
export class BookingModule { }
