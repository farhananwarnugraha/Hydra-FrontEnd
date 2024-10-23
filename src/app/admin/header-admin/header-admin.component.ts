import { Component, inject } from '@angular/core';
import { AuthService } from '../../users/auth.service';
import { Router } from '@angular/router';

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
      this._authService.purgeAuth();
      this._router.navigate(['/login']);
  }
}
