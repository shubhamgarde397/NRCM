import { NgModule } from '@angular/core';
import { MailDisplayRouting } from './MailDisplayRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MailDisplayComponent } from './mail-display.component';

@NgModule({
    declarations: [
        MailDisplayComponent,

    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(MailDisplayRouting),

    ],
    providers: [],
    bootstrap: []
})
export class AppModule { }