import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeNavComponent } from './home-nav/home-nav.component';
import { LoginComponent } from './components/login/login.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', component:HomeNavComponent},
  {path: 'create-survey', component:CreateSurveyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
