import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { bootcampClasses } from '../bootcamp.model';
import { InfoUser } from '../../../users/users.model';
import { AuthService } from '../../../users/auth.service';

@Component({
  selector: 'tr[app-bootcamp]',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './bootcamp.component.html',
  styleUrl: './bootcamp.component.css'
})
export class BootcampComponent {
  @Input({required: true}) bootcampclasses!: bootcampClasses;
  @Output() deleted = new EventEmitter<void>();
  user?: InfoUser | null;

  constructor(private _authService: AuthService) {
    this._authService.currentUser$.subscribe((user) => this.user = user)
  }
}
