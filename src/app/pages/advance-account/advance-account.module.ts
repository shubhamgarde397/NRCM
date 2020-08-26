import { NgModule } from '@angular/core';
import { AdvanceAccountRouting } from './AdvanceAccountRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdvanceAccountHandlerComponent } from './advance-account-handler/advance-account-handler.component';
import { AdvanceAccountAddComponent } from './advance-account-add/advance-account-add.component';
import { DisplayHandlerComponent } from './Display/display-handler/display-handler.component';
import { AdvanceAccountDisplayComponent } from './Display/advance-account-display/advance-account-display.component';
import { AdvanceAccountPartyDisplayComponent } from './Display/advance-account-party-display/advance-account-party-display.component';
import { AdvanceAccountTruckComponent } from './Display/advance-account-truck/advance-account-truck.component';
import { AdvanceAccountDateComponent } from './Display/advance-account-date/advance-account-date.component';
import { AdvanceAccountCountComponent } from './Display/advance-account-count/advance-account-count.component';
import { AdvanceAccountUpdateComponent } from './advance-account-update/advance-account-update.component';

@NgModule({
    declarations: [
        AdvanceAccountHandlerComponent,
        AdvanceAccountAddComponent,
        DisplayHandlerComponent,
        AdvanceAccountDisplayComponent,
        AdvanceAccountPartyDisplayComponent,
        AdvanceAccountTruckComponent,
        AdvanceAccountDateComponent,
        AdvanceAccountCountComponent,
        AdvanceAccountUpdateComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(AdvanceAccountRouting),

    ],
    providers: [],
    bootstrap: []
})
export class AdvanceAccountModule { }