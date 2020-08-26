import { NgModule } from '@angular/core';
import { RegularPartyRouting } from './RegularPartyRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegularpartyhandlerComponent } from './regularpartyhandler/regularpartyhandler.component';
import { RegularPartyDispComponent } from './regular-party-disp/regular-party-disp.component';
import { RegularPartyAddComponent } from './regular-party-add/regular-party-add.component';
import { RegularPartyUpdateComponent } from './regular-party-update/regular-party-update.component';


@NgModule({
    declarations: [
        RegularpartyhandlerComponent,
        RegularPartyDispComponent,
        RegularPartyAddComponent,
        RegularPartyUpdateComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(RegularPartyRouting),

    ],
    providers: [],
    bootstrap: []
})
export class AppModule { }