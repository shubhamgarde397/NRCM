
import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { ImpgsthandlerComponent } from './impgsthandler/impgsthandler.component';
import { ImpgstdispComponent } from './impgstdisp/impgstdisp.component';
import { ImpgstaddComponent } from './impgstadd/impgstadd.component';

export const ImpGSTRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'IMP_GST_HANDLER'
        },
        {
            path: 'IMP_GST_HANDLER',
            component: ImpgsthandlerComponent,
            children:
                [
                    {
                        path: '',
                        component: ImpgstdispComponent
                    },
                    {
                        path: 'IMPAdd',
                        component: ImpgstaddComponent
                    },
                    {
                        path: 'IMPDisp',
                        component: ImpgstdispComponent
                    }
                ]
        }
    ]