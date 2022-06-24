import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { TmplAstRecursiveVisitor } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router : Router,private cookie : CookieService) { }

  isAdminLoggedIn() : boolean{
    let uname=this.cookie.get("uname")
    if(uname=="librarian")
      return true
    return false
  }

  isUserLoggedIn() : boolean{
    let uname=this.cookie.get("uname")
    if(uname!=""&&uname!="librarian")
      return true
    return false
  }
}
