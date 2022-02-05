
import { RouterModule, Routes } from '@angular/router';
import { HandlerComponent } from './handler/handler.component';
import { DisplayComponent } from './display/display.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';


export const REASONRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'REASON_HANDLER'
        },
        {
            path: 'REASON_HANDLER',
            component: HandlerComponent,
            children:
                [
                    {
                        path: '',
                        component: DisplayComponent
                    },
                    {
                        path: 'REASONAdd',
                        component: AddComponent
                    },
                    {
                        path: 'REASONDisp',
                        component: DisplayComponent
                    },
                    {
                        path: 'REASONUpdate',
                        component: UpdateComponent
                    },

                ]
        }
    ]