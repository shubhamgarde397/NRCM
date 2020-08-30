import { NgModule } from '@angular/core';
import { FinolexRouting } from './FinolexRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FinolexHandlerComponent } from './finolex-handler/finolex-handler.component';
import { FinolexdisplayComponent } from './finolexdisplay/finolexdisplay.component';
import { FinolexdisplaysendComponent } from './finolexdisplaysend/finolexdisplaysend.component';
import { FinolexUpdateComponent } from './finolex-update/finolex-update.component';

@NgModule({
    declarations: [
        FinolexHandlerComponent,
        FinolexdisplayComponent,
        FinolexdisplaysendComponent,
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
