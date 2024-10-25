import { Routes } from "@angular/router";
import { BootcampListComponent } from "./bootcamp-list/bootcamp-list.component";
import { BootcampFormComponent } from "./bootcamp-form/bootcamp-form.component";

export const adminBootcampRoutes: Routes = [
  {
    path: '',
    component: BootcampListComponent
  },
  {
    path: 'add-class',
    component: BootcampFormComponent
  }
];
