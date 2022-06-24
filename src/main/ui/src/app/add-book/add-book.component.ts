import { BookService } from './../book.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  @Output() myEvent = new EventEmitter();
  addBookForm=new FormGroup({
    BookName : new FormControl('',Validators.compose([Validators.required])),
    AuthorName : new FormControl('',Validators.compose([Validators.required])),
    Genre : new FormControl('',Validators.compose([Validators.required])),
    Availability : new FormControl('A',Validators.compose([Validators.required]))
  })
  constructor(private bookService : BookService) { }

  ngOnInit(): void {
  }

  onSubmit(){

    this.bookService.addBook(JSON.stringify(this.addBookForm.value)).subscribe((res : HttpResponse<any>)=>{
      if(res.status==200)
        alert("Book added")
      
    }),(err : HttpErrorResponse) => {
      if(err.status==401)
        alert("Missing Data.") 
    }
    this.myEvent.emit("added")
  }

}
