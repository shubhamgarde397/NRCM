import { NgModule } from '@angular/core';
import { CanaraBankPaymentRouting } from './CanaraBankPaymentRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CanBankPaymentAddComponent } from './can-bank-payment-add/can-bank-payment-add.component';
import { CanBankPaymentHandlerComponent } from './can-bank-payment-handler/can-bank-payment-handler.component';
import { CanBankPaymentUpdateComponent } from './can-bank-payment-update/can-bank-payment-update.component';
import { CanBankPaymentMainComponent } from './Display/can-bank-payment-main/can-bank-payment-main.component';
import { CanBankPaymentDispComponent } from './Display/can-bank-payment-disp/can-bank-payment-disp.component';
import { CanBankPaymentDispDateComponent } from './Display/can-bank-payment-disp-date/can-bank-payment-disp-date.component';
import { CanBankPaymentDispPartyComponent } from './Display/can-bank-payment-disp-party/can-bank-payment-disp-party.component';

@NgModule({
    declarations: [
        CanBankPaymentAddComponent,
        CanBankPaymentHandlerComponent,
        CanBankPaymentUpdateComponent,
        CanBankPaymentMainComponent,
        CanBankPaymentDispComponent,
        CanBankPaymentDispDateComponent,
        CanBankPaymentDispPartyComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(CanaraBankPaymentRouting),

    ],
    providers: [],
    bootstrap: []
})
export class CanaraBankPaymentModule { }
