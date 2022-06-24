import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})


export class AppComponent { 
  title = 'LMS';
  showWelcome : boolean = false;
  show : boolean = false;
  constructor(router:Router) {
    router.events.forEach((event) => {
        if(event instanceof NavigationStart) {
            this.showWelcome = (event.url == "/");
            this.show=(event.url=="/")||(event.url=="/userDashboard")||(event.url=="/librarianDashboard");
        }
      });
    }
}
