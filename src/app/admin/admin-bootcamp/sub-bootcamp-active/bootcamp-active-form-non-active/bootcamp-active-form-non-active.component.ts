import { Component, inject, OnInit } from '@angular/core';
import { SubBootcampService } from '../sub-bootcamp.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EndBootcampClass } from '../sub-bootcamp.mode';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-bootcamp-active-form-non-active',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './bootcamp-active-form-non-active.component.html',
  styleUrl: './bootcamp-active-form-non-active.component.css'
})
export class BootcampActiveFormNonActiveComponent implements OnInit {
  isPosibleToEndClass!: boolean;
  dataBootcamp!: EndBootcampClass
  messageError!:string;
  bootcampId!: number;
  private _subBootcampService = inject(SubBootcampService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);

  endBootcampForm = new FormGroup({
      bootcampId: new FormControl<number>(0),
      endDate: new FormControl<string>(' ', {validators: Validators.required})
  })
  ngOnInit(): void {
    // this.bootcampId = parseInt(this._route.snapshot.paramMap.get('bootcampId')?.toString()!);
    this.bootcampId = parseInt(this._route.snapshot.parent?.params['bootcampId']);
    this._subBootcampService.getBootcampActive(this.bootcampId).subscribe({
      next: (response) => {
        this.dataBootcamp = response.data;
        this.isPosibleToEndClass = true
        this.endBootcampForm.controls.bootcampId.setValue(this.bootcampId);
        const endBootcamp = new Date(response.data.endDate);
        const endBootcampFormated = endBootcamp.toISOString().split('T')[0];
        this.endBootcampForm.controls.endDate.setValue(endBootcampFormated);
      },
      error: (error) => {
        console.log(error.error.data)
        this.isPosibleToEndClass = false
      }

    })
  }

  onSubmit(){
    console.log(this.endBootcampForm.value)
    this._endBootcamp(this.bootcampId, this.endBootcampForm.value as EndBootcampClass);
  }

  private _endBootcamp(bootcampId: number, data: EndBootcampClass){
    this._subBootcampService.updateProggesBootcamp(bootcampId, data).subscribe({
      next: (response) => {
        alert(response.message);
        this._router.navigate(['admin/bootcamps/active-bootcamp']);
      },
      error: () => {
        alert("Failed to end bootcamp class");
      }
    })
  }

}
