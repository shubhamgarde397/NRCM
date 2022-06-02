import { NgModule } from '@angular/core';
import { TurnBookRouting } from './TurnBookRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TurnBookUpdateComponent } from './turn-book-update/turn-book-update.component';
import { TurnBookAddComponent } from './turn-book-add/turn-book-add.component';
import { TurnBookDisplayComponent } from './turn-book-display/turn-book-display.component';
import { TurnBookHandlerComponent } from './turn-book-handler/turn-book-handler.component'

@NgModule({
    declarations: [
        TurnBookHandlerComponent,
        TurnBookAddComponent,
        TurnBookDisplayComponent,
        TurnBookUpdateComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(TurnBookRouting),

    ],
    providers: [],
    bootstrap: []
})
export class TurnBookModule { }