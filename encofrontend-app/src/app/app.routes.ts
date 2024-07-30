import { Routes } from '@angular/router';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { LocationComponent } from './components/location/location.component';
import {SampleDetailComponent} from "./components/sample-detail/sample-detail.component";



export const routes: Routes = [
  { path: 'equipments', component: EquipmentComponent },
  { path: 'locations', component: LocationComponent },
  { path: 'sample-details', component: SampleDetailComponent }
];
