import { NgModule } from '@angular/core';
import { DriverRouting } from './DriverRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DriverdetailshandlerComponent } from './driverdetailshandler/driverdetailshandler.component';
import { DriverDispComponent } from './driver-disp/driver-disp.component';
import { DriverAddComponent } from './driver-add/driver-add.component';
import { DriverUpdateComponent } from './driver-update/driver-update.component';


@NgModule({
    declarations: [
        DriverdetailshandlerComponent,
        DriverDispComponent,
        DriverAddComponent,
        DriverUpdateComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(DriverRouting),

    ],
    providers: [],
    bootstrap: []
})
export class AppModule { }