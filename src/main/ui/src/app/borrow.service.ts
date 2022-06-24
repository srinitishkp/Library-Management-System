import { Observable } from 'rxjs';
import { Borrowal } from './borrowal';
import { HttpHeaders, HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BorrowService {

  constructor(private http : HttpClient) { }

  getBorrowalList(): Observable<Borrowal[]>{

    let configurl='http://localhost:8080/LibraryManagementSystem/LMServlet/borrowal'
    let header = new HttpHeaders();
    header=header.append('ACTION','getBorrowalList')
    return this.http.get<Borrowal[]>(configurl,{ headers : header })

  }

  getBorrowal(uname : string) : Observable<Borrowal[]>{

    let configurl='http://localhost:8080/LibraryManagementSystem/LMServlet/borrowal'
    let header = new HttpHeaders();
    header=header.append('ACTION','getBorrowal')
    header=header.set('uname',uname)
    return this.http.get<any>(configurl,{ headers : header })

  }

  addBorrowal(data : string):Observable<any>{

    let configurl='http://localhost:8080/LibraryManagementSystem/LMServlet/borrowal'
    let header = new HttpHeaders();
    header=header.append('ACTION','newBorrowal')
    return this.http.post(configurl,data,{ headers : header,observe:'response' })

  }

  returnBook(bookId : string , uname : string) : Observable<any>{
    
    let configurl='http://localhost:8080/LibraryManagementSystem/LMServlet/borrowal'
    let header = new HttpHeaders();
    let data ={ uname : uname , BookId : bookId}
    return this.http.delete(configurl,{ headers : header,observe:'response',body: JSON.stringify(data)})

  }

}
