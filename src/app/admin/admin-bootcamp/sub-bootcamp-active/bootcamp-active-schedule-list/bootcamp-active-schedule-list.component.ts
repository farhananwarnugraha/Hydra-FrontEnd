import { Component, inject, Input, OnInit } from '@angular/core';
import { TableLayoutComponent } from '../../../../shared/table-layout/table-layout.component';
import { BootcampActiveScheduleComponent } from '../bootcamp-active-schedule/bootcamp-active-schedule.component';
import { BootcampService } from '../../bootcamp.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleBootcampActive } from '../../bootcamp.model';

@Component({
  selector: 'app-bootcamp-active-schedule-list',
  standalone: true,
  imports: [TableLayoutComponent, BootcampActiveScheduleComponent],
  templateUrl: './bootcamp-active-schedule-list.component.html',
  styleUrl: './bootcamp-active-schedule-list.component.css'
})
export class BootcampActiveScheduleListComponent implements OnInit {
  // @Input() bootcampId!: number;
  scheduleBootcampActive!: ScheduleBootcampActive[]
  bootcampId!: number
  private _bootcampService = inject(BootcampService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  ngOnInit(): void {
    this.loadScheduleCourse();
  }

  loadScheduleCourse(){
    this.bootcampId = parseInt(this._route.snapshot.parent?.paramMap.get('bootcampId')?.toString()!);
    this._bootcampService.getScheduleCourseBootcamp(this.bootcampId).subscribe((result) => {
      this.scheduleBootcampActive = result.data
    })
  }
}
