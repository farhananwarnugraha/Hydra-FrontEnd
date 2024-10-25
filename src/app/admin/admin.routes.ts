import { Routes } from "@angular/router";
import { DashboardAdminComponent } from "./dashboard-admin/dashboard-admin.component";
import { AdminBootcampComponent } from "./admin-bootcamp/admin-bootcamp.component";

export const adminRoutes: Routes = [
  {
    path: '',
    component: DashboardAdminComponent
  },
  {
    path: 'bootcamps',
    component: AdminBootcampComponent,
    loadChildren: () =>
      import('./admin-bootcamp/admin-bootcamp.routes').then(
        (mod) => mod.adminBootcampRoutes
      )

    // children: [
    //   {
    //     path
    //   }
    // ]
  }
];
