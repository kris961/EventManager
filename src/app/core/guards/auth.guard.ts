import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
//import { IUser } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/user/user.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivateChild {


  isLogged=true;
  constructor(
    private userService: UserService,
    private router: Router,
    private auth: AuthService
    ) { }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.auth.user$.subscribe((user) => {
      if (user!==undefined) {
        this.isLogged=false;
        console.log(this.isLogged);
      }
    });


    const isLoggedFromData = childRoute.data.isLogged;
    if (typeof isLoggedFromData === 'boolean' && isLoggedFromData === this.isLogged) {
      let isLogged=this.isLogged;
      this.isLogged=!isLogged
      return true;
    }
    const url = this.router.url;
    this.router.navigateByUrl(url);
    return false;


  }

} 