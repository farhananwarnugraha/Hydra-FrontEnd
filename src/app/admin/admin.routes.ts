import { Router, Routes } from "@angular/router";
import { DashboardAdminComponent } from "./dashboard-admin/dashboard-admin.component";
import { AdminBootcampComponent } from "./admin-bootcamp/admin-bootcamp.component";
import { AdminCandidateComponent } from "./admin-candidate/admin-candidate.component";
import { inject } from "@angular/core";
import { AuthService } from "../users/auth.service";
import { map } from "rxjs";

export const adminRoutes: Routes = [
  {
    path: '',
    component: DashboardAdminComponent
  },
  {
    path: 'dashboard',
    redirectTo: ''
  },
  {
    path: 'bootcamps',
    component: AdminBootcampComponent,
    loadChildren: () =>
      import('./admin-bootcamp/admin-bootcamp.routes').then(
        (mod) => mod.adminBootcampRoutes
      )
  },
  {
    path: 'candidate',
    component: AdminCandidateComponent,
    loadChildren: () =>
      import('./admin-candidate/admin-candidate.routes').then(
        (mod) => mod.adminCandidateRoutes
      )
  }
];
