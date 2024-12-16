import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { TurnBookHandlerComponent } from './turn-book-handler/turn-book-handler.component';
import { TurnBookDisplayHandlerComponent } from './Display/turn-book-display-handler/turn-book-display-handler.component';
import { TurnBookDisplayMainComponent } from './Display/turn-book-display-main/turn-book-display-main.component';
import { TurnBookUpdateComponent } from './turn-book-update/turn-book-update.component';
import { TurnBookAddComponent } from './turn-book-add/turn-book-add.component';

export const TurnBookRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'TURN_BOOK_HANDLER'
        },
        {
            path: 'TURN_BOOK_HANDLER',
            component: TurnBookHandlerComponent,
            children:
                [
                    {
                        path: '',
                        redirectTo: 'TurnBookDispHandler',
                        pathMatch: 'full'
                    },
                    {
                        path: 'TurnBookDispHandler',
                        component: TurnBookDisplayHandlerComponent,
                        children:
                            [
                                {
                                    path: '',
                                    component: TurnBookDisplayMainComponent
                                },
                                {
                                    path: 'TurnBookDisplay',
                                    component: TurnBookDisplayMainComponent
                                }
                            ]
                    },
                    {
                        path: 'TurnBookUpdate',
                        component: TurnBookUpdateComponent
                    }
                ]
        }
    ];
