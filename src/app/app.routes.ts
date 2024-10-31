import { Router, Routes } from '@angular/router';
import { LoginComponentComponent } from './users/login-component/login-component.component';
import { RegisterComponentComponent } from './users/register-component/register-component.component';
import { CandidateListComponent } from './admin/admin-candidate/candidate-list/candidate-list.component';
import { GuestComponent } from './guest/guest.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { BootcampListComponent } from './admin/admin-bootcamp/bootcamp-list/bootcamp-list.component';
import { inject } from '@angular/core';
import { AuthService } from './users/auth.service';
import { map } from 'rxjs';

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
    loadChildren: () => import('./admin/admin.routes').then((mod) => mod.adminRoutes),
    canActivate:[
      () => {
        const router = inject(Router);
        return inject(AuthService).currentUser$.pipe(
          map((user) => {
            if(user === null){
              alert('Please login first');
              router.navigate(['/login']);
            }
            else if(user.role !== 'Admin' && user.role !=='Recruiter'){
              alert('You are not allowed to access this page');
              router.navigate(['/']);
            }
          })
        )
      }
    ]
    // children:[
    //   {
    //     path:'',
    //     component: DashboardAdminComponent
    //   },
    //   {
    //     path: 'dashboard',
    //     redirectTo: ''
    //   },
    //   {
    //     path: 'candidte',
    //   component: CandidateListComponent,
    //   },
    //   {
    //     path: 'bootacamp',
    //     component: BootcampListComponent
    //   }
    // ]
  },
];
