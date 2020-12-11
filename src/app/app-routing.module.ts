import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './user/login/login.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { NgModule } from '@angular/core';
import { EventListComponent } from './event/event-list/event-list.component';
import { AddEventComponent } from './event/add-event/add-event.component';
import { MyEventComponent } from './event/my-event/my-event.component';
import { DetailsComponent } from './event/details/details.component';

const redirectToLogin = () => redirectUnauthorizedTo(['login'])
const redirectToHome = () => redirectLoggedInTo(['home'])

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'event/list',
    component: EventListComponent,
  },
  {
    path: 'event/add',
    component: AddEventComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectToLogin }
  },
  {
    path: 'event/myEvent',
    component: MyEventComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectToLogin }
  },
  {
    path: 'event/details/:id',
    component: DetailsComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectToLogin }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectToHome }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectToHome }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectToLogin }
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent
  },
]; // sets up routes constant where you define your routes

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { };