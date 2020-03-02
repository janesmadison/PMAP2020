import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeNavComponent } from './home-nav/home-nav.component';
import { LoginComponent } from './components/login/login.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { AddAdministratorComponent } from './add-administrator/add-administrator.component';
import { MySurveysComponent } from './my-surveys/my-surveys.component';
import { SurveyResultsComponent } from './survey-results/survey-results.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'home', component:HomeNavComponent },
  {path: 'create-survey', component:CreateSurveyComponent },
  {path: 'add-administrator', component:AddAdministratorComponent },
  {path: 'survey-results', component:SurveyResultsComponent},
  {path: 'my-surveys',component:MySurveysComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
  //{path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
