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


  create(data: any, id: string, imgURL: string) {
    return from(this.firestore.collection('events').add({
      creatorId: id,
      creatorName: localStorage.getItem('email'),
      commentIds: [],
      date: data.date,
      details: data.details,
      guestIds: [],
      location: data.location,
      name: data.title,
      imgURL: imgURL
    }))
  }

  getEvent(id: string) {
    return this.firestore.collection('events').doc(id).get().toPromise()
  }

  loadEventList() {
   return this.firestore.collection('events').snapshotChanges();
  }

  deleteEvent(eventId:string) {
    return this.firestore.doc('events/' + eventId).delete();
  }

  updateEvent(eventId:string, event:any) {
    return this.firestore.doc('events/' + eventId).update(event);
  }

  createComment(text: any, id: any,eventId:any) {
    return from(this.firestore.collection('comments').add({
      creatorId: id,
      creatorName: localStorage.getItem('email'),
      text: text,
      eventId:eventId
    }))
  }

  loadCommentList() {
    return this.firestore.collection('comments').snapshotChanges();
   }

}
