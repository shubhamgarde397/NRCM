import { NgModule } from '@angular/core';
import { BalanceHireRouting } from './BalanceHireRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BalancehirehandlerComponent } from './balancehirehandler/balancehirehandler.component';
import { BalancehireaddComponent } from './balancehireadd/balancehireadd.component';
import { BalancehiredisplayComponent } from './balancehiredisplay/balancehiredisplay.component';

@NgModule({
    declarations: [
        BalancehirehandlerComponent,
        BalancehireaddComponent,
        BalancehiredisplayComponent
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
