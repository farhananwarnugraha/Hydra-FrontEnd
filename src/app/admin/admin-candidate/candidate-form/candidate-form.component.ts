import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CandidatesService } from '../../../candidates/candidates.service';
import { CandidateService } from '../candidate.service';
import { BootcampService } from '../../admin-bootcamp/bootcamp.service';
import { bootcampClasses, BootcampPlanedList } from '../../admin-bootcamp/bootcamp.model';
import { AddCandaidateForm, CandidateForm } from '../admin.candidate.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candidate-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './candidate-form.component.html',
  // templateUrl: './candidate-x.html',
  styleUrl: './candidate-form.component.css'
})
export class CandidateFormComponent implements OnInit {
  @Input() candidateId?: number;
  bootcampPlanned!: BootcampPlanedList[];
  private _router = inject(Router);
  private _candidateService = inject(CandidateService);
  private _bootcampService = inject(BootcampService);
  candidateForm = new FormGroup({
    bootcampClass: new FormControl<number>(0, {validators: Validators.required}),
    firstName: new FormControl<string>('', {validators: Validators.required}),
    lastName: new FormControl<string>('', {validators: Validators.required}),
    gender: new FormControl<string>('', {validators: Validators.required}),
    birthDate: new FormControl<string>('', {validators: Validators.required}),
    address: new FormControl<string>('', {validators: Validators.required}),
    domicile: new FormControl<string>('', {validators: Validators.required}),
    phoneNumber: new FormControl<string>('', {validators: Validators.required}),
  })
  ngOnInit(): void {
    if(this.candidateId){
      this._candidateService.getCandidateId(this.candidateId).subscribe((result) => {
        this.candidateForm.controls.firstName.setValue(result.data.firstName);
        this.candidateForm.controls.lastName.setValue(result.data.lastName);
        this.candidateForm.controls.bootcampClass.setValue(result.data.bootcampClass);
        this.candidateForm.controls.gender.setValue(result.data.gender);
        this.candidateForm.controls.address.setValue(result.data.address);
        this.candidateForm.controls.domicile.setValue(result.data.domicile);
        this.candidateForm.controls.phoneNumber.setValue(result.data.phoneNumber);
        const birthDate = new Date(result.data.birthDate);
        const formatedDate = birthDate.toISOString().split('T')[0];
        this.candidateForm.controls.birthDate.setValue(formatedDate);
      })
    }
    this._bootcampService.getBootcampPlannedAll().subscribe((result) => this.bootcampPlanned = result.data)
  }

  onSubmit() {
    if(this.candidateForm.invalid){
      alert("Please Fill in all the firelds");
      return
    }else{
      if(this.candidateId) {
        console.log("Upddate");

      } else {
        console.log(this.candidateForm.value);


        this._addNewCandidate(this.candidateForm.value as AddCandaidateForm);
      }
    }
  }

  private _addNewCandidate(candidateData: AddCandaidateForm) {
    this._candidateService.addNewCandidate(candidateData).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.fullName + ' has been add as Candidate Bootcamp Batch ' + response.batchBootcamp,
        })
        this._router.navigate(['/admin/candidate'])
      }
    })
  }
}
