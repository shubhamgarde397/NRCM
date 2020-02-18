
import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { ImpgsthandlerComponent } from './impgsthandler/impgsthandler.component';
import { ImpgstdispComponent } from './impgstdisp/impgstdisp.component';
import { ImpgstaddComponent } from './impgstadd/impgstadd.component';
import { ImpgstupdateComponent } from './impgstupdate/impgstupdate.component';

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
                        path: 'ImpGSTAdd',
                        component: ImpgstaddComponent
                    },
                    {
                        path: 'ImpGSTDisp',
                        component: ImpgstdispComponent
                    },
                    {
                        path: 'ImpGSTUpdate',
                        component: ImpgstupdateComponent
                    }
                ]
        }
    ]