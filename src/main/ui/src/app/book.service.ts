import { book } from './book';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})

export class BookService {

  configUrl  = 'http://localhost:8080/LibraryManagementSystem/LMServlet/book'
  constructor(private http : HttpClient) { }
  

  getBooks() : Observable <book[]> {

    let headers = new HttpHeaders();
    headers = headers.append('ACTION', 'getBooks');
    return this.http.get<book[]>(this.configUrl, { headers: headers })

  }
  

  getGenreBooks(genre : string) : Observable <book[]> {

    let headers = new HttpHeaders();
    headers = headers.append('ACTION', 'getGenreBooks');
    headers= headers.set('Genre',genre)
    return this.http.get<book[]>(this.configUrl, { headers: headers })

  }

  addBook(data : string): Observable<any> {
    
    let header = new HttpHeaders();
    header=header.append('ACTION','insertBook')
    return this.http.post(this.configUrl,data,{headers : header , observe : 'response'})

  }

  deleteBook(id:string): Observable<any> {

    let data ={ "BookId" : id}
    return this.http.delete(this.configUrl,{ body : JSON.stringify(data) ,observe:'response'})
 
  }
}
