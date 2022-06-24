import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }

  getAccounts(){

    let configurl='http://localhost:8080/LibraryManagementSystem/LMServlet/account'
    let header = new HttpHeaders();
    header=header.append('ACTION','getAccountList')
    return this.http.get<any>(configurl,{ headers : header })
  }

  validatePass(uname : string,passw:string) : Observable<any>{

    let configurl='http://localhost:8080/LibraryManagementSystem/LMServlet/account'
    let header = new HttpHeaders();
    let result : string="";
    header=header.append('ACTION','validatePassw')
    header=header.set('uname', uname )
    header=header.set('passw',passw)
    return this.http.get<any>(configurl,{ headers : header , observe : 'response' })

  }

  addMember(data : string): Observable<any> {
    let configUrl = 'http://localhost:8080/LibraryManagementSystem/LMServlet/account';
    let header = new HttpHeaders();
    header=header.append('ACTION','addMember')
    return this.http.post(configUrl,data,{headers : header , observe : 'response'})
        

  }


  removeMember(username:string): Observable<any>{

    let configurl='http://localhost:8080/LibraryManagementSystem/LMServlet/account'
    let header = new HttpHeaders();
    header=header.append('ACTION','getUname')
    let data = { uname : username}
    return this.http.delete(configurl,{ headers : header,observe:'response',body:JSON.stringify(data) })
  }
}
