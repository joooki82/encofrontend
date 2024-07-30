import { Routes } from '@angular/router';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { LocationComponent } from './components/location/location.component';


export const routes: Routes = [
  { path: 'equipment', component: EquipmentComponent },
  { path: 'locations', component: LocationComponent },
];
