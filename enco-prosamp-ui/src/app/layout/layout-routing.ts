import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

export const layoutRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    // children: [
    //   {
    //     path: 'dashboard',
    //     loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    //   },
    //   {
    //     path: 'tables',
    //     loadComponent: () => import('./tables/tables.component').then(m => m.TablesComponent),
    //   },
    //   // Add more child routes as needed
    // ],
  },
];
