import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentsaveComponent } from './equipmentsave.component';

const routes: Routes = [{ path: '', component: EquipmentsaveComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentsaveRoutingModule { }
