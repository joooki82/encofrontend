import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from '../../shared';
import { SamplingrecordsComponent } from './samplingrecords.component';
import {SamplingrecordsRoutingModule} from "./samplingrecords-routing.module";


@NgModule({
    imports: [CommonModule, PageHeaderModule, SamplingrecordsRoutingModule],
    declarations: [SamplingrecordsComponent]
})
export class SamplingrecordsModule {}
