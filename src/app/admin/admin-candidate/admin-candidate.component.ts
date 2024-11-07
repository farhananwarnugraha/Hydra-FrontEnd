import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { InfoUser } from '../../users/users.model';
import { AuthService } from '../../users/auth.service';
import { AdminCandidateButtonComponent } from "./admin-candidate-button/admin-candidate-button.component";

@Component({
  selector: 'app-admin-candidate',
  standalone: true,
  imports: [RouterLink, RouterOutlet, AdminCandidateButtonComponent],
  templateUrl: './admin-candidate.component.html',
  styleUrl: './admin-candidate.component.css'
})
export class AdminCandidateComponent implements OnInit {
  user : InfoUser | null = null;
  private _authService = inject(AuthService);

  ngOnInit(): void {
    this._authService.currentUser$.subscribe((user) => this.user = user);
  }


}
