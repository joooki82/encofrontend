import { Routes } from '@angular/router';
import {AuthGuard} from "./guard/auth.guard";
import {EquipmentComponent} from "./components/equipment/equipment.component";
import {LocationComponent} from "./components/location/location.component";
import {SampleDetailComponent} from "./components/sample-detail/sample-detail.component";
import {SamplingRecordComponent} from "./components/sampling-record/sampling-record.component";
import {AddSamplingRecordComponent} from "./components/add-sampling-record/add-sampling-record.component";
import {SamplingRecordListComponent} from "./components/sampling-record-list/sampling-record-list.component";
import {UnauthorizedComponent} from "./components/unauthorized/unauthorized.component";

export const routes: Routes = [
  // {
  //   path: 'admin',
  //   component: AdminComponent,
  //   canActivate: [AuthGuard], // Protect this route with the AuthGuard
  //   data: {
  //     roles: ['head_of_laboratory'], // Specify required roles
  //   },
  // },
  {
    path: 'equipments',
    component: EquipmentComponent ,
    canActivate: [AuthGuard], // Protect this route
    data: {
      roles: ['head_of_laboratory'],
    },
  },
  {
    path: 'locations',
    component: LocationComponent ,
    canActivate: [AuthGuard], // Protect this route
    data: {
      roles: ['head_of_laboratory'], // Requires both roles
    },
  },
  {
    path: 'sample-details',
    component: SampleDetailComponent ,
    canActivate: [AuthGuard], // Protect this route
    data: {
      roles: ['head_of_laboratory', 'engineer'], // Requires both roles
    },
  },
  {
    path: 'mpling-record/:id',
    component: SamplingRecordComponent ,
    canActivate: [AuthGuard], // Protect this route
    data: {
      roles: ['head_of_laboratory', 'engineer'], // Requires both roles
    },
  },
  {
    path: 'add-sampling-record',
    component: AddSamplingRecordComponent ,
    canActivate: [AuthGuard], // Protect this route
    data: {
      roles: ['head_of_laboratory', 'engineer'], // Requires both roles
    },
  },
  {
    path: 'sampling-record-list',
    component: SamplingRecordListComponent  ,
    canActivate: [AuthGuard], // Protect this route
    data: {
      roles: ['head_of_laboratory', 'engineer'], // Requires both roles
    },
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
];
