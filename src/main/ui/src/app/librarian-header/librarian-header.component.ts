import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'librarian-header',
  templateUrl: './librarian-header.component.html',
  styleUrls: ['./librarian-header.component.css']
})
export class LibrarianHeaderComponent implements OnInit {

  constructor(private cookie : CookieService) { }

  ngOnInit(): void {
  }

  logout(){
    this.cookie.delete('uname')
  }

}
