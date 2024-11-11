import { Component, inject, OnInit } from '@angular/core';
import { TableLayoutComponent } from '../../../shared/table-layout/table-layout.component';
import { EvauationResult } from '../evaluation-result.model';
import { EvaluationResultService } from '../evaluation-result.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CandidateEvaluationComponent } from '../candidate-evaluation/candidate-evaluation.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-candidate-evaluation-list',
  standalone: true,
  imports: [TableLayoutComponent, CandidateEvaluationComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './candidate-evaluation-list.component.html',
  styleUrl: './candidate-evaluation-list.component.css'
})
export class CandidateEvaluationListComponent implements OnInit{
  evaluations: EvauationResult[] = [];
  totalPage!: number;
  pageSize!: number;
  isLoading: boolean = true;

  evaluationFilterForm = new FormGroup({
    candidateName: new FormControl(''),
    pageNumber: new FormControl(1),
    pageSize: new FormControl(10)
  });

  private _evaluationResultService = inject(EvaluationResultService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  ngOnInit(): void {
    this._loadingEvaluationWithParams();
    this._fiterChange();
  }


  loadEvaluationData(){
    this.isLoading = true;
    const queryParams = this._route.snapshot.queryParams;
    this._evaluationResultService.getAllEvaluationResult(queryParams).subscribe((result) => {
      this.evaluations = result.data.evaluationCandidates;
      this.totalPage = result.data.paginations.totalPage;
      this.isLoading = false;
    })
  }

  private _loadingEvaluationWithParams(){
    this._route.queryParams.subscribe((params) => {
      this.evaluationFilterForm.patchValue({
        candidateName: params['candidateName'] || null,
        pageNumber: params['pageNumber'] || 1,
        pageSize: params['pageSize'] || 10
      }, {emitEvent: false});
      this.loadEvaluationData();
    })
  }

  private _fiterChange(){
    this.evaluationFilterForm.valueChanges
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      tap((valueForm) =>{
        const queryParam = {
          fullName: valueForm.candidateName?.trim() || null,
          pageNumber: valueForm.pageNumber || 1,
          pageSize: valueForm.pageSize || 10
        };

        this._router.navigate([],{
          relativeTo: this._route,
          queryParams: queryParam,
          queryParamsHandling: 'merge'
        });
      }),
      switchMap((valueForm) => {
        const filter = {
          fullName: valueForm.candidateName?.trim() || null,
          pageNumber: valueForm.pageNumber!,
          pageSize: valueForm.pageSize!
        };
        return this._evaluationResultService.getAllEvaluationResult(filter);
      })
    ).subscribe((result) => {
      this.evaluations = result.data.evaluationCandidates;
      this.totalPage = result.data.paginations.totalPage;
    })
  }
}
