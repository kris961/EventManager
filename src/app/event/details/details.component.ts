import { Component, EventEmitter, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  event: any;
  eventId:any;
  currUser:string | undefined;
  isLoading:boolean=false;
  toggleEdit:boolean=false;
  firebaseImgUrl=undefined;
  path:String | undefined;

  constructor(
    public eventService:EventService,
    public activatedRoute:ActivatedRoute,
    public auth:AuthService,
    public router :Router,
    public af:AngularFireStorage
  ) {
    this.eventId=activatedRoute.snapshot.params.id;

    auth.authState(user=>{
      this.currUser=user?.uid;
    })
   }

  ngOnInit(): void {
    this.isLoading=true;
    this.eventService.getEvent(this.eventId)
    .then(event=>{
      this.event=event.data();
      this.isLoading=false;
    })
    .catch(err=>console.log(err));
  }

  deleteHandler(){
    this.eventService.deleteEvent(this.eventId);
    this.router.navigate(["event/list"])
  }

  toggleEditMode(){
    this.toggleEdit=!this.toggleEdit;
  }

  async uploadImage($event:any){
    this.path=$event.target.files[0];
    this.isLoading=true;
    const ref=await this.af.upload("/eventPhotos/"+Math.random()+this.path,this.path);
    this.isLoading=false;
    await this.getUrl(ref);
  }

  async getUrl(snap: any) {
    const url = await snap.ref.getDownloadURL();
    this.firebaseImgUrl = url;
  }

  submitHandler(data:any){
    if (this.firebaseImgUrl!==undefined) {
      data.imgURL=this.firebaseImgUrl;
    }
    else{
      data.imgURL=this.event.imgURL;
    }
    this.eventService.updateEvent(this.eventId,data).catch(err=>console.log(err));
    this.toggleEdit=false;
    this.router.navigate([`event/details/${this.eventId}`]);
    console.log("done");
    this.ngOnInit();
  }

 /*  this.eventService.create({title,location,date,details},this.userId,this.imgURL).subscribe({
    next:()=>{
      this.isLoading=false;
      console.log("event added")
      this.router.navigate(['home']);
    },
    error:(err)=>{
      this.isLoading=false;
      console.log(err);
    }
  }) */

}
