import { NgModule } from '@angular/core';
import { PochCollectionRouting } from './PochCollectionRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PochCollectorComponent } from './poch-collector/poch-collector.component';
import { PochHandlerComponent } from './poch-handler/poch-handler.component';
import { PochPdfComponent } from './poch-pdf/poch-pdf.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
    declarations: [
        PochCollectorComponent,
        PochHandlerComponent,
        PochPdfComponent,
    ],
    imports: [
        CommonModule,
        QRCodeModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(PochCollectionRouting),
    ],
    providers: [],
    bootstrap: []
})
export class AppModule { }
