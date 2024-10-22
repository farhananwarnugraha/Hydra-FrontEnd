import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { AuthService } from '../users/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, CommonModule, DashboardComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit{
  isAuthenticated!: boolean;
  showNavbar: boolean = true;
  username:string | null = null;
  role:string | null = null;

  constructor(private route: Router, private authService: AuthService) {
  }
  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((result) => (this.isAuthenticated = result));
    this.authService.currentUser$.subscribe(
      {
        next: (user) => {
          if(user) {
            this.username = user.username;
            this.role = user.role

          }
          else this.username = null;
        }
      }
    )
  }
}

