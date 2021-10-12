import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { GenerateReportComponent } from './generate-report.component';

export const ReportDataRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'OTHER_REPORT'
        },
        {
            path: 'OTHER_REPORT',
            component: GenerateReportComponent
          
        }
    ];
