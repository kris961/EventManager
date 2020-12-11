import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public currUser!: string

  constructor(
    private router: Router,
    private auth: AuthService) {
    auth.authState(user => {
      let email = user?.email

      if (user) this.currUser = email!;
      if (!user) this.currUser = undefined!;
      {
        this.currUser = email!;
      }
    })
  }

  ngOnInit(): void {
  }

}
