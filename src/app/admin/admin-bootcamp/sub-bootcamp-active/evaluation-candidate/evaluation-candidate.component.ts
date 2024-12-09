import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CandidateCourseBootcamp, CandidateEvaluationForm } from '../sub-bootcamp.mode';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubBootcampService } from '../sub-bootcamp.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'tr[app-evaluation-candidate]',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './evaluation-candidate.component.html',
  styleUrl: './evaluation-candidate.component.css'
})
export class EvaluationCandidateComponent implements OnInit {
  candidates!: CandidateCourseBootcamp[]
  bootcampId!: number;
  courseId!: string;
  lengthCandidate!: number;
  private _service = inject(SubBootcampService)
  private _route = inject(ActivatedRoute);
  private _router = inject(Router)

  evaluationForm = new FormGroup({
    courseId: new FormControl<string>(this._route.snapshot.paramMap.get('courseId')!),
    candidateId: new FormControl<number>(0, {validators: Validators.required}),
    mark: new FormControl<number>(0, {validators: Validators.required})
  })
  ngOnInit(): void {
    this.courseId = encodeURIComponent(this._route.snapshot.paramMap.get('courseId')!);
    this.bootcampId =parseInt(this._route.snapshot.parent?.paramMap.get('bootcampId')?.toString()!);
    this._getCandidate(this.courseId, this.bootcampId);
  }

  onclick(){
    console.log(this.evaluationForm.value);
    if(this.lengthCandidate >1){
      this._addEvaluation();
    }else{
      this._addEvaluation();
      this._updateCourseEvaluationDate(this.courseId);
    }
  }

  private _addEvaluation(){
    this._service.addCandidateEvaluation(this.evaluationForm.value as CandidateEvaluationForm).subscribe({
      next: (response) => {
        alert('Evaluation added successfully');
        this._getCandidate(this.courseId, this.bootcampId);
        this.evaluationForm.controls.mark.setValue(0);
        this.evaluationForm.controls.candidateId.setValue(0);
      },
      error: (err) => {
        alert("Failed to add evaluation, please cek your data");
      }
    })
  }

  private _getCandidate(courseId: string, bootcampId: number){
    this._service.getCandidateByCourseBootcamp(courseId, bootcampId).subscribe((result) =>{
      this.candidates = result.data
      this.lengthCandidate = result.data.length
    });
  }

  private _updateCourseEvaluationDate(courseId:string){
    this._service.updateCourseEvaluationDate(courseId).subscribe({})
    this._router.navigate(['admin/bootcamps/active-bootcamp/detail/', this.bootcampId]);
  }
}
