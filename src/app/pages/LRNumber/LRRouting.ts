import { Routes } from '@angular/router';
import { LRNumberDisplayComponent } from './lrnumber-display/lrnumber-display.component';

export const LRRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'LRNumberDisp'
        },
        {
            path: 'LRNumberDisp',
            component: LRNumberDisplayComponent
        }
    ];
