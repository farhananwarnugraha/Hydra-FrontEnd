import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ScheduleBootcampActive } from '../../bootcamp.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { SubBootcampService } from '../sub-bootcamp.service';

@Component({
  selector: 'tr[app-bootcamp-active-schedule]',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './bootcamp-active-schedule.component.html',
  styleUrl: './bootcamp-active-schedule.component.css'
})
export class BootcampActiveScheduleComponent {
  @Input({required: true}) scheduleBootcampActive!: ScheduleBootcampActive;
  @Output() loadSchedule = new EventEmitter<void>();
  private _service = inject(SubBootcampService)
  private _router = inject(Router)
  courseId!: string;

  endCourse() {
    // console.log("Button Clicked");
    // console.log(this.scheduleBootcampActive.courseId);
    Swal.fire({
      title: "Are you sure for end this course?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, End this course!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseId = encodeURIComponent(this.scheduleBootcampActive.courseId);
        this._updateProgress(this.courseId);
        Swal.fire({
          title: "Ended!",
          text: "Course has been ended.",
          icon: "success"
        });
      }
    });
  }

  startCourse(){
    Swal.fire({
      title: "Are you sure for start this course?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, start this course!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseId = encodeURIComponent(this.scheduleBootcampActive.courseId);
        this._updateProgress(this.courseId);
        Swal.fire({
          title: "Started!",
          text: "Course started.",
          icon: "success"
        });
      }
    });
  }

  private _updateProgress(courseId: string){
    this._service.updateProgrresCourse(courseId).subscribe({
      next: () => {
        console.log(this.scheduleBootcampActive.status);
        this.loadSchedule.emit();
      }
    })
  }
}
