import { Component, inject, OnInit } from '@angular/core';
import { TableLayoutComponent } from '../../../../shared/table-layout/table-layout.component';
import { EvaluationCandidateComponent } from '../evaluation-candidate/evaluation-candidate.component';
import { CandidateCourseBootcamp } from '../sub-bootcamp.mode';
import { SubBootcampService } from '../sub-bootcamp.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evaluation-candidate-list',
  standalone: true,
  imports: [TableLayoutComponent, EvaluationCandidateComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './evaluation-candidate-list.component.html',
  styleUrl: './evaluation-candidate-list.component.css'
})
export class EvaluationCandidateListComponent  implements OnInit{
  headers: string[] = ['Full Name', 'Score'];
  candidateEvaluations!: CandidateCourseBootcamp[];
  bootcampId!: number;
  courseId:string | null = null
  private _service = inject(SubBootcampService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  evaluationForm = new FormGroup({
    evaluations: new FormArray([])
  })

  ngOnInit(): void {
    this.loadCandidateCourseBootcamp();
  }
  loadCandidateCourseBootcamp(){
    this.courseId = encodeURIComponent(this._route.snapshot.paramMap.get('courseId')?.toString()!);
    this.bootcampId = parseInt(this._route.snapshot.parent?.paramMap.get('bootcampId')?.toString()!);
    this._service.getCandidateByCourseBootcamp(this.courseId, this.bootcampId).subscribe((response) => {
      this.candidateEvaluations = response.data

      // mengisi form dengan nilai awal
      const evaluationsFormArray = this.evaluationForm.get('evaluations') as FormArray;
      evaluationsFormArray.clear();
      this.candidateEvaluations.forEach((evaluation) => {
        evaluationsFormArray.push(
          new FormGroup({
            name: new FormControl(evaluation.candidateId),
            mark: new FormControl(0, [
              Validators.required,
              Validators.min(0),
              Validators.max(100)
            ])
          })
        )
      })
    })
  }

  onSubmitEvaluation(){
    const formData = this.evaluationForm.value;
      console.log('Form data:', formData);
    // console.log(this.evaluationForm.value);
  }
}
