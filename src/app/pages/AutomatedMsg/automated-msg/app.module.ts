import { NgModule } from '@angular/core';
import { AutomatedRouting } from './AutomatedMsgRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutomatedMsgComponent } from './automated-msg.component';

@NgModule({
    declarations: [
        AutomatedMsgComponent,

    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(AutomatedRouting),

    ],
    providers: [],
    bootstrap: []
})
export class AppModule { }