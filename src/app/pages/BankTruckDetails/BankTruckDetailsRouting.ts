import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { BankTruckDetailsHandlerComponent } from './bank-truck-details-handler/bank-truck-details-handler.component';
import { DispBankTruckDetailsComponent } from './disp-bank-truck-details/disp-bank-truck-details.component';
import { AddBankTruckDetailsComponent } from './add-bank-truck-details/add-bank-truck-details.component';
import { UpdateBankTruckDetailsComponent } from './update-bank-truck-details/update-bank-truck-details.component';

export const BankTruckDetailsRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'TRUCKBANKDETAILS_HANDLER'
        },
        {
            path: 'TRUCKBANKDETAILS_HANDLER',
            component: BankTruckDetailsHandlerComponent,
            children:
                [
                    {
                        path: '',
                        component: DispBankTruckDetailsComponent
                    },
                    {
                        path: 'TruckBankDetailsDisp',
                        component: DispBankTruckDetailsComponent
                    },
                    {
                        path: 'TruckBankDetailsAdd',
                        component: AddBankTruckDetailsComponent
                    },
                    {
                        path: 'TruckBankDetailsUpdate',
                        component: UpdateBankTruckDetailsComponent
                    }
                ]
        }
    ]