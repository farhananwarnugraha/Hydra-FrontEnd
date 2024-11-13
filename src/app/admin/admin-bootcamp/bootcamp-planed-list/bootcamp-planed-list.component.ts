import { Component, inject, OnInit } from '@angular/core';
import { BootcampPlaned } from '../bootcamp.model';
import { BootcampService } from '../bootcamp.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TableLayoutComponent } from '../../../shared/table-layout/table-layout.component';
import { BootcampPlanedComponent } from '../bootcamp-planed/bootcamp-planed.component';

@Component({
  selector: 'app-bootcamp-planed-list',
  standalone: true,
  imports: [TableLayoutComponent, BootcampPlanedComponent],
  templateUrl: './bootcamp-planed-list.component.html',
  styleUrl: './bootcamp-planed-list.component.css'
})
export class BootcampPlanedListComponent implements OnInit {
  bootcampPlanedsData!: BootcampPlaned[];
  totalPages!: number;

  private _bootcampService = inject(BootcampService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  ngOnInit(): void {
    this._loadBootcampPlaned();
  }

  _loadBootcampPlaned(){
    const queryParams = this._route.snapshot.queryParams;
    this._bootcampService.getBootcampPlaned(queryParams).subscribe((result) => {
      this.bootcampPlanedsData = result.data.bootcampsData;
      this.totalPages = result.data.pagination.totalPage;
    });
  }

  private _loadBootcampPlanedWithParams(){

  }
}
