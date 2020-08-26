import { NgModule } from '@angular/core';
import { CanaraBankRouting } from './CanaraBankRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CanBankNeftHandlerComponent } from './can-bank-neft-handler/can-bank-neft-handler.component';
import { CanBankNeftAddComponent } from './can-bank-neft-add/can-bank-neft-add.component';
import { CanaraDisplayMainComponent } from './Display/canara-display-main/canara-display-main.component';
import { CanBankNeftDispComponent } from './Display/can-bank-neft-disp/can-bank-neft-disp.component';
import { CanaraDisplayDateComponent } from './Display/canara-display-date/canara-display-date.component';
import { CanBANKNEFTUpdateComponent } from './can-bankneftupdate/can-bankneftupdate.component';
import { CanaraDisplayTruckComponent } from './Display/canara-display-truck/canara-display-truck.component';
import { CanaraDisplayTodayComponent } from './Display/canara-display-today/canara-display-today.component';

@NgModule({
    declarations: [
        CanBankNeftHandlerComponent,
        CanBankNeftAddComponent,
        CanaraDisplayMainComponent,
        CanBankNeftDispComponent,
        CanaraDisplayDateComponent,
        CanBANKNEFTUpdateComponent,
        CanaraDisplayTruckComponent,
        CanaraDisplayTodayComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(CanaraBankRouting),

    ],
    providers: [],
    bootstrap: []
})
export class CanaraBankModule { }
