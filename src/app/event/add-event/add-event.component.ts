import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService } from '../event.service';
import { AngularFireStorage } from '@angular/fire/storage'

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit{
  form:FormGroup;
  isLoading:boolean=false;
  imgURL="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";
  userId="";
  path: String | undefined;
  firebaseImgUrl = undefined;

  get titleInput():AbstractControl | null{
    return this.form.get("title");
  }

  get locationInput():AbstractControl | null{
    return this.form.get("location");
  }

  get dateInput():AbstractControl |null{
    return this.form.get("date");
  }

  get imageInput():AbstractControl | null{
    return this.form.get("image");
  }

  get detailsInput():AbstractControl | null{
    return this.form.get("details");
  }

  constructor(
    private fb:FormBuilder,
    private eventService:EventService,
    private router:Router,
    private auth:AuthService,
    private af: AngularFireStorage
  ) {
    const titleControl=this.fb.control('',[
      Validators.required,
      Validators.minLength(3),
    ]);

    const locationControl=this.fb.control('',[
      Validators.required,
      Validators.minLength(3)
    ]);

    const dateControl=this.fb.control('',[
      Validators.required
    ]);

    const detailsControl=this.fb.control('',[
      Validators.required,
      Validators.minLength(10)
    ]);

    this.form=this.fb.group({
      title:titleControl,
      location:locationControl,
      date:dateControl,
      details:detailsControl
    })
   }

  ngOnInit(): void {
    this.getUserId();
  }

  getUserId(){
    return this.auth.user$.subscribe(user=>{
      this.userId=user?.uid as string;
      console.log(this.userId);
    })
  }

  submitHandler(){
    this.isLoading=true;

    const{title,location,date,details}=this.form.value;
    if (this.firebaseImgUrl!==undefined) {
        this.imgURL=this.firebaseImgUrl as unknown as string;
    }

    this.eventService.create({title,location,date,details},this.userId,this.imgURL).subscribe({
      next:()=>{
        this.isLoading=false;
        this.router.navigate(['/event/list']);
      },
      error:(err)=>{
        this.isLoading=false;
        console.log(err);
      }
    })
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

}
