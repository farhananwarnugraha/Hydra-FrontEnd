import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginCredential } from '../users.model';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})
export class LoginComponentComponent {
  router = inject(Router);

  constructor(private authService: AuthService) {}

  form = new FormGroup({
    username: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl('', { validators: [Validators.required] })
  });

  onSubmit() {
    console.log("Form Submit");
    if (this.form.valid) {
      this.authService.login({
        username: this.form.value.username!,
        password: this.form.value.password!
      } as LoginCredential).subscribe({
        next: (userResponse) => {
          console.log(userResponse);
          this.router.navigate(['/candidate']);
        },
        error: (error) => {
          console.error('Login gagal:', error);
        }
      });
    }
  }
}
