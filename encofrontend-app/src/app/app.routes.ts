import { Routes } from '@angular/router';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { LocationComponent } from './components/location/location.component';
import {SampleDetailComponent} from "./components/sample-detail/sample-detail.component";
import {SamplingRecordListComponent} from "./components/sampling-record-list/sampling-record-list.component";
import {SamplingRecordComponent} from "./components/sampling-record/sampling-record.component";
import {AddSamplingRecordComponent} from "./components/add-sampling-record/add-sampling-record.component";



export const routes: Routes = [
  { path: 'equipments', component: EquipmentComponent },
  { path: 'locations', component: LocationComponent },
  { path: 'sample-details', component: SampleDetailComponent },
  { path: 'sampling-record/:id', component: SamplingRecordComponent },
  { path: 'add-sampling-record', component: AddSamplingRecordComponent },
  { path: 'sampling-record-list', component: SamplingRecordListComponent }
];
