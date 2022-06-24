import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {

  constructor(private cookie : CookieService) { }

  ngOnInit(): void {
  }

  logout(){
    this.cookie.delete('uname')
  }
}
