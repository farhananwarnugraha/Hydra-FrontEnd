import { Component, inject, OnInit } from '@angular/core';
import { TableLayoutComponent } from '../../../shared/table-layout/table-layout.component';
import { CandidatesService } from '../../../candidates/candidates.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CandidateComponent } from '../candidate/candidate.component';
import { Candidate } from '../admin.candidate.model';
import { debounce, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';

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
   this.loadingCandidateWithParams();
   this._loadFilterChange();
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

  private _loadFilterChange(){
    this.formFilter.valueChanges
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      tap((formValue) => {
        const queryParams = {
          fullName: formValue.fullName?.trim() || null,
          batchBootcamp: formValue.batchBootcamp!,
          pageNumber: formValue.pageNumber!,
          pageSize: formValue.pageSize!
        };
      }),

      switchMap((formValue) => {
        const filter = {
          fullName: formValue.fullName?.trim() || null,
          batchBootcamp: formValue.batchBootcamp!,
          pageNumber: formValue.pageNumber!,
          pageSize: formValue.pageSize!
        };
        return this._candidateService.getAllCandidate(filter);
      })
    ).subscribe((result) => {
      this.candidates = result.data.candidates;
      this.totalPages = result.data.paginations.totalPage;
    })
  }
}
