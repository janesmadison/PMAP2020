/*
Author: Madison Janes

Description:
This file controls all routing between components for the entire
project. Look up Routes and RouterModule for Angular Material for more details.
Each element of the root belongs to the URL. '' means no url and * is a wildcard. */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CreateSurveyComponent } from './components/create-survey/create-survey.component';
import { AddAdministratorComponent } from './components/add-administrator/add-administrator.component';
import { MySurveysComponent } from './components/my-surveys/my-surveys.component';
import { SurveyResultsComponent } from './components/survey-results/survey-results.component';
import { StudentHomeComponent } from './components/student-home/student-home.component';
import { StudentSurveyPageComponent } from './components/student-survey-page/student-survey-page.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { SurveyComponent } from './components/survey/survey.component';
import { ExcelParserComponent } from './components/excel-parser/excel-parser.component';

/* List of all possible routes for the page. Login component is by itself
because to see the login page, you don't need to be an admin or a student.
All children of home component (admin) has the same tool bar and sidebar as home.
Similarly, all children of student-home have same toolbar and lack of a sidebar. */
const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {path: 'create-survey', component: CreateSurveyComponent },
      {path: 'add-administrator', component: AddAdministratorComponent },
      {path: 'survey-results', component: SurveyResultsComponent },
      {path: 'my-surveys', component: MySurveysComponent },
      {path: 'change-pass', component: ChangePassComponent },
      {path: 'my-classes', component: ExcelParserComponent},
      {path: '*', redirectTo: '/login', pathMatch: 'full'}
    ]
  },

  {
    path: 'student-home',
    component: StudentHomeComponent,
    children: [
      {path: 'student-survey', component: StudentSurveyPageComponent},
      {path: 'survey/:id', component: SurveyComponent},
      {path: 'change-pass', component: ChangePassComponent },
      {path: '*', redirectTo: '/login', pathMatch: 'full'}
  ]},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: '*', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
