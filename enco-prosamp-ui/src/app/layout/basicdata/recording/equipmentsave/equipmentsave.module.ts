import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EquipmentsaveRoutingModule} from './equipmentsave-routing.module';
import {EquipmentsaveComponent} from './equipmentsave.component';
import {PageHeaderModule} from "../../../../shared";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        EquipmentsaveComponent
    ],
    imports: [
        CommonModule,
        EquipmentsaveRoutingModule,
        PageHeaderModule,
        ReactiveFormsModule
    ]
})
export class EquipmentsaveModule {
}
