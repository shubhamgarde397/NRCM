
import { Routes } from '@angular/router';
import { PochCollectorComponent } from './poch-collector/poch-collector.component';
import { PochHandlerComponent } from './poch-handler/poch-handler.component';
import { PochPdfComponent } from './poch-pdf/poch-pdf.component';

export const PochCollectionRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'POCH_COLLECTION_HANDLER'
        },
        {
            path: 'POCH_COLLECTION_HANDLER',
            component: PochHandlerComponent,
            children:
                [
                    {
                        path: '',
                        component: PochPdfComponent
                    },
                    {
                        path: 'PochPDF',
                        component: PochPdfComponent
                    },
                    {
                        path: 'PochCollection',
                        component: PochCollectorComponent
                    }

                ]
        }
    ]