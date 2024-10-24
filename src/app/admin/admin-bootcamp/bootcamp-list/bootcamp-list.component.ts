import { Component, inject, OnInit } from '@angular/core';
import { BootcampClass, bootcampClasses } from '../bootcamp.model';
import { FormControl, FormGroup } from '@angular/forms';
import { BootcampService } from '../bootcamp.service';
import { TableLayoutComponent } from '../../../shared/table-layout/table-layout.component';
import { BootcampComponent } from '../bootcamp/bootcamp.component';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-bootcamp-list',
  standalone: true,
  imports: [TableLayoutComponent, BootcampComponent, RouterLink],
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

  ngOnInit(): void {
    this.loadBootcampWithParams()
    console.log(this.totalPages);

  }

  loadBootcampData(){
    this._bootcampService.getAllBootcampClass({
      descriptionBootcamp: this.formFilter.get('descriptionBootcamp')?.value,
      batchBootcamp: this.formFilter.get('batchBootcamp')?.value
    }).subscribe((result) => {
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
}
