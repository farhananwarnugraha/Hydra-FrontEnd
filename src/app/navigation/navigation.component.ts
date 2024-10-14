import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, CommonModule, DashboardComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  showNavbar: boolean = true;

  constructor(private route: Router){
    this.route.events.subscribe(() => {
      this.showNavbar = this.route.url !== '/dashboard';
    })
  }
}

