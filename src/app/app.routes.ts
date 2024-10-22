import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponentComponent } from './users/login-component/login-component.component';
import { RegisterComponentComponent } from './users/register-component/register-component.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { CandidateListComponent } from './candidates/candidate-list/candidate-list.component';
import { GuestComponent } from './guest/guest.component';
import { DashboardGuestComponent } from './guest/dashboard-guest/dashboard-guest.component';

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
  {
    path: 'candidate',
    component: CandidatesComponent,
    children: [
      {
        path: '',
        component: CandidateListComponent
      }
    ]
  }
];
