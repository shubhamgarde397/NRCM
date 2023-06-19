import { NgModule } from '@angular/core';
import { TurnBookRouting } from './TurnBookRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TurnBookHandlerComponent } from './turn-book-handler/turn-book-handler.component';
import { TurnBookDisplayHandlerComponent } from './Display/turn-book-display-handler/turn-book-display-handler.component';
import { TurnBookDisplayMainComponent } from './Display/turn-book-display-main/turn-book-display-main.component';
import { TurnBookUpdateComponent } from './turn-book-update/turn-book-update.component';
import {TurnBookAddComponent} from './turn-book-add/turn-book-add.component'

@NgModule({
    declarations: [
        TurnBookHandlerComponent,
        TurnBookDisplayHandlerComponent,
        TurnBookDisplayMainComponent,
        TurnBookUpdateComponent,
        TurnBookAddComponent
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