import { NgModule } from '@angular/core';
import { TurnBookRouting } from './TurnBookRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TurnBookAddComponent } from './turn-book-add/turn-book-add.component';
import { TurnBookHandlerComponent } from './turn-book-handler/turn-book-handler.component';
import { TurnBookDisplayHandlerComponent } from './Display/turn-book-display-handler/turn-book-display-handler.component';
import { TurnBookDisplayMainComponent } from './Display/turn-book-display-main/turn-book-display-main.component';
import { TurnBookUpdateComponent } from './turn-book-update/turn-book-update.component';
import { TurnBookAddUpdateRequiredComponent } from './turn-book-add-update-required/turn-book-add-update-required.component';

@NgModule({
    declarations: [
        TurnBookHandlerComponent,
        TurnBookAddComponent,
        TurnBookDisplayHandlerComponent,
        TurnBookDisplayMainComponent,
        TurnBookUpdateComponent,
        TurnBookAddUpdateRequiredComponent,
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