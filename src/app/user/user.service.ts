import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { catchError, flatMap, map, tap } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';
import { IUser } from '../shared/interfaces/IUser';
@Injectable()
export class UserService {
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private authService: AuthService) { }


  private _currentUser: BehaviorSubject<any> = new BehaviorSubject(undefined);
  currentUser$ = this._currentUser.asObservable();
  isLogged$ = this.currentUser$.pipe(map(user => !!user));
  isReady$ = this.currentUser$.pipe(map(user => user !== undefined));
  
  login(data: any) {
    return from(this.auth.signInWithEmailAndPassword(data.email, data.password));
  }

  register(data: any) {
    return from(this.auth.createUserWithEmailAndPassword(data.email, data.password)
      .then(registeredUser => {
        this.firestore.collection('altUsers')
          .add({
            uid: registeredUser.user?.uid,
            email: registeredUser.user?.email,
            commentIds: [],
            eventIds: [],
            followerIds: [],
            followingIds: [],
            photoURL: "",
          })
      }))
  }

  getAllUsers() {
    let users: any;
    let userCollection = this.firestore.collection("user");
    userCollection.get().subscribe((query) => {
      query.forEach((user) => {
        users.push(user);
      })
    })
    return users;
  }

  async updateUser(imgURL: string) {
    const profile = {
      photoURL: imgURL
    }
    return (await this.auth.currentUser)?.updateProfile(profile);
  }


  authenticate(): Observable<any> {
    return this.auth.user.pipe(
      tap((user: any) => this._currentUser.next(user)),
      catchError(() => {
        this._currentUser.next(null);
        return [null];
      })
    );
  }

  updateCurrentUser(user: IUser | null): void {
    this._currentUser.next(user);
  }
}

