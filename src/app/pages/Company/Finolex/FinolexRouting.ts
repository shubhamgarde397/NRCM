import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { FinolexHandlerComponent } from './finolex-handler/finolex-handler.component';
import { FinolexdisplayComponent } from './finolexdisplay/finolexdisplay.component';
import { FinolexdisplaysendComponent } from './finolexdisplaysend/finolexdisplaysend.component';

export const FinolexRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'Finolex_Handler'
        },
        {
            path: 'Finolex_Handler',
            component: FinolexHandlerComponent,
            children:
                [
                    {
                        path: '',
                        component: FinolexdisplayComponent
                    },
                    {
                        path: 'FinolexDisp',
                        component: FinolexdisplayComponent
                    },
                    {
                        path: 'FinolexDispSend',
                        component: FinolexdisplaysendComponent
                    }

                ]
        }
    ]