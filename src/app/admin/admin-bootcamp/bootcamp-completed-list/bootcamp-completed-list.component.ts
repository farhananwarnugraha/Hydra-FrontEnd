import { Component, inject, OnInit } from '@angular/core';
import { TableLayoutComponent } from '../../../shared/table-layout/table-layout.component';
import { BootcampCompletedComponent } from '../bootcamp-completed/bootcamp-completed.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { bootcampClasses } from '../bootcamp.model';
import { BootcampService } from '../bootcamp.service';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, merge, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-bootcamp-completed-list',
  standalone: true,
  imports: [TableLayoutComponent, BootcampCompletedComponent, ReactiveFormsModule],
  templateUrl: './bootcamp-completed-list.component.html',
  styleUrl: './bootcamp-completed-list.component.css'
})
export class BootcampCompletedListComponent implements OnInit {
  ngOnInit(): void {
    this._loadWithFilter();
  }

  bootcampCompleted!: bootcampClasses[];
  totalPage!: number;
  header: string[] = ['Batch', 'Deskripsi', 'Tanggal Mulai', 'Tanggal Selesai'];

  private _bootcampService = inject(BootcampService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  formFilter = new FormGroup({
    batchBootcamp: new FormControl(0),
    pageNumber: new FormControl(1),
    pageSize: new FormControl(10)
  })

  loadDataBootcampCompleted(){
    const queryParams = this._route.snapshot.queryParams;
    this._bootcampService.getBootcampCompleted(queryParams).subscribe((result) => {
      this.bootcampCompleted = result.data.bootcampsData;
      this.totalPage = result.data.pagination.totalPage;
    })
  }

  private _loadWithFilter(){
    this._route.queryParams.subscribe((params) => {
      this.formFilter.patchValue({
        batchBootcamp: params['batchBootcamp'] || 0,
        pageNumber: params['pageNumber'] || 1,
        pageSize: params['pageSize'] || 10
      },
    {emitEvent: false});
    this.loadDataBootcampCompleted();
    })
  }

  private _loadFilterChange(){
    this.formFilter.valueChanges
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      tap((formValue) => {
        const queryParams = {
          batchBootcamp: formValue.batchBootcamp || 0,
          pageNumber: formValue.pageNumber || 1,
          pageSize: formValue.pageSize || 10
        };
        this._router.navigate(['.'],{
          relativeTo: this._route,
          queryParams: queryParams,
          queryParamsHandling: 'merge'
        });
      }),
      switchMap((formValue) => {
        const filter = {
          batchBootcamp: formValue.batchBootcamp || 0,
          pageNumber: formValue.pageNumber || 1,
          pageSize: formValue.pageSize || 10
        };

        return this._bootcampService.getBootcampCompleted(filter)
      })
    ).subscribe((result) => {
      this.bootcampCompleted = result.data.bootcampsData;
      this.totalPage = result.data.pagination.totalPage;
    })
  }
}
