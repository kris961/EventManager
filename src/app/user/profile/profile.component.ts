import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from '../user.service';
import { AbstractControl, FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  inEditMode = false;
  currentUser = this.authService.user$;
  path: String | undefined;
  firebaseImgUrl = "";
  isLoading=false;


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private af: AngularFireStorage
  ) { }


  toggleEditMode(): void {
    this.inEditMode = !this.inEditMode;
  }

  async submitHandler(data: any) {
    this.isLoading=true;
    const ref = await this.af.upload("/userPhotos/" + Math.random() + this.path, this.path);
    await this.getUrl(ref);
    if (this.firebaseImgUrl !== "") {
      this.userService.updateUser(this.firebaseImgUrl).then(respone => {
        this.inEditMode = false;
      }).catch(error => console.error(error));
    }
    this.isLoading=false;
  };

  upload($event: any) {
    this.path = $event.target.files[0]
  }

  async getUrl(snap: any) {
    const url = await snap.ref.getDownloadURL();
    this.firebaseImgUrl = url;
  }
}
