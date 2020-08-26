import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { CashExpensesHandlerComponent } from './cash-expenses-handler/cash-expenses-handler.component';
import { CashExpensesDisplayComponent } from './cash-expenses-display/cash-expenses-display.component';
import { AddCashExpensesComponent } from './add-cash-expenses/add-cash-expenses.component';
import { UpdateCashExpensesComponent } from './update-cash-expenses/update-cash-expenses.component';

export const CashExpensesRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'Truck_CASH_EXPENSES_HANDLER'
        },
        {
            path: 'Truck_CASH_EXPENSES_HANDLER',
            component: CashExpensesHandlerComponent,
            children:
                [
                    {
                        path: '',
                        component: CashExpensesDisplayComponent
                    },
                    {
                        path: 'Truck_CashExpenses_Display',
                        component: CashExpensesDisplayComponent
                    },
                    {
                        path: 'Truck_CashExpenses_Add',
                        component: AddCashExpensesComponent,
                        children:
                            [
                                // {
                                //     path: 'REGULAR_TRUCK_HANDLER',
                                //     component: RegularTruckAddComponent,
                                // },
                            ]
                    },
                    {
                        path: 'Truck_CashExpenses_Update',
                        component: UpdateCashExpensesComponent
                    },
                ]
        }
    ];
