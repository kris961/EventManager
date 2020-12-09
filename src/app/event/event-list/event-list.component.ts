import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { IEvent } from 'src/app/shared/interfaces/IEvent';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.loadEventList().subscribe(data => {
      this.eventList = data.map((item:any) => {
        let info = item.payload.doc.data();
        return {
          id: item.payload.doc.id,
          info
        }
      })
    })
  }
  eventList: any;
}

