import { Routes } from "@angular/router";
import { CandidateListComponent } from "./candidate-list/candidate-list.component";
import { CandidateFormComponent } from "./candidate-form/candidate-form.component";

export const adminCandidateRoutes: Routes = [
  {
    path: '',
    component: CandidateListComponent
  },
  {
    path: 'add-candidate',
    component: CandidateFormComponent
  },
  {
    path: 'edit/:candidateId',
    component: CandidateFormComponent
  }
];
