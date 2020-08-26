import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { BankDetailsHandlerComponent } from './bank-details-handler/bank-details-handler.component';
import { BankDetailsDispComponent } from './bank-details-disp/bank-details-disp.component';
import { BankDetailsAddComponent } from './bank-details-add/bank-details-add.component';
import { BankDetailsUpdateComponent } from './bank-details-update/bank-details-update.component';

export const BankDetailsRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'BANKDETAILS_HANDLER'
        },
        {
            path: 'BANKDETAILS_HANDLER',
            component: BankDetailsHandlerComponent,
            children:
                [
                    {
                        path: '',
                        component: BankDetailsDispComponent
                    },
                    {
                        path: 'BankDetailsAdd',
                        component: BankDetailsAddComponent
                    },
                    {
                        path: 'BankDetailsDisp',
                        component: BankDetailsDispComponent
                    },
                    {
                        path: 'BankDetailsUpdate',
                        component: BankDetailsUpdateComponent
                    }
                ]
        }
    ]