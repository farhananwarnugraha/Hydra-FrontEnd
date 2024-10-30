import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { BootcampService } from '../bootcamp.service';
import { bootcampClasses, BootcampForm } from '../bootcamp.model';

@Component({
  selector: 'app-bootcamp-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './bootcamp-form.component.html',
  styleUrl: './bootcamp-form.component.css'
})
export class BootcampFormComponent implements OnInit {
  @Input() bootcampId?: number;
  // ResponseBootcamp?: bootcampClasses
  bootcampForm = new FormGroup({
    batchBootcamp: new FormControl<number>(0),
    description: new FormControl<string>('', {validators: Validators.required}),
    startDate: new FormControl<string>('', {validators: Validators.required}),
    endDate: new FormControl<string>('', {validators: Validators.required}),
  })
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _bootcampService = inject(BootcampService);

/**
 * Initializes the component by checking if a bootcampId is provided.
 * If bootcampId is present, retrieves the bootcamp data from the service
 * and logs the bootcampId to the console. Optionally, the form controls
 * for description, startDate, and endDate can be set with the retrieved
 * data (currently commented out).
 */
  ngOnInit(): void {
    // debugger
    if(this.bootcampId){
      this._bootcampService.getBootcampId(this.bootcampId).subscribe((bootcamp) => {
        // console.log(bootcamp.data.bootcampId);
        this.bootcampForm.controls.batchBootcamp.setValue(bootcamp.data.bootcampId);
        this.bootcampForm.controls.description.setValue(bootcamp.data.description);
        this.bootcampForm.controls.startDate.setValue(bootcamp.data.startDate);
        this.bootcampForm.controls.endDate.setValue(bootcamp.data.endDate);
      })
    }
  }

  onSubmit() {
    if(this.bootcampForm.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Please fill in all the fields",
      })
      return
    }

    if(this.bootcampId){
      console.log("Ini Terdapat id")
      this.updateBootcamp(this.bootcampId);
    }
    else{
      this.insertBootcamp();
    }
    // console.log(this.bootcampForm.value.description);
    // console.log(this.bootcampForm.value.startDate);
    // console.log(this.bootcampForm.value.endDate);
  }

  private insertBootcamp() {
    this._bootcampService.addNewBootcamp(this.bootcampForm.value as BootcampForm).subscribe({
      next: (response) => {
        console.log(response);
        alert('Bootcamp added successfully');
        this._router.navigate(['/admin/bootcamps']);
      },
      error: (error) => {
        alert("Failed to add bootcamp class " + error.message);
      }
    })
  }

  private updateBootcamp(bootcampId: number) {
    this._bootcampService.updateBootcamp(this.bootcampForm.value as BootcampForm).subscribe({
      next: () => {
        alert(`Bootcamp Batch ${bootcampId} sucessed updated`);
        this._router.navigate(['/admin/bootcamps']);
      }
    })

  }
}
