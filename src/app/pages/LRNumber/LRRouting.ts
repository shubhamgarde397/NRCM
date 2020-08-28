import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { LRNumberHandlerComponent } from './lrnumber-handler/lrnumber-handler.component';
import { LRNumberDisplayComponent } from './lrnumber-display/lrnumber-display.component';
import { LRNumberUpdateComponent } from './lrnumber-update/lrnumber-update.component';
import { LrnumberNotComponent } from './lrnumber-not/lrnumber-not.component';

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
                        path: 'LRNumberNot',
                        component: LrnumberNotComponent
                    },
                    {
                        path: 'LRNumberUpdate',
                        component: LRNumberUpdateComponent
                    }
                ]
        }
    ];
