import { AdminAuthGuard} from './admin-auth.guard';
import { UserAuthGuard } from './user-auth.guard';
import { AccountTableComponent } from './account-table/account-table.component';
import { ManageBooksComponent } from './manage-books/manage-books.component';
import { SearchComponent } from './search/search.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { LibrarianHeaderComponent } from './librarian-header/librarian-header.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatSlider } from '@angular/material/slider';
import { LoginComponent } from './login-component/login.component';
import { RegisterComponent } from './register/register.component';
import { DisplaybooksComponent } from './displaybooks/displaybooks.component';
import { BorrowComponent } from './borrow/borrow.component';
import { BorrowalTableComponent } from './borrowal-table/borrowal-table.component';

const routes: Routes = [
  { path : 'register', 
    component : RegisterComponent,
    canActivate : [AdminAuthGuard] },
  { path : 'login' , 
    component : LoginComponent },
  { path : 'user/dispBooks',  
    component : DisplaybooksComponent,
    canActivate : [UserAuthGuard]},
  { path : 'librarian/dispBooks',  
    component : DisplaybooksComponent,
    canActivate : [AdminAuthGuard]},
  { path : 'manBooks',
    component:ManageBooksComponent,
    canActivate : [AdminAuthGuard]},
  { path : 'user/search',
    component:SearchComponent,
    canActivate : [UserAuthGuard]},
  { path : 'librarian/search',
    component:SearchComponent,
    canActivate : [AdminAuthGuard]},
  { path : 'borrow',
    component:BorrowComponent,
    canActivate : [UserAuthGuard]},
  { path:'librarian/viewBorrowal',
    component:BorrowalTableComponent,
    canActivate : [AdminAuthGuard]},
  { path:'user/viewBorrowal',
    component:BorrowalTableComponent,
    canActivate : [UserAuthGuard]},
  { path : 'librarianDashboard',
    component: LibrarianHeaderComponent,
    canActivate : [AdminAuthGuard]},
  { path : 'userDashboard', 
    component : UserDashboardComponent,
    canActivate : [UserAuthGuard]},
  { path : 'members',
    component: AccountTableComponent,
    canActivate : [AdminAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers : [AdminAuthGuard,UserAuthGuard]
})
export class AppRoutingModule { }
