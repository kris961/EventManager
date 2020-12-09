import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';
//import { IUser } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/user/user.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivateChild {


  /* isLogged=!!localStorage.getItem('email');
  constructor(
    private userService: UserService,
    private router: Router,
    private auth: AuthService
    ) { }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {


    const isLoggedFromData = childRoute.data.isLogged;
    if (typeof isLoggedFromData === 'boolean' && isLoggedFromData === this.isLogged) {
      return true;
    }
    const url = this.router.url;
    this.router.navigateByUrl(url);
    return false; */
  //}

  constructor(
    private authService: UserService,
    private router: Router
  ) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.authService.currentUser$.pipe(
      switchMap(user => user === undefined ? this.authService.authenticate() : [user]),
      map((user) => {
        const isLoggedFromData = childRoute.data.isLogged;
        return typeof isLoggedFromData !== 'boolean' || isLoggedFromData === !!user;
      }),
      tap((canContinue) => {
        if (canContinue) { return; }
        const url = this.router.url;
        this.router.navigateByUrl(url);
      }),
      first()
    );
  }

} 