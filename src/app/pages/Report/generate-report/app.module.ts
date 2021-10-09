import { NgModule } from '@angular/core';
import { ReportDataRouting } from './ReportDataRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GenerateReportComponent } from './generate-report.component';

@NgModule({
    declarations: [
        GenerateReportComponent,

    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(ReportDataRouting),

    ],
    providers: [],
    bootstrap: []
})
export class AppModule { }