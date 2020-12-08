import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  email = "";
  isLogged = false;
  constructor(private userService: UserService, private router: Router, private auth: AuthService) { }

  logoutHandler() {
    this.auth.logout$().subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigate(['/user/login']);
        console.log('called');
      },
    });
  }


  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.isLogged = !!user;
      this.email = localStorage.getItem('email')!;
      console.log(user?.uid);
    });
  }
}
