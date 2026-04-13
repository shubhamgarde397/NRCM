import { NgModule } from '@angular/core';
import { PartyPaymentRouting } from './PartyPaymentRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { DisplayComponent } from './display/display.component';
import { UpdateComponent } from './update/update.component';
import { HandlerComponent } from './handler/handler.component';
import { PaymentsComponent } from './payments/payments.component';
import { PendingComponent } from './pending/pending.component';
import { TptpmtComponent } from './TptPmt/tptpmt/tptpmt.component';
import { TptPmtDetailsComponent } from './TptPmtDetails/tpt-pmt-details/tpt-pmt-details.component';


@NgModule({
    declarations: [
        AddComponent,
        DisplayComponent,
        UpdateComponent,
        HandlerComponent,
        PaymentsComponent,
        PendingComponent,
        TptpmtComponent,
        TptPmtDetailsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(PartyPaymentRouting),

    ],
    providers: [],
    bootstrap: []
})
export class AppModule { }