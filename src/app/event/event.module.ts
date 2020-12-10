import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEventComponent } from './add-event/add-event.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventService } from './event.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { RouterModule } from '@angular/router';
import { MyEventComponent } from './my-event/my-event.component';



@NgModule({
  declarations: [
    AddEventComponent, 
    EventListComponent, 
    EventDetailsComponent, MyEventComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers:[
    EventService,
    AuthService
  ]
})
export class EventModule { }
