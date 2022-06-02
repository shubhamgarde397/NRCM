import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { TurnBookUpdateComponent } from './turn-book-update/turn-book-update.component';
import { TurnBookAddComponent } from './turn-book-add/turn-book-add.component';
import { TurnBookDisplayComponent } from './turn-book-display/turn-book-display.component';
import { TurnBookHandlerComponent } from './turn-book-handler/turn-book-handler.component'

export const TurnBookRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'SHIVAPUR_TURNBOOK_HANDLER'
        },
        {
            path: 'SHIVAPUR_TURNBOOK_HANDLER',
            component: TurnBookHandlerComponent,
            children:
                [
                    {
                        path: '',
                        redirectTo: 'TurnBookDisp',
                        pathMatch: 'full'
                    },
                    {
                        path: 'TurnBookAdd',
                        component: TurnBookAddComponent,
                    },
                    {
                        path: 'TurnBookDisp',
                        component: TurnBookDisplayComponent
                    },
                    {
                        path: 'TurnBookUpdate',
                        component: TurnBookUpdateComponent
                    }
                ]
        }
    ];
