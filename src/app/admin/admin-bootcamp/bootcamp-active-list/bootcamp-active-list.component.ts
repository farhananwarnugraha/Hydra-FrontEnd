import { Component, inject, OnInit } from '@angular/core';
import { BootcampActive } from '../bootcamp.model';
import { BootcampService } from '../bootcamp.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TableLayoutComponent } from '../../../shared/table-layout/table-layout.component';
import { BootcampActiveComponent } from '../bootcamp-active/bootcamp-active.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-bootcamp-active-list',
  standalone: true,
  imports: [TableLayoutComponent, BootcampActiveComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './bootcamp-active-list.component.html',
  styleUrl: './bootcamp-active-list.component.css'
})
export class BootcampActiveListComponent implements OnInit {
  ngOnInit(): void {
    this._dataUsingFilter();
    this._loadDataFilterForm();
    // this.batchBootcamp = this._route.snapshot.parent?.paramMap.get('bootcampId')!
  }
  bootcampActivesData!: BootcampActive[];
  totalPages!: number;
  header: string[] = ['Batch', 'Deskripsi', 'Tanggal Mulai', 'Tanggal Selesai', 'Nama Trainer', 'Nama Materi', 'Action'];
  private _bootcampService = inject(BootcampService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  filterForm = new FormGroup({
      batchBootcamp: new FormControl(0),
      pageNumber: new FormControl(1),
      pageSize: new FormControl(10)
  });
  loadBootcampActiveData() {
    const queryParams = this._route.snapshot.queryParams;
    this._bootcampService.getBootcampActive(queryParams).subscribe((result) => {
      this.bootcampActivesData = result.data.bootcampsData;
      this.totalPages = result.data.pagination.totalPage;
    })
  }

  private _dataUsingFilter(){
    this._route.queryParams.subscribe((params) => {
      this.filterForm.patchValue({
        batchBootcamp: params['batchBootcamp'] || 0,
        pageNumber: params['pageNumber'] || 1,
        pageSize: params['pageSize'] || 10
      },
    {emitEvent: false});
    this.loadBootcampActiveData();
    })
  }

  private _loadDataFilterForm(){
    this.filterForm.valueChanges
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      tap((formValue) => {
        const queryParams ={
          batchBootcamp: formValue.batchBootcamp! || 0,
          pageNumber: formValue.pageNumber! || 1,
          pageSize: formValue.pageSize! || 10
        };
        this._router.navigate(['.'], {
          relativeTo: this._route,
          queryParams: queryParams,
          queryParamsHandling: 'merge'
        });
      }),
      switchMap((formValue) => {
        const filter = {
          batchBootcamp: formValue.batchBootcamp! || 0,
          pageNumber: formValue.pageNumber! || 1,
          pageSize: formValue.pageSize! || 10
        };

        return this._bootcampService.getBootcampActive(filter);
      })
    )
    .subscribe((result) => {
      this.bootcampActivesData = result.data.bootcampsData;
      this.totalPages = result.data.pagination.totalPage;
    })
  }
}
