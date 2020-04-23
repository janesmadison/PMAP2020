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

  constructor(private eventEmitterService: EventEmitterService) { }
  @Input() public i: number;
  @Input() public surveyID: string;
  @Input() public questionArr: string[];

  answerVal1: string;
  answerVal2: string;
  answerVal3: string;
  answerVal4: string;
  answerVal5: string;
  question: string;

  fiveButtonForm = new FormGroup({question: new FormControl('', Validators.required), answer: new FormControl(''), });
  ngOnInit(): void {
    if (this.eventEmitterService.subsVar==undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
      invokeSaveSurveyFunction.subscribe(() => {
        this.saveSurvey();
      });
    }
  }

  saveSurvey(){
    this.questionArr[this.i]='START' + this.surveyID + 'FIVEBUTTONQUESTION' + this.question + 'OPTIONS' + this.answerVal1 + '!!' + this.answerVal2 + '!!' + this.answerVal3
                                                                              + '!!' + this.answerVal4 + '!!' + this.answerVal5 + 'END';
  }

}
