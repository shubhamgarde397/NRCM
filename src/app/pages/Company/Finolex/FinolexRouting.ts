import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { FinolexHandlerComponent } from './finolex-handler/finolex-handler.component';
import { FinolexdisplaysendComponent } from './finolexdisplaysend/finolexdisplaysend.component';
import { FinolexTruckWiseDisplayComponent } from './finolex-truck-wise-display/finolex-truck-wise-display.component';
import { FinolexDisplayPartyWiseComponent } from './finolex-display-party-wise/finolex-display-party-wise.component';

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
                    },
                    {
                        path: 'FinolexDispTruckWise',
                        component: FinolexTruckWiseDisplayComponent
                    },
                    {
                        path: 'FinolexDispPartyWise',
                        component: FinolexDisplayPartyWiseComponent
                    }

                ]
        }
    ]