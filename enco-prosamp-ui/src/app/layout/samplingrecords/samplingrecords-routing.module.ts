import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SamplingrecordsComponent } from './samplingrecords.component';

const routes: Routes = [
    {
        path: '',
        component: SamplingrecordsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SamplingrecordsRoutingModule {}
