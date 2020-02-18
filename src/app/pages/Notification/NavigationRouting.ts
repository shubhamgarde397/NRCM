import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { NotificationDisplayComponent } from './notification-display/notification-display.component';
import { NotificationAddComponent } from './notification-add/notification-add.component';

export const NavigationRouting: Routes =
    [
        {
            path: '',
            component: NotificationDisplayComponent
        },

        {
            path: 'Notification',
            component: NotificationDisplayComponent,
            children:
                [
                    {
                        path: 'Notification_Add',
                        component: NotificationAddComponent
                    }
                ]
        }
    ]
