import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CreateSurveyComponent } from './components/create-survey/create-survey.component';
import { AddAdministratorComponent } from './components/add-administrator/add-administrator.component';
import { MySurveysComponent } from './components/my-surveys/my-surveys.component';
import { SurveyResultsComponent } from './components/survey-results/survey-results.component';
import { StudentHomeComponent } from './components/student-home/student-home.component';
import { StudentSurveyPageComponent } from './components/student-survey-page/student-survey-page.component';
import { TextFieldQuestionComponent } from './components/text-field-question/text-field-question.component';
import { RadioQuestionComponent } from './components/radio-question/radio-question.component';
import { SliderQuestionComponent } from './components/slider-question/slider-question.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { EventEmitterService } from './services/event-emitter.service';
import { ExcelParserComponent } from './components/excel-parser/excel-parser.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CreateSurveyComponent,
    AddAdministratorComponent,
    MySurveysComponent,
    StudentHomeComponent,
    StudentSurveyPageComponent,
    SurveyResultsComponent,
    TextFieldQuestionComponent,
    RadioQuestionComponent,
    SliderQuestionComponent,
    ChangePassComponent,
    ToolbarComponent,
    ExcelParserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,

    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSliderModule,
    MatMenuModule
  ],
  providers: [EventEmitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class EventEmitterModule { }
