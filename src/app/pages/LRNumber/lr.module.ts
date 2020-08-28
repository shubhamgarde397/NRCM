import { NgModule } from '@angular/core';
import { LRRouting } from './LRRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LRNumberHandlerComponent } from './lrnumber-handler/lrnumber-handler.component';
import { LRNumberDisplayComponent } from './lrnumber-display/lrnumber-display.component';
import { LRNumberUpdateComponent } from './lrnumber-update/lrnumber-update.component';
import { LrnumberNotComponent } from './lrnumber-not/lrnumber-not.component';

@NgModule({
    declarations: [
        LRNumberHandlerComponent,
        LRNumberDisplayComponent,
        LRNumberUpdateComponent,
        LrnumberNotComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(LRRouting),

    ],
    providers: [],
    bootstrap: []
})
export class LRModule { }