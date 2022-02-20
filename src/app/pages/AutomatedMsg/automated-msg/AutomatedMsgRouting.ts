import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { AutomatedMsgComponent } from './automated-msg.component';

export const AutomatedRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'AUTOMATED_MSG'
        },
        {
            path: 'AUTOMATED_MSG',
            component: AutomatedMsgComponent
          
        }
    ];
