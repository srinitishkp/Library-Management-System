import { BookService } from './../book.service';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BorrowService } from '../borrow.service';
import { book } from '../book';

@Component({
  selector: 'borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit {

  bookData : book[] = []
  borrowStatus: string|undefined;

  constructor(private bookService : BookService,private borrowService: BorrowService,private cookie : CookieService) {
  }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((res : book[])=>{
         this.bookData=JSON.parse(JSON.stringify(res))
    })
  }

}
