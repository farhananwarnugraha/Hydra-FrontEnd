import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../users/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showNavbar:boolean = true;

  constructor(private router: Router, private authService: AuthService) {
    // Mendeteksi perubahan rute
    this.router.events.subscribe(() => {
      // Sembunyikan navbar jika pengguna berada di halaman login
      this.showNavbar = this.router.url !== '/dashboard';
    });
  }

  logOut(){
    this.authService.purgeAuth();
    this.router.navigate(['/login']);
  }
}
