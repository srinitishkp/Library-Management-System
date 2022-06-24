import { BorrowalTableComponent } from './../borrowal-table/borrowal-table.component';
import { UserHeaderComponent } from './../user-header/user-header.component';
import { BookTableComponent } from './../displaybooks/book-table/book-table.component';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  bookTable : BookTableComponent | undefined;
  borrowalTable:BorrowalTableComponent|undefined;
  constructor() {   }

  ngOnInit(): void {
  }

}
