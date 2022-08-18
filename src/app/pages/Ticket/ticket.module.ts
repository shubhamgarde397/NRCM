import { NgModule } from '@angular/core';
import { TurnBookRouting } from './TicketRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {TicketDisplayComponent} from './ticket-display/ticket-display.component'
import {TicketHandlerComponent} from './ticket-handler/ticket-handler.component'


@NgModule({
    declarations: [
        TicketDisplayComponent,
        TicketHandlerComponent
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
export class TicketModule { }