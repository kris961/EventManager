import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  searchInput = "";

  constructor(
    private eventService: EventService,
    private router: Router) { }

  ngOnInit(): void {
    this.eventService.loadEventList().subscribe(data => {
      this.eventList = data.map((item: any) => {
        let info = item.payload.doc.data();
        if (this.searchInput==="") {
          return {
            id: item.payload.doc.id,
            info,
            name:"works"
          }
        }
        if (info.name.includes(this.searchInput)) {
          return {
            id: item.payload.doc.id,
            info,
            name:"works"
          }
        }
        return {name:undefined}
      })
    })
  }
  eventList: any;

  updateSearch(input:any){
    this.searchInput=input;
    this.ngOnInit();
  }
}

