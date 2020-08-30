import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { FinolexHandlerComponent } from './finolex-handler/finolex-handler.component';
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
                        component: FinolexdisplaysendComponent
                    },
                    {
                        path: 'FinolexDispSend',
                        component: FinolexdisplaysendComponent
                    }

                ]
        }
    ]