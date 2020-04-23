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
  @Input() public i: number;

  @Output() delete = new EventEmitter<number>();

  constructor(private eventEmitterService: EventEmitterService) { }

  fiveButtonForm = new FormGroup({question: new FormControl('', Validators.required), answer: new FormControl(''), });
  ngOnInit(): void {
    if (this.eventEmitterService.subsVar==undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
      invokeSaveSurveyFunction.subscribe((questionArr: string[]) => {
        this.saveSurvey(questionArr);
      });
    }
  }

  deleteMe(i) {
    // this.delete.emit(i);
  }

  saveSurvey(questionArr: string[]){
    // this.eventEmitterService.onSurveySaveButtonClick();
    // var x = questionArr;
    // var i = +x;
    // questionArr = 'question';
    alert( 'Hello "' + questionArr + '"\nWelcome to C# Corner \nFunction in First Component');
  }

}
