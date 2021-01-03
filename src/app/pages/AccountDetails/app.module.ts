import { NgModule } from '@angular/core';
import { AccountDetailsRouting } from './AccountDetailsRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component'
import { DisplayComponent } from './display/display.component'
import { UpdateComponent } from './update/update.component'
import { HandlerComponent } from './handler/handler.component'

@NgModule({
    declarations: [
        HandlerComponent,
        AddComponent,
        DisplayComponent,
        UpdateComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(AccountDetailsRouting),

    ],
    providers: [],
    bootstrap: []
})
export class ADModule { }