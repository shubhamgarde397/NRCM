import { NgModule } from '@angular/core';
import { LoadDetailsRouting } from './LoadDetailsRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {AddComponent} from './add/add.component'

@NgModule({
    declarations: [
        AddComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(LoadDetailsRouting),

    ],
    providers: [],
    bootstrap: []
})
export class AppModule { }