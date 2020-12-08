import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { IUser } from '../shared/interfaces/IUser';

@Injectable()
export class UserService {
  constructor(private auth: AngularFireAuth,private firestore:AngularFirestore) {}

  login(data:any) {
    return from(this.auth.signInWithEmailAndPassword(data.email, data.password));
  }

  register(data:any) {
     return from(this.auth.createUserWithEmailAndPassword(data.email,data.password)
    .then(registeredUser =>{
      this.firestore.collection('users')
      .add({
        uid:registeredUser.user?.uid,
        email:registeredUser.user?.email
      })
    }))
  }
}

