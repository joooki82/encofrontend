import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsaveComponent } from './locationsave.component';

const routes: Routes = [{ path: '', component: LocationsaveComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsaveRoutingModule { }
