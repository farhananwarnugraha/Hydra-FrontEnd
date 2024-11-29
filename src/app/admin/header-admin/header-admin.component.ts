import { Component, inject } from '@angular/core';
import { AuthService } from '../../users/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent {
  private _authService = inject(AuthService);
  private _router = inject(Router)
  onLogOut(){
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sure!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Success",
          text: "You have been logged out!",
          icon: "success"
        });
        this._authService.logOut();
        this._router.navigate(['/login']);
      }
    });
  }
}
