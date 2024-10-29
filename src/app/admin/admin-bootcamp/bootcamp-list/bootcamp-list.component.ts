import { Component, inject, OnInit } from '@angular/core';
import { BootcampClass, bootcampClasses } from '../bootcamp.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BootcampService } from '../bootcamp.service';
import { TableLayoutComponent } from '../../../shared/table-layout/table-layout.component';
import { BootcampComponent } from '../bootcamp/bootcamp.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-bootcamp-list',
  standalone: true,
  imports: [TableLayoutComponent, BootcampComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './bootcamp-list.component.html',
  styleUrl: './bootcamp-list.component.css'
})
export class BootcampListComponent implements OnInit{
  bootcamps!: BootcampClass;
  bootcampclasses!: bootcampClasses[];
  totalPages!: number;


  formFilter = new FormGroup({
    descriptionBootcamp: new FormControl(''),
    batchBootcamp: new FormControl(0),
    pageNumber: new FormControl(1),
  });

  private _bootcampService = inject(BootcampService);
  private _route = inject(ActivatedRoute)
  private _router = inject(Router)

  ngOnInit(): void {
    this.loadBootcampWithParams();
    this.loadFilterChange();
    console.log(this.totalPages);

  }

  loadBootcampData(){
    const queryParams = this._route.snapshot.queryParams;
    this._bootcampService.getAllBootcampClass(queryParams).subscribe((result) => {
      this.bootcamps = result.data;
      this.bootcampclasses = result.data.bootcampClasses;
      this.totalPages = result.data.pagination.totalPage;
    })
  }

  private loadBootcampWithParams(){
    this._route.queryParams.subscribe((params) => {
      this.formFilter.patchValue(
        {
          batchBootcamp: params['batchBootcamp'] || 0,
          descriptionBootcamp: params['descriptionBootcamp'] || null,
          pageNumber: +params['pageNumber'] || 1
        },
        {emitEvent: false}
      );
      this.loadBootcampData()
    })
  }

  private loadFilterChange(){
    this.formFilter.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        tap((formVale) => {
          const queryParams = {
            descriptionBootcamp: formVale.descriptionBootcamp?.trim() || null,
            batchBootcamp: formVale.batchBootcamp!,
            pageNumber: formVale.pageNumber!,
          };
          this._router.navigate(['.'], {
            relativeTo: this._route,
            queryParams: queryParams,
            queryParamsHandling: 'merge'
          });
        }),

        switchMap((formValue) => {
          const filter = {
            descriptionBootcamp: formValue.descriptionBootcamp?.trim() || null,
            batchBootcamp: formValue.batchBootcamp!,
            pageNumber: formValue.pageNumber!,
          };

          return this._bootcampService.getAllBootcampClass(filter);
        })
      )
      .subscribe((bootcamp) => {
        this.bootcamps = bootcamp.data;
        this.bootcampclasses = bootcamp.data.bootcampClasses;
        this.totalPages = bootcamp.data.pagination.totalPage;
      })
  }
}
