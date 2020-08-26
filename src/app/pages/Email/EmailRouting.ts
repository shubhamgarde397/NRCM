import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { HireAmountDetailsComponent } from './hire-amount-details/hire-amount-details.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';

export const EmailRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'Email_Handler'
        },
        {
            path: 'Email_Handler',
            component: HireAmountDetailsComponent,
        },
        {
            path: 'Payments',
            component: PaymentDetailsComponent
        }
    ]