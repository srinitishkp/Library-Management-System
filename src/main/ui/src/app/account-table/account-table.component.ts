import { Observable } from 'rxjs';
import { AccountService } from './../account.service';
import { Account } from './../account';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'account-table',
  templateUrl: './account-table.component.html',
  styleUrls: ['./account-table.component.css']
})
export class AccountTableComponent implements OnInit {

  accounts : Account[]=[]
  constructor(private accountService:AccountService) {
    this.update();
  }

  update(){
    this.accountService.getAccounts().subscribe((res : Observable<any>)=>{
      this.accounts=JSON.parse(JSON.stringify(res))
    })
  }
  
  remove(uname : string){
    this.accountService.removeMember(uname).subscribe((res : HttpResponse<any>)=>{
      if(res.status==200)
        alert( "Delete Successful")
      else if(res.status==401)
        alert( " Missing data")
      this.update();
    })
  }

  ngOnInit(): void {
  }

}
