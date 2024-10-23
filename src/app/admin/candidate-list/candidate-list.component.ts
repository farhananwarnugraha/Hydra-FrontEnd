import { Component, inject, OnInit } from '@angular/core';
import { TableLayoutComponent } from '../../shared/table-layout/table-layout.component';
import { Candidate } from '../../candidates/candidates.model';
import { CandidatesService } from '../../candidates/candidates.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CandidateComponent } from '../candidate/candidate.component';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [TableLayoutComponent, CandidateComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.css'
})
export class CandidateListComponent implements OnInit {
  candidates: Candidate[] = [];
  totalPages!: number;
  isLoading: boolean = true;

  formFilter = new FormGroup({
    fullName: new FormControl(''),
    batchBootcamp: new FormControl(0),
    pageNumber: new FormControl(1),
    pageSize: new FormControl(10)
  })

  private _candidateService = inject(CandidatesService);
  private _route = inject(ActivatedRoute);
  private _routes = inject(Router);

  ngOnInit(): void {
    debugger
   this.loadingCandidateWithParams();
  }

  loadDataCandidate(){
    this.isLoading = true;
    const queryParams = this._route.snapshot.queryParams;
    this._candidateService
    .getAllCandidate(queryParams)
    .subscribe((reponse) => {
      this.candidates = reponse.data.candidates;
      this.totalPages = reponse.data.paginations.totalPage;
      this.isLoading = false;
    })
  }

  private loadingCandidateWithParams(){
    this._route.queryParams.subscribe((params) => {
      this.formFilter.patchValue({
        fullName: params['fullName'] || null,
        batchBootcamp: params['batchBootcamp'] || 0,
        pageNumber: +params['pageNumber'] || 1,
        pageSize: +params['pageAize'] || 10
      }, {emitEvent: false});
      this.loadDataCandidate();
    });
  }
}
