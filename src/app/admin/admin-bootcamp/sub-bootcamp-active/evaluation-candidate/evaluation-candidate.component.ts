import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CandidateCourseBootcamp } from '../sub-bootcamp.mode';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'tr[app-evaluation-candidate]',
  standalone: true,
  imports: [],
  templateUrl: './evaluation-candidate.component.html',
  styleUrl: './evaluation-candidate.component.css'
})
export class EvaluationCandidateComponent {
  @Input() courseId!: number;
  @Input({ required: true}) candidates!: CandidateCourseBootcamp;
  @Input() formGroup!: FormGroup
  @Output() loadData = new EventEmitter<void>()


  constructor() {
    console.log(this.courseId);

  }


}
