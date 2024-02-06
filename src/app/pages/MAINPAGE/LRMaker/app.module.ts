import { NgModule } from '@angular/core';
import { ImpGSTRouting } from './ImpGSTRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LrdisplayComponent } from './lrdisplay/lrdisplay.component';
import { LrsetComponent } from './lrset/lrset.component';
import { LRHandlerComponent } from './lrhandler/lrhandler.component';

@NgModule({
    declarations: [
        LrdisplayComponent,
        LrsetComponent,
        LRHandlerComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(ImpGSTRouting),
    ],
    providers: [],
    bootstrap: []
})
export class AppModule { }