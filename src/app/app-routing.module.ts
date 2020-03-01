import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CreatesurveyComponent } from './components/createsurvey/createsurvey.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'createsurvey', component: CreatesurveyComponent }
  // {path: '**', redirectTo: '/createsurvey' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
