import { Routes } from '@angular/router';
import { LoginComponentComponent } from './users/login-component/login-component.component';
import { RegisterComponentComponent } from './users/register-component/register-component.component';
import { CandidateListComponent } from './admin/candidate-list/candidate-list.component';
import { GuestComponent } from './guest/guest.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';

export const routes: Routes = [
  {
    path: 'guest',
    component: GuestComponent
  },
  {
    path: '',
    redirectTo: 'guest',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponentComponent
  },
  {
    path: 'register',
    component: RegisterComponentComponent
  },
  // {
  //   path: 'candidate',
  //   component: CandidatesComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: CandidateListComponent
  //     }
  //   ]
  // },
  {
    path: 'admin',
    component: AdminComponent,
    children:[
      {
        path:'',
        component: DashboardAdminComponent
      },
      {
        path: 'dashboard',
        redirectTo: ''
      },
      {
        path: 'candidte',
      component: CandidateListComponent,
      }
    ]
  },
  // {
  //   path: 'candidte',
  //   component: CandidateListComponent,
  // }
];
