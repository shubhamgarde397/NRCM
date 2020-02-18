import { NgModule } from '@angular/core';
import { BankTruckDetailsRouting } from './BankTruckDetailsRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BankTruckDetailsHandlerComponent } from './bank-truck-details-handler/bank-truck-details-handler.component';
import { DispBankTruckDetailsComponent } from './disp-bank-truck-details/disp-bank-truck-details.component';
import { AddBankTruckDetailsComponent } from './add-bank-truck-details/add-bank-truck-details.component';
import { UpdateBankTruckDetailsComponent } from './update-bank-truck-details/update-bank-truck-details.component';

@NgModule({
    declarations: [
        BankTruckDetailsHandlerComponent,
        DispBankTruckDetailsComponent,
        AddBankTruckDetailsComponent,
        UpdateBankTruckDetailsComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(BankTruckDetailsRouting),

    ],
    providers: [],
    bootstrap: []
})
export class BankTruckDetailsModule { }