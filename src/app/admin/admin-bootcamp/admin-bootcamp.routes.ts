import { Routes } from "@angular/router";
import { BootcampListComponent } from "./bootcamp-list/bootcamp-list.component";
import { BootcampFormComponent } from "./bootcamp-form/bootcamp-form.component";
import { BootcampPlanedListComponent } from "./bootcamp-planed-list/bootcamp-planed-list.component";
import { BootcampActiveListComponent } from "./bootcamp-active-list/bootcamp-active-list.component";
import { BootcampCompletedListComponent } from "./bootcamp-completed-list/bootcamp-completed-list.component";
import { SubBootcampActiveComponent } from "./sub-bootcamp-active/sub-bootcamp-active.component";
import { BootcampActiveScheduleListComponent } from "./sub-bootcamp-active/bootcamp-active-schedule-list/bootcamp-active-schedule-list.component";
import { BootcampActiveFormAddCourseComponent } from "./sub-bootcamp-active/bootcamp-active-form-add-course/bootcamp-active-form-add-course.component";
import { BootcampActiveFormNonActiveComponent } from "./sub-bootcamp-active/bootcamp-active-form-non-active/bootcamp-active-form-non-active.component";
import { EvaluationCandidateComponent } from "./sub-bootcamp-active/evaluation-candidate/evaluation-candidate.component";
import { EvaluationCandidateListComponent } from "./sub-bootcamp-active/evaluation-candidate-list/evaluation-candidate-list.component";

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
    children: [
      {
        path: '',
        component: BootcampActiveListComponent,
      },
      {
        path: 'detail/:bootcampId',
        component: SubBootcampActiveComponent,
        children: [
          {
            path: 'jadwal',
            component: BootcampActiveScheduleListComponent,

          },
          {
            path: 'add-course',
            component: BootcampActiveFormAddCourseComponent
          },
          {
            path: 'end-class',
            component: BootcampActiveFormNonActiveComponent
          },
          {
            path: 'evaluation/:courseId',
            component: EvaluationCandidateComponent
          }
        ]
      },
    ]
  },

  {
    path: 'completed-bootcamp',
    component: BootcampCompletedListComponent
  }
];
