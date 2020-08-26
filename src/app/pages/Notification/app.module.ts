
import { NgModule } from '@angular/core';
import { NavigationRouting } from './NavigationRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationAddComponent } from './notification-add/notification-add.component';
import { NotificationDisplayComponent } from './notification-display/notification-display.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        NotificationAddComponent,
        NotificationDisplayComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(NavigationRouting),

    ],
    providers: [],
    bootstrap: []
})
export class AppModule { }