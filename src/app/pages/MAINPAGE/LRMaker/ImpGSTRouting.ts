
import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { LrdisplayComponent } from './lrdisplay/lrdisplay.component';
import { LrsetComponent } from './lrset/lrset.component';
import { LRHandlerComponent } from './lrhandler/lrhandler.component';

export const ImpGSTRouting: Routes =
[
    {
        path: '',
        redirectTo: 'DIGILR'
    },
    {
        path: 'DIGILR',
        component: LRHandlerComponent,
        children:
            [
                {
                    path: '',
                    component: LrdisplayComponent
                },
                {
                    path: 'Set',
                    component: LrsetComponent
                },
                {
                    path: 'Display',
                    component: LrdisplayComponent
                }
            ]
    }
]