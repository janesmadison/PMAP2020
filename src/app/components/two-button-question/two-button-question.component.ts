import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { EventEmitterService } from '../event-emitter.service';



@Component({
  selector: 'app-two-button-question',
  templateUrl: './two-button-question.component.html',
  styleUrls: ['./two-button-question.component.css']
})
export class TwoButtonQuestionComponent implements OnInit {
  @Input() public i: number;
  @Input() public surveyID: string;
  @Input() public questionArr: string[];

  answerVal1: string;
  answerVal2: string;
  question: string;

  constructor(private eventEmitterService: EventEmitterService) {
   }

  twoButtonForm = new FormGroup({question: new FormControl('', Validators.required), answer: new FormControl(''), });

  ngOnInit(): void {
    if (this.eventEmitterService.subsVar==undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
      invokeSaveSurveyFunction.subscribe(() => {
        this.saveSurvey();
      });
    }
  }

  saveSurvey(){
    this.questionArr[this.i]='START' + this.surveyID + 'TWOBUTTONQUESTION' + this.question + 'OPTIONS' + this.answerVal1 + '!!' + this.answerVal2 + 'END';
  }

}
