import { NgModule } from '@angular/core';
import { ChartDataRouting } from './ChartRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from './bar-chart.component';

@NgModule({
    declarations: [
        BarChartComponent,

    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(ChartDataRouting),

    ],
    providers: [],
    bootstrap: []
})
export class AppModule { }