import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Candidate } from '../admin.candidate.model';
import { InfoUser } from '../../../users/users.model';
import { AuthService } from '../../../users/auth.service';

@Component({
  selector: 'tr[app-candidate]',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './candidate.component.html',
  styleUrl: './candidate.component.css'
})
export class CandidateComponent {
  user : InfoUser | null = null
  @Input({required: true}) candidate!: Candidate
  // @Input() user : InfoUser | null = null;
  @Output() deleted = new EventEmitter<void>()

  constructor( private _authService: AuthService) {
    this._authService.currentUser$.subscribe((user) => this.user = user)
  }
}
