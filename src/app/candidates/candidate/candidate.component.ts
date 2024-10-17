import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Candidate } from '../candidates.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tr[app-candidate]',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './candidate.component.html',
  styleUrl: './candidate.component.css'
})
export class CandidateComponent {
  @Input({required: true}) candidate!: Candidate;
  @Output() deleted = new EventEmitter<void>();
  onDelete(){

  }
}
