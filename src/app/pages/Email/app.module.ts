import { NgModule } from '@angular/core';
import { EmailRouting } from './EmailRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HireAmountDetailsComponent } from './hire-amount-details/hire-amount-details.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';

@NgModule({
    declarations: [
        HireAmountDetailsComponent,
        PaymentDetailsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(EmailRouting),

    ],
    providers: [],
    bootstrap: []
})
export class AppModule { }