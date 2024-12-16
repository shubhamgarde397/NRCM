import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { GsthandlerComponent } from './gsthandler/gsthandler.component';
import { GstdisplayComponent } from './gstdisplay/gstdisplay.component';
import { GstaddComponent } from './gstadd/gstadd.component';
import { GstupdateComponent } from './gstupdate/gstupdate.component';

export const GSTRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'GST_HANDLER'
        },
        {
            path: 'GST_HANDLER',
            component: GsthandlerComponent,
            children: [
                {
                    path: '',
                    component: GstdisplayComponent
                },
                {
                    path: 'GSTAdd',
                    component: GstaddComponent
                },
                {
                    path: 'GSTDisp',
                    component: GstdisplayComponent
                },
                {
                    path: 'GSTUpdate',
                    component: GstupdateComponent
                }
            ]
        }
    ]