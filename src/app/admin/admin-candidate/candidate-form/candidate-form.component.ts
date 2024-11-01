import { Component, inject, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CandidatesService } from '../../../candidates/candidates.service';
import { CandidateService } from '../candidate.service';
import { BootcampService } from '../../admin-bootcamp/bootcamp.service';
import { bootcampClasses, BootcampPlanedList } from '../../admin-bootcamp/bootcamp.model';

@Component({
  selector: 'app-candidate-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './candidate-form.component.html',
  // templateUrl: './candidate-x.html',
  styleUrl: './candidate-form.component.css'
})
export class CandidateFormComponent implements OnInit {
  @Input() CandidateId?: number;
  bootcampPlanned!: BootcampPlanedList[];
  private _router = inject(Router);
  private _candidateService = inject(CandidateService);
  private _bootcampService = inject(BootcampService);
  candidateForm = new FormGroup({

  });
  ngOnInit(): void {
    this._bootcampService.getBootcampPlannedAll().subscribe((bcp) => {
      this.bootcampPlanned = bcp.data
      console.log(this.bootcampPlanned)
      console.log(this.bootcampPlanned[0].bootcampId);

    });
  }

  onSubmit() {
    console.log(this.bootcampPlanned);
  }

}
