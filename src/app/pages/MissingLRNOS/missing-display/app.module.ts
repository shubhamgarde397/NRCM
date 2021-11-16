import { NgModule } from '@angular/core';
import { PartyPaymentRouting } from './PartyPaymentRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MissingDisplayComponent} from './missing-display.component'


@NgModule({
    declarations: [
        MissingDisplayComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(PartyPaymentRouting),

    ],
    providers: [],
    bootstrap: []
})
export class AppModule { }