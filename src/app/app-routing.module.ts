import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TodoAddComponent } from './components/todo-add/todo-add.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'todoList', component: TodoListComponent},
  {path:'todoAdd', component: TodoAddComponent},
  {path:'todoUpdate/:id', component: TodoAddComponent},
  {path:'admin', component: AdminDashboardComponent, canActivate: [AuthGuard]},
  {path:'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path:'forgot-password', component: ForgotPasswordComponent},
  {path:'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent },
  {path:'verify-email', component: VerifyEmailComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: HomeComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
