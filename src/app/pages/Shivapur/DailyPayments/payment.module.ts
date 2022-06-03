import { NgModule } from '@angular/core';
import { PaymentRouting } from './PaymentRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PaymentAddComponent } from './payment-add/payment-add.component';
import { PaymentDisplayComponent } from './payment-display/payment-display.component';
import { PaymentHandlerComponent } from './payment-handler/payment-handler.component'

@NgModule({
    declarations: [
        PaymentAddComponent,
        PaymentDisplayComponent,
        PaymentHandlerComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(PaymentRouting),

    ],
    providers: [],
    bootstrap: []
})
export class PaymentModule { }