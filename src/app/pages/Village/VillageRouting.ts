
import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { VillageHandlerComponent } from './village-handler/village-handler.component';
import { VillagedispComponent } from './villagedisp/villagedisp.component';
import { VillageaddComponent } from './villageadd/villageadd.component';
import { VillageUpdateComponent } from './village-update/village-update.component';

export const VillageRouting: Routes =
    [
        {
            path: '',
            redirectTo: 'VILLAGE_HANDLER'
        },
        {
            path: 'VILLAGE_HANDLER',
            component: VillageHandlerComponent,
            children:
                [
                    {
                        path: '',
                        component: VillagedispComponent
                    },
                    {
                        path: 'VillageAdd',
                        component: VillageaddComponent
                    },
                    {
                        path: 'VillageDisp',
                        component: VillagedispComponent
                    },
                    {
                        path: 'VillageUpdate',
                        component: VillageUpdateComponent
                    },

                ]
        }
    ]