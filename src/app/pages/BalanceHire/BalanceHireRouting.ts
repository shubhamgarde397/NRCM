
import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { BalancehirehandlerComponent } from './balancehirehandler/balancehirehandler.component';
import { BalancehireaddComponent } from './balancehireadd/balancehireadd.component';
import { BalancehiredisplayComponent } from './balancehiredisplay/balancehiredisplay.component';

export const BalanceHireRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'BALANCE_HIRE_HANDLER'
        },
        {
            path: 'BALANCE_HIRE_HANDLER',
            component: BalancehirehandlerComponent,
            children:
                [
                    {
                        path: '',
                        component: BalancehireaddComponent
                    },
                    {
                        path: 'BalanceHireAdd',
                        component: BalancehireaddComponent
                    },
                    {
                        path: 'BalanceHireDisp',
                        component: BalancehiredisplayComponent
                    }

                ]
        }
    ]