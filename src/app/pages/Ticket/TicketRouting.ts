import { RouterModule, Routes } from '@angular/router';
import { TicketDisplayComponent } from './ticket-display/ticket-display.component';
import { TicketHandlerComponent } from './ticket-handler/ticket-handler.component';

export const TurnBookRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'SHIVAPUR_Ticket_HANDLER'
        },
        {
            path: 'SHIVAPUR_Ticket_HANDLER',
            component: TicketHandlerComponent,
            children:
                [
                    {
                        path: '',
                        redirectTo: 'TicketDisp',
                        pathMatch: 'full'
                    },
                    {
                        path: 'TicketDisp',
                        component: TicketDisplayComponent
                    }
                ]
        }
    ];
