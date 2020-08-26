import { NgModule } from '@angular/core';
import { BankNameRouting } from './BankNameRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BankNameHandlerComponent } from './bank-name-handler/bank-name-handler.component';
import { BankNameDispComponent } from './bank-name-disp/bank-name-disp.component';
import { BankNameAddComponent } from './bank-name-add/bank-name-add.component';
import { BankNameUpdateComponent } from './bank-name-update/bank-name-update.component';

@NgModule({
    declarations: [
        BankNameHandlerComponent,
        BankNameDispComponent,
        BankNameAddComponent,
        BankNameUpdateComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(BankNameRouting),

    ],
    providers: [],
    bootstrap: []
})
export class BankNameModule { }