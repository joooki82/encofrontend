import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsaveRoutingModule } from './locationsave-routing.module';
import { LocationsaveComponent } from './locationsave.component';
import {ReactiveFormsModule} from "@angular/forms";
import {PageHeaderModule} from "../../../../shared";


@NgModule({
  declarations: [
    LocationsaveComponent
  ],
    imports: [
        CommonModule,
        LocationsaveRoutingModule,
        ReactiveFormsModule,
        PageHeaderModule
    ]
})
export class LocationsaveModule { }
