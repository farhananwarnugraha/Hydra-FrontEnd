import { Routes } from "@angular/router";
import { BootcampListComponent } from "./bootcamp-list/bootcamp-list.component";
import { BootcampFormComponent } from "./bootcamp-form/bootcamp-form.component";
import { BootcampPlanedListComponent } from "./bootcamp-planed-list/bootcamp-planed-list.component";
import { BootcampActiveListComponent } from "./bootcamp-active-list/bootcamp-active-list.component";
import { BootcampCompletedListComponent } from "./bootcamp-completed-list/bootcamp-completed-list.component";

export const adminBootcampRoutes: Routes = [
  {
    path: '',
    component: BootcampListComponent
  },
  {
    path: 'add-class',
    component: BootcampFormComponent
  },
  {
    path: 'edit/:bootcampId',
    component: BootcampFormComponent
  },
  {
    path: 'planed',
    component: BootcampPlanedListComponent
  },
  {
    path: 'active-bootcamp',
    component: BootcampActiveListComponent
  },
  {
    path: 'completed-bootcamp',
    component: BootcampCompletedListComponent
  }
];
