import { BookTableComponent } from './../displaybooks/book-table/book-table.component';
import { BookService } from './../book.service';
import { book } from './../book';
import { Component, OnInit, EventEmitter } from '@angular/core';


@Component({
  selector: 'manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css']
})
export class ManageBooksComponent implements OnInit {

  bookData : book[] = [];
  constructor(private bookService : BookService) { }

  ngOnInit(): void {
    this.updateBooks()
  }

  refresh($event : any){
    console.log("Here")
    this.updateBooks()
    console.log(this.bookData)
  }

  updateBooks(){
    this.bookService.getBooks().subscribe((res : book[])=>{
      this.bookData=JSON.parse(JSON.stringify(res))
    })
  }

}
