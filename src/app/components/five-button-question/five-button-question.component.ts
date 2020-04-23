import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-five-button-question',
  templateUrl: './five-button-question.component.html',
  styleUrls: ['./five-button-question.component.css']
})
export class FiveButtonQuestionComponent implements OnInit {

  @Output() passQuestion = new EventEmitter<string>();

  constructor(private eventEmitterService: EventEmitterService) { }

  fiveButtonForm = new FormGroup({question: new FormControl('', Validators.required), answer: new FormControl(''), });
  ngOnInit(): void {
    if (this.eventEmitterService.subsVar==undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
      invokeSaveSurveyFunction.subscribe((questionString: string) => {
        this.saveSurvey(questionString);
      });
    }
  }

  deleteMe(i) {
    // this.delete.emit(i);
  }

  saveSurvey(questionString: string){
    // this.eventEmitterService.onSurveySaveButtonClick();
    // var x = questionArr;
    // var i = +x;
    // questionArr = ['question'];
    // alert( 'Hello "' + questionArr + '"\nWelcome to C# Corner \nFunction in First Component');
    questionString = 'hello';
    // return questionString;
    this.passQuestion.emit(questionString);
  }

}
