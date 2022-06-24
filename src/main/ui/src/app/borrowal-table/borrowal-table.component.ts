import { CookieService } from 'ngx-cookie-service';
import { BookService } from './../book.service';
import { Observable } from 'rxjs';
import { BorrowService } from './../borrow.service';
import { Borrowal } from './../borrowal';
import { Component, Input, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'borrow-table',
  templateUrl: './borrowal-table.component.html',
  styleUrls: ['./borrowal-table.component.css']
})
export class BorrowalTableComponent implements OnInit {

  uname : string ;
  i:number=0;
  borrowals : Borrowal[] =[];
  bookNames : Array<string> =[];
  user : boolean=false;
  librarian: boolean=false;
  constructor(private borrow_service : BorrowService,
    private book_service : BookService,
    private cookie:CookieService) {

     this.uname =this.cookie.get('uname'); 
     if(this.uname=="librarian")
      this.librarian=true
     else
      this.user=true
    this.updateList();
  }

  ngOnInit(): void {
    
  }

  updateList(){
    if(this.uname=="librarian")
      
      this.borrow_service.getBorrowalList().subscribe((response : Borrowal[]) => {
          this.borrowals= JSON.parse(JSON.stringify(response))
      })
    else
      
      this.borrow_service.getBorrowal(this.uname).subscribe((response : Borrowal[]) => {
          this.borrowals= JSON.parse(JSON.stringify(response))
      })
  }

  onReturn(bookID : string){
    this.borrow_service.returnBook(bookID,this.uname).subscribe((res : HttpResponse<any>)=>{
      if(res.status==200)
        alert( "Return Successful")
      else if(res.status==400)
        alert(" Missing data")
      this.updateList();
    })
  }
}
