import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { AddEventComponent } from './add-event/add-event.component';
import { EventListComponent } from './event-list/event-list.component';

const routes: Routes = [
    {
        path: 'event',
        //canActivateChild:[AuthGuard],
        children: [
            {
                path: 'list',
                component: EventListComponent,
                /* data:{
                    isLogged:true,
                    title:'LIST EVENTS'
                } */
            },
            {
                path: 'add',
                component: AddEventComponent,
               /*  data:{
                    isLogged:true,
                    title:'ADD EVENT'
                } */
            }
        ]
        
    }
];

export const EventRoutingModule = RouterModule.forChild(routes);