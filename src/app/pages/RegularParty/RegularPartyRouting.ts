
import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { RegularpartyhandlerComponent } from './regularpartyhandler/regularpartyhandler.component';
import { RegularPartyDispComponent } from './regular-party-disp/regular-party-disp.component';
import { RegularPartyAddComponent } from './regular-party-add/regular-party-add.component';
import { RegularPartyUpdateComponent } from './regular-party-update/regular-party-update.component';

export const RegularPartyRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'REGULAR_PARTY_HANDLER'
        },
        {
            path: 'REGULAR_PARTY_HANDLER',
            component: RegularpartyhandlerComponent,
            children:
                [
                    {
                        path: '',
                        component: RegularPartyDispComponent
                    },
                    {
                        path: 'RegularPartyAdd',
                        component: RegularPartyAddComponent
                    },
                    {
                        path: 'RegularPartyDisp',
                        component: RegularPartyDispComponent
                    },
                    {
                        path: 'RegularPartyUpdate',
                        component: RegularPartyUpdateComponent
                    }
                ]
        }
    ]