import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { InfoUser } from '../../users/users.model';
import { AuthService } from '../../users/auth.service';
import { AdminBootcampButtonComponent } from "./admin-bootcamp-button/admin-bootcamp-button.component";

@Component({
  selector: 'app-admin-bootcamp',
  standalone: true,
  imports: [RouterLink, RouterOutlet, AdminBootcampButtonComponent],
  templateUrl: './admin-bootcamp.component.html',
  styleUrl: './admin-bootcamp.component.css'
})
export class AdminBootcampComponent implements OnInit {
  user: InfoUser | null = null;
  private _authSevice = inject(AuthService);
  ngOnInit(): void {
    this._authSevice.currentUser$.subscribe((user) => this.user = user);
  }

}
