import { NgModule } from '@angular/core';
import { REASONRouting } from './REASONRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HandlerComponent } from './handler/handler.component';
import { DisplayComponent } from './display/display.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
    declarations: [
        HandlerComponent,
        DisplayComponent,
        AddComponent,
        UpdateComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(REASONRouting),

    ],
    providers: [],
    bootstrap: []
})
export class AppModule { }