import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { RegisterCredential } from '../users.model';

@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-component.component.html',
  styleUrl: './register-component.component.css'
})
export class RegisterComponentComponent {
  private _router = inject(Router);
  private _authService = inject(AuthService);

  formRegister = new FormGroup({
    username: new FormControl('', {validators: [Validators.required]}),
    emailUser: new FormControl('', {validators: [Validators.required, Validators.email]}),
    role: new FormControl('0', {validators: [Validators.required]}),
    password: new FormControl('', {validators: [Validators.required, Validators.minLength(8)]}),
  });

  registerForm(): RegisterCredential{
    const formValue = this.formRegister.value;

    return{
      username: formValue.username!,
      email: formValue.emailUser!,
      password: formValue.password!,
      roleIds: [parseInt(formValue.role!)]
    }
  }
  onSubmit(){
    console.log(this.registerForm());
    // console.log(this.formRegister.value);
    if(this.formRegister.valid){
      console.log(this.registerForm());
      this._authService.register(this.registerForm()).subscribe({
        next: ()=> {
          alert("Register Success");
          this._router.navigate(['/login']);
        },
        error: () => {
          alert("Register Failed");
        }
      });
    }else{
      alert("Please Fill in all the Fields");
    }
  };
}
