import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { BankNameHandlerComponent } from './bank-name-handler/bank-name-handler.component';
import { BankNameDispComponent } from './bank-name-disp/bank-name-disp.component';
import { BankNameAddComponent } from './bank-name-add/bank-name-add.component';
import { BankNameUpdateComponent } from './bank-name-update/bank-name-update.component';

export const BankNameRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'BANKNAME_HANDLER'
        },
        {
            path: 'BANKNAME_HANDLER',
            component: BankNameHandlerComponent,
            children:
                [
                    {
                        path: '',
                        component: BankNameDispComponent
                    },
                    {
                        path: 'BankNameDisp',
                        component: BankNameDispComponent
                    },
                    {
                        path: 'BankNameAdd',
                        component: BankNameAddComponent
                    },
                    {
                        path: 'BankNameUpdate',
                        component: BankNameUpdateComponent
                    }
                ]
        }
    ]