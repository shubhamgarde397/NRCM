import { NgModule } from '@angular/core';
import { BCERouting } from './BCERouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BCEHandlerComponent } from './bcehandler/bcehandler.component';
import { BCEDisplayComponent } from './bcedisplay/bcedisplay.component';
import { BCEAddHireComponent } from './bceadd-hire/bceadd-hire.component';
import { BCEUpdateComponent } from './bceupdate/bceupdate.component';

@NgModule({
    declarations: [
        BCEHandlerComponent,
        BCEDisplayComponent,
        BCEAddHireComponent,
        BCEUpdateComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(BCERouting),

    ],
    providers: [],
    bootstrap: []
})
export class BCEModule { }
