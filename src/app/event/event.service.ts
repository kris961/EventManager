import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { IEvent } from '../shared/interfaces/IEvent';

@Injectable()
export class EventService {

  constructor(
    private firestore: AngularFirestore,
    private auth: AuthService
  ) { }


  username = localStorage.getItem('email');

  create(data: any, id: string, imgURL: string) {
    return from(this.firestore.collection('events').add({
      creatorId: id,
      creatorName: this.username,
      commentIds: [],
      date: data.date,
      details: data.details,
      guestIds: [],
      location: data.location,
      name: data.title,
      imgURL: imgURL
    }))
  }

  loadEventList() {
   return this.firestore.collection('events').snapshotChanges();
  }

}