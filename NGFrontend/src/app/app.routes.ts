import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { AdmindashboardComponent } from './Components/admindashboard/admindashboard.component';
import { UserdashboardComponent } from './Components/userdashboard/userdashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdmindashboardComponent },
  { path: 'user', component: UserdashboardComponent },
];
