import { NgModule } from '@angular/core';
import { GSTRouting } from './GSTRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GsthandlerComponent } from './gsthandler/gsthandler.component';
import { GstaddComponent } from './gstadd/gstadd.component';
import { GstdisplayComponent } from './gstdisplay/gstdisplay.component';
import { GstupdateComponent } from './gstupdate/gstupdate.component';

@NgModule({
    declarations: [
        GsthandlerComponent,
        GstaddComponent,
        GstdisplayComponent,
        GstupdateComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(GSTRouting),

    ],
    providers: [],
    bootstrap: []
})
export class AppModule { }