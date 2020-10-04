import { NgModule } from '@angular/core';
import { BookingOtherRouting } from './BookingOtherRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookingOtherHandlerComponent } from './booking-other-handler/booking-other-handler.component';
import { BookingOtherAddComponent } from './booking-other-add/booking-other-add.component';

@NgModule({
    declarations: [
        BookingOtherAddComponent,
        BookingOtherHandlerComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(BookingOtherRouting),

    ],
    providers: [],
    bootstrap: []
})
export class AppModule { }