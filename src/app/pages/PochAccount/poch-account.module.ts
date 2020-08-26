import { NgModule } from '@angular/core';
import { PochAccountRouting } from './PochAccountRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PochAccountHandlerComponent } from './poch-account-handler/poch-account-handler.component';
import { PochAccountAddComponent } from './poch-account-add/poch-account-add.component';
import { PochDisplayHandlerComponent } from './Display/poch-display-handler/poch-display-handler.component';
import { PochAccountDispComponent } from './Display/poch-account-disp/poch-account-disp.component';
import { PochAccountPartyDisplayComponent } from './Display/poch-account-party-display/poch-account-party-display.component';
import { PochAccountTruckComponent } from './Display/poch-account-truck/poch-account-truck.component';
import { PochAccountDateComponent } from './Display/poch-account-date/poch-account-date.component';
import { PochAccountCountComponent } from './Display/poch-account-count/poch-account-count.component';
import { PochAccountUpdateComponent } from './poch-account-update/poch-account-update.component';

@NgModule({
    declarations: [
        PochAccountHandlerComponent,
        PochAccountAddComponent,
        PochDisplayHandlerComponent,
        PochAccountDispComponent,
        PochAccountPartyDisplayComponent,
        PochAccountTruckComponent,
        PochAccountDateComponent,
        PochAccountCountComponent,
        PochAccountUpdateComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(PochAccountRouting),

    ],
    providers: [],
    bootstrap: []
})
export class PochAccountModule { }