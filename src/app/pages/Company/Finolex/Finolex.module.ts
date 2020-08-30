import { NgModule } from '@angular/core';
import { FinolexRouting } from './FinolexRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FinolexHandlerComponent } from './finolex-handler/finolex-handler.component';
import { FinolexdisplaysendComponent } from './finolexdisplaysend/finolexdisplaysend.component';
import { FinolexTruckWiseDisplayComponent } from './finolex-truck-wise-display/finolex-truck-wise-display.component';
import { FinolexDisplayPartyWiseComponent } from './finolex-display-party-wise/finolex-display-party-wise.component';
import { FinolexUpdateComponent } from './finolex-update/finolex-update.component';

@NgModule({
    declarations: [
        FinolexHandlerComponent,
        FinolexdisplaysendComponent,
        FinolexTruckWiseDisplayComponent,
        FinolexDisplayPartyWiseComponent,
        FinolexUpdateComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(FinolexRouting),
    ],
    providers: [],
    bootstrap: []
})
export class FinolexModule { }
