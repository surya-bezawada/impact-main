import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/http/api.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  Form!:FormGroup
  myForm!:FormGroup
 
  constructor(private service:ApiService,private fb:FormBuilder,private route:Router){

    this.Form= this.fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]]

    })
  

  }
  ngOnInit(){
    this.myForm = this.fb.group({
      username:['',[Validators.required]],
      email: ['',[Validators.required]],
      password:['',[Validators.required]]
     
    })
  }
   
  onSubmit() {
    if(this.myForm.valid){
      this.service.registration(this.myForm.value as {
        email: string;
        password: string;
        username: string;
      }).subscribe(res=>{
        console.log(res);
      })
      this.myForm.reset();
     // this.route.navigate(['/home']);

    }

  }

  signin(){

    if(this.Form.valid){
      this.service.login(this.Form.value as {
        email: string;
        password: string;
        
      }).subscribe(res=>{
       console.log(res)
      })
      this.Form.reset();
    }
  }
    


}
