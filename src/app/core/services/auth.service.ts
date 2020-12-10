import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  
  constructor(private auth: AngularFireAuth) { }

  getUser = this.auth.authState.pipe(first()).toPromise();

  authState = this.auth.onAuthStateChanged;

  get user$() {
    return this.auth.user;
  }



  logout$() {
    return from(this.auth.signOut());
  }
}
