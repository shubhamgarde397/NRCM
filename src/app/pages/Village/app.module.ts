import { NgModule } from '@angular/core';
import { VillageRouting } from './VillageRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VillageHandlerComponent } from './village-handler/village-handler.component';
import { VillagedispComponent } from './villagedisp/villagedisp.component';
import { VillageaddComponent } from './villageadd/villageadd.component';
import { VillageUpdateComponent } from './village-update/village-update.component';

@NgModule({
    declarations: [
        VillageHandlerComponent,
        VillagedispComponent,
        VillageaddComponent,
        VillageUpdateComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(VillageRouting),

    ],
    providers: [],
    bootstrap: []
})
export class AppModule { }