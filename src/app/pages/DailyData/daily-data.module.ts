import { NgModule } from '@angular/core';
import { DailyDataRouting } from './DailyDataRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DailyDataHandlerComponent } from './daily-data-handler/daily-data-handler.component';
import { DailyDataaddComponent } from './daily-dataadd/daily-dataadd.component';
import { DisplayMainComponent } from './Display/display-main/display-main.component';
import { DailyDataDispComponent } from './Display/daily-data-disp/daily-data-disp.component';
import { DisplayPartyComponent } from './Display/display-party/display-party.component';
import { DailyDataDateWiseComponent } from './Display/daily-data-date-wise/daily-data-date-wise.component';
import { DailyDataTruckWiseComponent } from './Display/daily-data-truck-wise/daily-data-truck-wise.component';
import { DailyDataCountByDateComponent } from 'src/app/pages/DailyData/Display/daily-data-count-by-date/daily-data-count-by-date.component';
import { DailyDataUpdateComponent } from './daily-data-update/daily-data-update.component';
import { DailyDataTruckWisePartyComponent } from './Display/daily-data-truck-wise-party/daily-data-truck-wise-party.component';
import { DailyDataDailyComponent } from './Display/daily-data-daily/daily-data-daily.component';

@NgModule({
    declarations: [
        DailyDataHandlerComponent,
        DailyDataaddComponent,
        DisplayMainComponent,
        DailyDataDispComponent,
        DisplayPartyComponent,
        DailyDataDateWiseComponent,
        DailyDataTruckWiseComponent,
        DailyDataCountByDateComponent,
        DailyDataUpdateComponent,
        DailyDataTruckWisePartyComponent,
        DailyDataDailyComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(DailyDataRouting),

    ],
    providers: [],
    bootstrap: []
})
export class DailyDataModule { }