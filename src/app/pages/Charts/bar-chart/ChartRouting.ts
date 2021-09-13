import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { BarChartComponent } from './bar-chart.component';

export const ChartDataRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'CHART'
        },
        {
            path: 'CHART',
            component: BarChartComponent
          
        }
    ];
