import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TableLayoutComponent } from '../../shared/table-layout/table-layout.component';
import { CandidateComponent } from '../candidate/candidate.component';
import { Candidate } from '../candidates.model';
import { HttpBackend } from '@angular/common/http';
import { CandidatesService } from '../candidates.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { debounceTime, distinct, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule, TableLayoutComponent, CandidateComponent],
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.css'
})
export class CandidateListComponent implements OnInit {
  candidates: Candidate[] = [];
  totalPages!: number;
  isLoading:boolean = true;

  formFilter = new FormGroup({
    fullName : new FormControl<string| null>(null),
    batchBootcamp: new FormControl<number>(0),
    pageNumber: new FormControl<number>(1),
    pageSize: new FormControl<number>(10)
  });

  constructor (
    private candidateService : CandidatesService,
    private route: ActivatedRoute,
    private routes: Router
  ){}
  ngOnInit(): void {
    this.loadCandidateWithParams();
    console.log(this.totalPages);

  }

  loadDataCandidate(){
    // debugger
    this.isLoading= true;
    const queryParams = this.route.snapshot.queryParams;
    this.candidateService
    .getAllCandidate(queryParams)
    .subscribe((response) => {
      this.candidates = response.data.candidates;
      this.totalPages = response.data.paginations.totalPage;
      this.isLoading = false;
    });
  }

  private loadCandidateWithParams(){
    this.route.queryParams.subscribe((params) => {
      this.formFilter.patchValue({
        fullName: params['fullName'] || null,
        batchBootcamp: params['batchBootcamp'] || 0,
        pageNumber: + params['pageNumber'] || 1,
        pageSize: +params['pageAize'] || 10,
      },
      { emitEvent: false}
    );
      this.loadDataCandidate();
    });
  }

  // private loadOnFilterChange(){
  //   this.isLoading = true;
  //   this.formFilter.valueChanges
  //     .pipe(
  //       debounceTime(1000),
  //       distinctUntilChanged(),
  //       tap((formFilter) =>{
  //           const queryParams = {
  //             fullNamae: formFilter.fullNamae?.trim() || null,
  //             batchBootcamp: formFilter.batchBootcamp!,
  //             pageNumber: formFilter.pageNumber!,
  //             pageSize: formFilter.pageSize || 10,
  //           };
  //         this.routes.navigate([], {
  //           relativeTo: this.route,
  //           queryParams: queryParams,
  //           queryParamsHandling: 'merge'
  //         });
  //       }),
  //       switchMap((formValue) => {
  //         const filters = {
  //           fullName: this.formFilter.
  //         }
  //       })
  //     )
  // }
}
