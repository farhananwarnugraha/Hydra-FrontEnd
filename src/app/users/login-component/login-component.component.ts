import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginCredential } from '../users.model';
import Swal from 'sweetalert2';

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
          // console.log(userResponse);
          // console.log(userResponse.data.role);
          if(userResponse.data.role === 'Recruiter' || userResponse.data.role === 'Admin'){
            Swal.fire({
              position: "center",
              icon: "success",
              title: "You have been logged in!",
              showConfirmButton: false,
              timer: 2000
            });
            this.router.navigate(['/admin'])
          }
          // if(userResponse.data.role === 'Recruiter' && userResponse.data.role === 'Admin'){
          // //   console.log(userResponse);
          //   Swal.fire({
          //     position: "center",
          //     icon: "success",
          //     title: "You have been logged in!",
          //     showConfirmButton: false,
          //     timer: 2000
          //   })
          //   this.router.navigate(['/admin']);
          // }
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Try again!, Username or Password is wrong!'
          })
        }
      });
    }
  }
}
