import { Routes } from "@angular/router";
import { CandidateListComponent } from "./candidate-list/candidate-list.component";
import { CandidateFormComponent } from "./candidate-form/candidate-form.component";
import { CandidateEvaluationComponent } from "./candidate-evaluation/candidate-evaluation.component";
import { CandidateEvaluationListComponent } from "./candidate-evaluation-list/candidate-evaluation-list.component";

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
  },
  {
    path: 'list-candidate',
    redirectTo: ''
  },
  {
    path: 'evaluation-result',
    component: CandidateEvaluationListComponent
  }
];
