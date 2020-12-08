import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {





  isLoading = false;
  errorMessege = "";

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  changeHandler(data: any): void {
    console.log(data);
  }

  submitFormHandler(formValue: { email: string, password: string }): void {
      this.isLoading=true;
      
      this.userService.login(formValue).subscribe({
        next:()=>{
          this.isLoading=false;
          this.router.navigate(['/home'])
        },
        error:(err)=>{
          this.isLoading=false;
          console.log(err);
        }
      })
  }

}
