import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { EventEmitterService } from '../../services/event-emitter.service';
import { Answer, Question } from '../../common.types';

@Component({
  selector: 'app-radio-question',
  templateUrl: './radio-question.component.html',
  styleUrls: ['./radio-question.component.css']
})
export class RadioQuestionComponent implements OnInit {
  @Input() i: number; // index
  @Input() question: Question[];

  @Output() radioQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  constructor(private eventEmitterService: EventEmitterService) { }

  radioQuestion = new FormGroup({ answer: new FormControl('') });
  ngOnInit(): void {
    if (this.eventEmitterService.subsVar === undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
      invokeSaveSurveyFunction.subscribe((questionArr: string[]) => {
        this.saveSurvey(questionArr);
      });
    }
  }

  deleteMe(index) {
    // this.delete.emit(i);
  }

  saveSurvey(questionArr: string[]) {
    // this.eventEmitterService.onSurveySaveButtonClick();
    // var x = questionArr;
    // var i = +x;
    // questionArr = 'question';
    alert( 'Saving: "' + questionArr + '"\n');
  }

}
