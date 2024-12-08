import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {ProfileComponent} from "./profile/profile.component";
import {AuthGuard} from "../shared";

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'prefix'},
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
            },
            {
                path: 'profile',
                loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),
            },
            {
                path: 'tables',
                loadChildren: () => import('./tables/tables.module').then((m) => m.TablesModule),
                canActivate: [AuthGuard],
                data: {roles: ['general_manager']}, // Accessible only by users with the 'general_manager' role
            },
            {
                path: 'forms',
                loadChildren: () => import('./form/form.module').then((m) => m.FormModule),
                canActivate: [AuthGuard],
                data: {roles: ['engineer']}, // Accessible only by users with the 'engineer' role
            },
            {
                path: 'grid',
                loadChildren: () => import('./grid/grid.module').then((m) => m.GridModule),
                canActivate: [AuthGuard],
                // data: { roles: ['technician'] }, // Accessible only by users with the 'technician' role
            },
            {
                path: 'charts',
                loadChildren: () => import('./charts/charts.module').then((m) => m.ChartsModule),
            },
            {
                path: 'bs-element',
                loadChildren: () => import('./bs-element/bs-element.module').then((m) => m.BsElementModule),
            },
            {
                path: 'components',
                loadChildren: () => import('./bs-component/bs-component.module').then((m) => m.BsComponentModule),
            },
            {
                path: 'blank-page',
                loadChildren: () => import('./blank-page/blank-page.module').then((m) => m.BlankPageModule),
            },
            {
                path: 'equipmentsave',
                loadChildren: () => import('./basicdata/recording/equipmentsave/equipmentsave.module').then(m => m.EquipmentsaveModule),
                data: {roles: ['head_of_laboratory']}, // Accessible only by users with the 'technician' role
            },
            {
                path: 'locationsave',
                loadChildren: () => import('./basicdata/recording/locationsave/locationsave.module').then(m => m.LocationsaveModule),
                data: {roles: ['head_of_laboratory']}, // Accessible only by users with the 'technician' role

            },


        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {
}
