import { Routes } from '@angular/router';
import {layoutRoutes} from "./layout/layout-routing";



export const routes: Routes = [
    {
        path: '',
        children: layoutRoutes, // Load the standalone Layout routes
    },
];
