import { NgModule } from '@angular/core';
import { OwnerRouting } from './OwnerRouting';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OddispComponent } from './oddisp/oddisp.component';
import { OwnerUpdateComponent } from './owner-update/owner-update.component';
import { OwnerhandlerComponent } from './ownerhandler/ownerhandler.component';

@NgModule({
    declarations: [
        OwnerhandlerComponent,
        OddispComponent,
        OwnerUpdateComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(OwnerRouting),

    ],
    providers: [],
    bootstrap: []
})
export class OwnerModule { }