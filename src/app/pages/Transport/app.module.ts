import { NgModule } from '@angular/core';
import { TransportRouting } from './TransportRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransportAddComponent } from './transport-add/transport-add.component';
import { TransportDisplayComponent } from './transport-display/transport-display.component';
import { TransportHandlerComponent } from './transport-handler/transport-handler.component';
import { TransportUpdateComponent } from './transport-update/transport-update.component';

@NgModule({
    declarations: [
        TransportHandlerComponent,
        TransportAddComponent,
        TransportDisplayComponent,
        TransportUpdateComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(TransportRouting),

    ],
    providers: [],
    bootstrap: []
})
export class AppModule { }