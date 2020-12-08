import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { IUser } from '../shared/interfaces/IUser';

@Injectable()
export class UserService {
  constructor(private auth: AngularFireAuth) {}

  login(data:any) {
    return from(this.auth.signInWithEmailAndPassword(data.email, data.password));
  }

  register(data:any) {
    return from(this.auth.createUserWithEmailAndPassword(data.email,data.password));
  }
}

