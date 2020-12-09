import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    component:HomeComponent
  },
  {
    path:'home',
    pathMatch:'full',
    component:HomeComponent
  },
  {
    path:'**',
    pathMatch:'full',
    component:NotFoundComponent
  }
]; // sets up routes constant where you define your routes

export const AppRoutingModule=RouterModule.forRoot(routes);