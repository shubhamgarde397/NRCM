import { RouterModule, Routes } from '@angular/router';
import { LRNumberHandlerComponent } from './lrnumber-handler/lrnumber-handler.component';
import { LRNumberDisplayComponent } from './lrnumber-display/lrnumber-display.component';
import { LRNumberUpdateComponent } from './lrnumber-update/lrnumber-update.component';

export const LRRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'LRNumber_HANDLER'
        },
        {
            path: 'LRNumber_HANDLER',
            component: LRNumberHandlerComponent,
            children:
                [
                    {
                        path: '',
                        component: LRNumberDisplayComponent
                    },
                    {
                        path: 'LRNumberDisp',
                        component: LRNumberDisplayComponent
                    },
                    {
                        path: 'LRNumberUpdate',
                        component: LRNumberUpdateComponent
                    }
                ]
        }
    ];
