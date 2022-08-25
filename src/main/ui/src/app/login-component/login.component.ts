import { CookieService } from 'ngx-cookie-service';
import { AccountService } from '../account.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    uname : new FormControl('',Validators.compose([Validators.required,Validators.maxLength(15)])),
    passw : new FormControl('',Validators.compose([Validators.required])),
  })
  constructor(private acc_service : AccountService,private cookieService : CookieService,private router:Router) { }

  onSubmit(){
    
    if(this.loginForm.valid){
      let uname = this.loginForm.value.uname as string
      let passw = this.loginForm.value.passw as string
      this.acc_service.validatePass(uname,passw).subscribe((res : HttpResponse<any>) =>{
        if(res.status==200){
          
          this.cookieService.set('uname',uname,0.0416)
          if(uname=="librarian")
              this.router.navigateByUrl('/librarianDashboard')
          else
              this.router.navigateByUrl('/userDashboard')
        
        } 
        else if(res.status==401)
            alert("Missing data")
      })
      
    }
  }

  ngOnInit(): void {
  }

}
