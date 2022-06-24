import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { book } from './../../book';
import { BookService } from '../../book.service';
import { Component, Input, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorrowService } from 'src/app/borrow.service';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.css']
})

export class BookTableComponent {
  @Input() books : Array<book> =[];
  user : boolean = false;
  librarian : boolean = false 
  constructor(private bookService : BookService,
    private borrowService : BorrowService,
    private cookie : CookieService,
    router : Router) {

      this.user=(router.url=='/borrow')
      this.librarian=(router.url=='/manBooks')   
    
  }
  
  borrow(bookID : string){
    
    console.log(bookID)
    const data = {
      bookId : bookID,
      uname : this.cookie.get('uname')
    }
    this.borrowService.addBorrowal(JSON.stringify(data)).subscribe((res:HttpResponse<any>) => {
  
      if(res.status==200)
        alert( "Book Borrowed")
      else if(res.status==401)
        alert( "Missing Data")
      else if (res.status==412)
        alert( "Book unavailable")  
      this.update();
    })
  }
  remove(bookID : string){
    this.bookService.deleteBook(bookID).subscribe((res : HttpResponse<any>)=>{
      if(res.status==200)
        alert( "Delete Successful")
      else if(res.status==401)
        alert( " Missing data")
      else 
        alert( "Delete Unsuccessful")
      this.update();  
    });
    
  }

  update(){
    this.bookService.getBooks().subscribe((res : book[])=>{
      this.books=JSON.parse(JSON.stringify(res))
    })
  }
}
