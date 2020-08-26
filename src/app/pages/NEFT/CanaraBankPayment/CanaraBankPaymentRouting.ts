import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';

import { CanBankPaymentAddComponent } from './can-bank-payment-add/can-bank-payment-add.component';
import { CanBankPaymentHandlerComponent } from './can-bank-payment-handler/can-bank-payment-handler.component';
import { CanBankPaymentUpdateComponent } from './can-bank-payment-update/can-bank-payment-update.component';
import { CanBankPaymentMainComponent } from './Display/can-bank-payment-main/can-bank-payment-main.component';
import { CanBankPaymentDispComponent } from './Display/can-bank-payment-disp/can-bank-payment-disp.component';
import { CanBankPaymentDispDateComponent } from './Display/can-bank-payment-disp-date/can-bank-payment-disp-date.component';
import { CanBankPaymentDispPartyComponent } from './Display/can-bank-payment-disp-party/can-bank-payment-disp-party.component';

export const CanaraBankPaymentRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'CanaraBankPayment_HANDLER'
        },
        {
            path: 'CanaraBankPayment_HANDLER',
            component: CanBankPaymentHandlerComponent,
            children:
                [
                    {
                        path: '',
                        redirectTo: 'CanaraBankPaymentDispMain',
                        pathMatch: 'full'
                    },
                    {
                        path: 'CanaraBankPaymentAdd',
                        component: CanBankPaymentAddComponent,
                        children:
                            [
                                // {
                                //     path: 'BANKDETAILS_HANDLER',
                                //     component: BankDetailsAddComponent,
                                // },
                                // {
                                //     path: 'TRUCKBANKDETAILS_HANDLER',
                                //     component: AddBankTruckDetailsComponent,
                                // },
                                // {
                                //     path: 'BANKNAME_HANDLER',
                                //     component: BankNameAddComponent,
                                // }
                            ]
                    },
                    {
                        path: 'CanaraBankPaymentDispMain',
                        component: CanBankPaymentMainComponent,
                        children:
                            [
                                {
                                    path: '',
                                    component: CanBankPaymentDispComponent
                                },
                                {
                                    path: 'CanaraBankPaymentDisp',
                                    component: CanBankPaymentDispComponent
                                },
                                {
                                    path: 'CanaraBankPaymentDispDate',
                                    component: CanBankPaymentDispDateComponent
                                },
                                {
                                    path: 'CanaraBankPaymentDispParty',
                                    component: CanBankPaymentDispPartyComponent
                                }
                            ]
                    },
                    {
                        path: 'CanaraBankPaymentUpdate',
                        component: CanBankPaymentUpdateComponent
                    }
                ]
        }
    ];
