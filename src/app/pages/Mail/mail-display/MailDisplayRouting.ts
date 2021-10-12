import {  Routes } from '@angular/router';
import { MailDisplayComponent } from './mail-display.component';

export const MailDisplayRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'MAIL_DISPLAY'
        },
        {
            path: 'MAIL_DISPLAY',
            component: MailDisplayComponent
          
        }
    ];
