import { NgModule } from '@angular/core';
import { BalanceHireRouting } from './BalanceHireRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BalancehiredisplayComponent } from './balancehiredisplay/balancehiredisplay.component';
import { BalanceHireAddComponent } from './balance-hire-add/balance-hire-add.component';
import { BalanceHireHandlerComponent } from './balance-hire-handler/balance-hire-handler.component';
import { BalanceHireAddComponentA } from './balance-hire-add-a/balance-hire-add.component';
import { BHDigiComponent } from './bhdigi/bhdigi.component';


@NgModule({
    declarations: [
        BalancehiredisplayComponent,
        BalanceHireAddComponent,
        BalanceHireHandlerComponent,
        BalanceHireAddComponentA,
        BHDigiComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(BalanceHireRouting),
    ],
    providers: [],
    bootstrap: []
})
export class AppModule { }
