import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon'
import { RouterModule } from '@angular/router';
import { UserService } from '../user/user.service';
import { AuthService } from './services/auth.service';
import { AppRoutingModule } from '../app-routing.module';
import { UserRoutingModule } from '../user/user-routing.module';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
  ],
  providers:[
    UserService,
    AuthService
  ]
})
export class CoreModule { }
