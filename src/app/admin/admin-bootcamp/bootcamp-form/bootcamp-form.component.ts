import { Component, inject } from '@angular/core';
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
export class BootcampFormComponent {
  bootcampForm = new FormGroup({
    description: new FormControl<string>('', {validators: Validators.required}),
    startDate: new FormControl<string>('', {validators: Validators.required}),
    endDate: new FormControl<string>('', {validators: Validators.required}),
  })
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _bootcampService = inject(BootcampService);


  onSubmit() {
    if(this.bootcampForm.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Please fill in all the fields",
      })
      return
    }

    this.insertBootcamp();
    // console.log(this.bootcampForm.value.description);
    // console.log(this.bootcampForm.value.startDate);
    // console.log(this.bootcampForm.value.endDate);
  }

  private insertBootcamp() {
    this._bootcampService.addNewBootcamp(this.bootcampForm.value as BootcampForm).subscribe({
      next: (response) => {
        console.log(response);
        alert('Bootcamp added successfully');
        this._router.navigate(['.']);
      },
      error: (error) => {
        alert("Failed to add bootcamp class " + error.message);
      }
    })
  }
}
