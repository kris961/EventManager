import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public currUser!: string

  constructor(
    private router: Router,
    private auth: AuthService) {
    auth.authState(user => {
      let email = user?.email
      console.log(user);

      if (user) this.currUser = email!;
      if (!user) this.currUser = undefined!;
      {
        this.currUser = email!;
      }
    })
  }

  logoutHandler() {
    this.auth.logout$().subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigate(['/login']);
        console.log('called');
      },
    });
  }
}
