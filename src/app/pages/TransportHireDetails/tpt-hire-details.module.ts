import { NgModule } from '@angular/core';
import { TptHireRouting } from './TptHireRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TptHireDetailsHandlerComponent } from './tpt-hire-details-handler/tpt-hire-details-handler.component';
import { TptHireDetailsAddComponent } from './tpt-hire-details-add/tpt-hire-details-add.component';
import { TptHireDetailsDisplayHandlerComponent } from './Display/tpt-hire-details-display-handler/tpt-hire-details-display-handler.component';
import { TptHireDetailsDisplayComponent } from './Display/tpt-hire-details-display/tpt-hire-details-display.component';
import { TptHireDetailsUpdateComponent } from './tpt-hire-details-update/tpt-hire-details-update.component';
import { TPTHireDetailsPartyWiseComponent } from './Display/tpthire-details-party-wise/tpthire-details-party-wise.component';


@NgModule({
    declarations: [
        TptHireDetailsHandlerComponent,
        TptHireDetailsAddComponent,
        TptHireDetailsDisplayHandlerComponent,
        TptHireDetailsDisplayComponent,
        TptHireDetailsUpdateComponent,
        TPTHireDetailsPartyWiseComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(TptHireRouting),

    ],
    providers: [],
    bootstrap: []
})
export class TptHireDetailsModule { }