import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  isLoading = false;
  errorMessege:undefined | string;

  get emailInput(): AbstractControl {
    return this.form.get('email')!;
  }

  get passwordInput(): AbstractControl {
    return this.form.get('password')!;
  }




  constructor(
    private router: Router, 
    private userService: UserService,
    private fb: FormBuilder) {
    const passwordControl = this.fb.control('', [
      Validators.required,
      Validators.minLength(6),
    ]);

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: passwordControl,
    });
   }

  submitFormHandler(): void {
      this.isLoading=true;
      const { email, password } = this.form!.value;
      this.userService.login({email,password}).subscribe({
        next:()=>{
          this.isLoading=false;
          localStorage.setItem('email',email);
          this.router.navigate(['/home'])
        },
        error:(err)=>{
          if (err.message === 'The password is invalid or the user does not have a password.') {
            this.errorMessege = 'Invalid password!';
          };
          if (err.message === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
            this.errorMessege = 'No user with such email!'
          };
          this.isLoading=false;
          //console.log(err);
        }
      })
  }

}
