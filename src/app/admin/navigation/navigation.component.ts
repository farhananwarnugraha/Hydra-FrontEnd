import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DashboardComponent } from "../../dashboard/dashboard.component";
import { AuthService } from '../../users/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit{
  isAuthenticated!: boolean;
  username:string | null = null;
  role:string | null = null;

  constructor(private authService: AuthService) {
  }
  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((result) => (this.isAuthenticated = result));
    console.log(this.isAuthenticated);
    this.authService.currentUser$.subscribe(
      {
        next: (user) => {
          if(user) {
            this.username = user.username;
            this.role = user.role
          }
          else this.username = null;
          console.log(this.username);

        }
      }
    )
  }
}

