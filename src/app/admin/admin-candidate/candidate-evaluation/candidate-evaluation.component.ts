import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EvauationResult } from '../evaluation-result.model';

@Component({
  selector: 'tr[app-candidate-evaluation]',
  standalone: true,
  imports: [],
  templateUrl: './candidate-evaluation.component.html',
  styleUrl: './candidate-evaluation.component.css'
})
export class CandidateEvaluationComponent {
  @Input({ required: true }) evaluations!: EvauationResult
  @Output() deleted = new EventEmitter<void>()
}
