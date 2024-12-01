import { Routes } from '@angular/router';
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard], // Protect this route with the AuthGuard
    data: {
      roles: ['head_of_laboratory'], // Specify required roles
    },
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard], // Protect this route
    data: {
      roles: ['head_of_laboratory', 'engineer'], // Requires both roles
    },
  },
];
