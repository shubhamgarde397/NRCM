import { NgModule } from '@angular/core';
import { RegularTruckRouting } from './RegularTruckRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegularTruckDispComponent } from './regular-truck-disp/regular-truck-disp.component';
import { RegularTruckAddComponent } from './regular-truck-add/regular-truck-add.component';
import { RegularTruckUpdateComponent } from './regular-truck-update/regular-truck-update.component';
import { RegularTruckHandlerComponent } from './regular-truck-handler/regular-truck-handler.component';

@NgModule({
    declarations: [
        RegularTruckDispComponent,
        RegularTruckAddComponent,
        RegularTruckUpdateComponent,
        RegularTruckHandlerComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(RegularTruckRouting),

    ],
    providers: [],
    bootstrap: []
})
export class AppModule { }