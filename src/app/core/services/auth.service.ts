import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from 'src/app/shared/interfaces/IUser';

@Injectable()
export class AuthService {

  get user$(){
    return this.auth.user;
  }

  constructor(private auth:AngularFireAuth) { }


  logout$(){
    return from(this.auth.signOut());
  }
}
