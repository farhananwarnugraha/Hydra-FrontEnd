import { Component, inject, OnInit } from '@angular/core';
import { CourseForm, Skill, Trainer } from '../sub-bootcamp.mode';
import { SubBootcampService } from '../sub-bootcamp.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bootcamp-active-form-add-course',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './bootcamp-active-form-add-course.component.html',
  styleUrl: './bootcamp-active-form-add-course.component.css'
})
export class BootcampActiveFormAddCourseComponent implements OnInit{
  trainer: Trainer[] = [];
  skills: Skill[] = [];
  skillId!: string;
  bootcampId!: number
  private subBootcampService = inject(SubBootcampService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private location = inject(Location)

  addCourseForm = new FormGroup({
    batchBootcamp: new FormControl<number>(0),
    skillId: new FormControl<string>(""),
    trainerId: new FormControl<number>(0),
    startDate: new FormControl<string>('', {validators: Validators.required}),
    endDate: new FormControl<string>('', {validators: Validators.required})
  });
  ngOnInit(): void {
    this.bootcampId = parseInt(this._route.snapshot.parent?.params['bootcampId']?.toString()!);
    this.subBootcampService.getAllTrainer().subscribe((response) => this.trainer = response.data)
    this.subBootcampService.getSkills().subscribe((response) => this.skills = response.data)
    this.addCourseForm.controls.batchBootcamp.setValue(this.bootcampId);

    this.addCourseForm.controls.skillId.valueChanges.subscribe({
      next:(value) => {
        this.subBootcampService.getTrainer(value).subscribe((response) => this.trainer = response.data)
      }
    })
  }

  onSubmit(){
    console.log(this.addCourseForm.value);
    this._addCourse();
  }

  private _addCourse(){
    this.subBootcampService.addCourseBootcamp(this.bootcampId, this.addCourseForm.value as CourseForm).subscribe({
      next: (response) => {
        window.alert("Course added successfully");
        // this._router.navigate(['admin/bootcamps/active-bootcamp/detail/', this.bootcampId]);
        this.location.back();
      }
    })
  }

}
