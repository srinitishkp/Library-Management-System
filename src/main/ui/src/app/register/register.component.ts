import { AccountService } from './../account.service';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    AccountName : new FormControl('',Validators.compose([ Validators.required,Validators.minLength(4)])),
    Email : new FormControl('',Validators.compose([ Validators.required,Validators.email])),
    Address : new FormControl('',Validators.compose([Validators.required,Validators.maxLength(250)])),
    Phone : new FormControl('',Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])),
    UserName : new FormControl('',Validators.compose([Validators.required,Validators.maxLength(15)])),
    Password : new FormControl('',Validators.compose([Validators.required,Validators.minLength(6)])),
    Validity : new FormControl('',Validators.compose([Validators.required,Validators.maxLength(4)])),  
  })
  constructor(private addService : AccountService,private fb : FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(){
    
    this.addService.addMember(JSON.stringify(this.registerForm.value)).subscribe((res : HttpResponse<any>)=>{
      if(res.status==200)
        alert("Member added")
      
    }),(err : HttpErrorResponse) => {
      if(err.status==401)
        alert("Missing Data.") 
    }
  }
}
 