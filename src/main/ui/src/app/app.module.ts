import { BorrowService } from './borrow.service';
import { RouterModule } from '@angular/router';
import { AccountService } from './account.service';

import { CommonModule } from '@angular/common';
import { BookService } from './book.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login-component/login.component';
import { BookTableComponent} from './displaybooks/book-table/book-table.component';
import { DisplaybooksComponent } from './displaybooks/displaybooks.component';
import { HeaderComponent } from './header/header.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { LibrarianHeaderComponent } from './librarian-header/librarian-header.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { LibrarianDashboardComponent } from './librarian-dashboard/librarian-dashboard.component';
import { BorrowalTableComponent } from './borrowal-table/borrowal-table.component';
import { AccountTableComponent } from './account-table/account-table.component';
import { BorrowComponent } from './borrow/borrow.component';
import { SearchComponent } from './search/search.component';
import { ManageBooksComponent } from './manage-books/manage-books.component';
import { AddBookComponent } from './add-book/add-book.component';
import { CookieService } from 'ngx-cookie-service';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DisplaybooksComponent,
    BookTableComponent,
    HeaderComponent,
    UserHeaderComponent,
    LibrarianHeaderComponent,
    UserDashboardComponent,
    LibrarianDashboardComponent,
    BorrowalTableComponent,
    AccountTableComponent,
    BorrowComponent,
    SearchComponent,
    ManageBooksComponent,
    AddBookComponent,
  ], imports: [ BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    // RouterModule.forRoot()
  ],
  providers: [ BookService,AccountService,BorrowService,CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
