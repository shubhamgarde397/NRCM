
import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { AddComponent } from './add/add.component'
import { DisplayComponent } from './display/display.component'
import { UpdateComponent } from './update/update.component'
import { HandlerComponent } from './handler/handler.component'

export const PersoanlDetailsRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'PERSONAL_DETAILS_HANDLER'
        },
        {
            path: 'PERSONAL_DETAILS_HANDLER',
            component: HandlerComponent,
            children:
                [
                    {
                        path: '',
                        component: DisplayComponent
                    },
                    {
                        path: 'Add',
                        component: AddComponent
                    },
                    {
                        path: 'Display',
                        component: DisplayComponent
                    },
                    {
                        path: 'Update',
                        component: UpdateComponent
                    }
                ]
        }
    ]