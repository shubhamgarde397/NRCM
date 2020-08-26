import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { BCEHandlerComponent } from './bcehandler/bcehandler.component';
import { BCEDisplayComponent } from './bcedisplay/bcedisplay.component';
import { BCEAddHireComponent } from './bceadd-hire/bceadd-hire.component';
import { BCEUpdateComponent } from './bceupdate/bceupdate.component';

export const BCERouting: Routes =
    [
        {
            path: '',
            redirectTo: 'BCE_HANDLER'
        },
        {
            path: 'BCE_HANDLER',
            component: BCEHandlerComponent,
            children:
                [
                    {
                        path: '',
                        component: BCEDisplayComponent,
                    },
                    {
                        path: 'BCEAddHire',
                        component: BCEAddHireComponent
                    },
                    {
                        path: 'BCEDisp',
                        component: BCEDisplayComponent
                    },
                    {
                        path: 'BCEUpdate',
                        component: BCEUpdateComponent
                    }
                ]
        }
    ];
