import { Router, NavigationStart } from '@angular/router';
import { book } from './../book';
import { BookService } from '../book.service';
import { Component, OnInit, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { LibrarianHeaderComponent } from '../librarian-header/librarian-header.component';
import { BookTableComponent } from './book-table/book-table.component';


@Component({
  selector: 'displaybooks',
  templateUrl: './displaybooks.component.html',
  styleUrls: ['./displaybooks.component.css']
})
export class DisplaybooksComponent  {
 
  showLibrarianHeader:boolean=false;
  showUserHeader:boolean=false;
  bookData : book[]=[];

  constructor(private bookService: BookService,router : Router) {
    
      this.showLibrarianHeader=(router.url=="/librarian/dispBooks")
      this.showUserHeader=(router.url=="/user/dispBooks")
      this.updateTable();
  }

  updateTable(){
    this.bookService.getBooks()
    .subscribe((response : book[]) => {
          this.bookData= JSON.parse(JSON.stringify(response))
       }
    )
  }
}
