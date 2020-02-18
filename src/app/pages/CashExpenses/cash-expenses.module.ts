import { NgModule } from '@angular/core';
import { CashExpensesRouting } from './CashExpensesRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CashExpensesHandlerComponent } from './cash-expenses-handler/cash-expenses-handler.component';
import { CashExpensesDisplayComponent } from './cash-expenses-display/cash-expenses-display.component';
import { AddCashExpensesComponent } from './add-cash-expenses/add-cash-expenses.component';
import { UpdateCashExpensesComponent } from './update-cash-expenses/update-cash-expenses.component';
@NgModule({
    declarations: [
        CashExpensesHandlerComponent,
        CashExpensesDisplayComponent,
        AddCashExpensesComponent,
        UpdateCashExpensesComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(CashExpensesRouting),

    ],
    providers: [],
    bootstrap: []
})
export class CashExpensesModule { }