import { NgModule } from '@angular/core';
import { BankDetailsRouting } from './BankDetailsRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BankDetailsHandlerComponent } from './bank-details-handler/bank-details-handler.component';
import { BankDetailsDispComponent } from './bank-details-disp/bank-details-disp.component';
import { BankDetailsAddComponent } from './bank-details-add/bank-details-add.component';
import { BankDetailsUpdateComponent } from './bank-details-update/bank-details-update.component';

@NgModule({
    declarations: [
        BankDetailsHandlerComponent,
        BankDetailsDispComponent,
        BankDetailsAddComponent,
        BankDetailsUpdateComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(BankDetailsRouting),

    ],
    providers: [],
    bootstrap: []
})
export class BankDetailsModule { }