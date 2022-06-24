import { BookTableComponent } from './../displaybooks/book-table/book-table.component';
import { BookService } from './../book.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { book } from '../book';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  {
  
  showLibrarianHeader:boolean=false;
  showUserHeader:boolean=false;
  bookData : book[]=[];
  searchBar = new FormGroup({
    Genre : new FormControl('',Validators.required)
  })

  constructor(private bookService:BookService,router : Router) {

      this.showLibrarianHeader=(router.url=="/librarian/search")
      this.showUserHeader=(router.url=="/user/search")
  }

  onSubmit(){
      console.log("here")
      let genre = this.searchBar.controls.Genre.value as string
      this.bookService.getGenreBooks(genre).subscribe((response : book[] )=>{
        this.bookData=JSON.parse(JSON.stringify(response))
      })
  }


}
