import { NgModule } from '@angular/core';
import { ImpGSTRouting } from './ImpGSTRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImpgstaddComponent } from './impgstadd/impgstadd.component';
import { ImpgstdispComponent } from './impgstdisp/impgstdisp.component';
import { ImpgstupdateComponent } from './impgstupdate/impgstupdate.component';
import { ImpgsthandlerComponent } from './impgsthandler/impgsthandler.component';

@NgModule({
    declarations: [
        ImpgstaddComponent,
        ImpgstdispComponent,
        ImpgsthandlerComponent,
        ImpgstupdateComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(ImpGSTRouting),
    ],
    providers: [],
    bootstrap: []
})
export class AppModule { }