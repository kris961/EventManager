import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-my-event',
  templateUrl: './my-event.component.html',
  styleUrls: ['./my-event.component.css']
})
export class MyEventComponent implements OnInit {


  searchInput = "";
  currUserId="";
  constructor(
    private eventService: EventService,
    private router: Router,
    private auth: AuthService) {
      auth.authState(user => {
        let id = user?.uid
        if (user) this.currUserId = id!;
      })
     }

  ngOnInit(): void {
    this.eventService.loadEventList().subscribe(data => {
      this.eventList = data.map((item: any) => {
        let info = item.payload.doc.data();
        if (this.searchInput==="" && info.creatorId===this.currUserId) {
          return {
            id: item.payload.doc.id,
            info,
            name:"works"
          }
        }
        if (info.name.includes(this.searchInput) && info.creatorId===this.currUserId) {
          return {
            id: item.payload.doc.id,
            info,
            name:"works"
          }
        }
        return {name:undefined,messege:"No events found"}
      })
    })
  }
  eventList: any;

  updateSearch(input:any){
    this.searchInput=input.target.value;
    this.ngOnInit();
  }
}
