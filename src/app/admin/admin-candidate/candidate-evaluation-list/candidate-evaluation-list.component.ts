import { Component, inject, OnInit } from '@angular/core';
import { TableLayoutComponent } from '../../../shared/table-layout/table-layout.component';
import { EvauationResult } from '../evaluation-result.model';
import { EvaluationResultService } from '../evaluation-result.service';
import { ActivatedRoute } from '@angular/router';
import { CandidateEvaluationComponent } from '../candidate-evaluation/candidate-evaluation.component';

@Component({
  selector: 'app-candidate-evaluation-list',
  standalone: true,
  imports: [TableLayoutComponent, CandidateEvaluationComponent],
  templateUrl: './candidate-evaluation-list.component.html',
  styleUrl: './candidate-evaluation-list.component.css'
})
export class CandidateEvaluationListComponent implements OnInit{
  evaluations: EvauationResult[] = [];
  totalPage!: number;
  isLoading: boolean = true;

  private _evaluationResultService = inject(EvaluationResultService);
  private _route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.loadEvaluationData();
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

  // private _loadingEvaluationWithParams(){
  //   this._route.queryParams.subscribe((params) => {
  //     this.
  //   })
  // }
}
