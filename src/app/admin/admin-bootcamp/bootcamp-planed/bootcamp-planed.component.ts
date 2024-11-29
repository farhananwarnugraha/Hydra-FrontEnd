import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { BootcampPlaned } from '../bootcamp.model';
import { RouterLink } from '@angular/router';
import { BootcampService } from '../bootcamp.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'tr[app-bootcamp-planed]',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './bootcamp-planed.component.html',
  styleUrl: './bootcamp-planed.component.css'
})
export class BootcampPlanedComponent {
  @Input({required: true}) bootcampPlanedsData!: BootcampPlaned;
  @Output() deleted = new EventEmitter<void>();
  private _bootcampService = inject(BootcampService)

  onStartBootcamp(){
    if(this.bootcampPlanedsData.totalCandidates > 0){
      this._bootcampService.activetedBootcamp(this.bootcampPlanedsData.bootcampId).subscribe({
        next: () => {
          Swal.fire({
            title: "Started!",
            text: "Bootcamp started",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.deleted.emit();
        },
        error: () => {
          Swal.fire({
            title: "Error!",
            text: "Error to start bootcamp",
            icon: "error",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
    }
    else{
      Swal.fire({
        title: "Error!",
        text: "Bootcamp has no more candidate",
        icon: "error",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  onCancelBootcamp(){
    this._bootcampService.deadActiveBootcamp(this.bootcampPlanedsData.bootcampId).subscribe({
      next: () => {
        Swal.fire({
          title: "Canceled!",
          text: "Bootcamp canceled",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
        this.deleted.emit();
      },
      error: () => {
        Swal.fire({
          title: "Error!",
          text: "Error to cancel bootcamp",
          icon: "error",
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }
}
