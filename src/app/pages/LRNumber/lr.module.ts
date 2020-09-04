import { NgModule } from '@angular/core';
import { LRRouting } from './LRRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LRNumberDisplayComponent } from './lrnumber-display/lrnumber-display.component';

@NgModule({
    declarations: [
        LRNumberDisplayComponent
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