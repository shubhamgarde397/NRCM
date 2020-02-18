import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { CanBankNeftHandlerComponent } from './can-bank-neft-handler/can-bank-neft-handler.component';
import { CanBankNeftAddComponent } from './can-bank-neft-add/can-bank-neft-add.component';
import { CanaraDisplayMainComponent } from './Display/canara-display-main/canara-display-main.component';
import { CanBankNeftDispComponent } from './Display/can-bank-neft-disp/can-bank-neft-disp.component';
import { CanaraDisplayDateComponent } from './Display/canara-display-date/canara-display-date.component';
import { CanBANKNEFTUpdateComponent } from './can-bankneftupdate/can-bankneftupdate.component';
import { CanaraDisplayTruckComponent } from './Display/canara-display-truck/canara-display-truck.component';
import { CanaraDisplayTodayComponent } from './Display/canara-display-today/canara-display-today.component';

export const CanaraBankRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'CanaraBankNeft_HANDLER'
        },
        {
            path: 'CanaraBankNeft_HANDLER',
            component: CanBankNeftHandlerComponent,
            children:
                [
                    {
                        path: '',
                        redirectTo: 'CanaraBankNeftDispMain',
                        pathMatch: 'full'
                    },
                    {
                        path: 'CanaraBankNeftAdd',
                        component: CanBankNeftAddComponent,
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
                        path: 'CanaraBankNeftDispMain',
                        component: CanaraDisplayMainComponent,
                        children:
                            [
                                {
                                    path: '',
                                    component: CanaraDisplayTodayComponent
                                },
                                {
                                    path: 'CanaraBankNeftDispToday',
                                    component: CanaraDisplayTodayComponent
                                },
                                {
                                    path: 'CanaraBankNeftDisp',
                                    component: CanBankNeftDispComponent
                                },
                                {
                                    path: 'CanaraBankNeftDispDate',
                                    component: CanaraDisplayDateComponent
                                },
                                {
                                    path: 'CanaraBankNeftDispTruck',
                                    component: CanaraDisplayTruckComponent
                                }
                            ]
                    },
                    {
                        path: 'CanaraBankNeftUpdate',
                        component: CanBANKNEFTUpdateComponent
                    }
                ]
        }
    ];
