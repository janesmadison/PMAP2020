import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEmitterService } from '../event-emitter.service';



@Component({
  selector: 'app-slider-question',
  templateUrl: './slider-question.component.html',
  styleUrls: ['./slider-question.component.css']
})
export class SliderQuestionComponent implements OnInit {
  @Input() public i: number;
  @Input() public surveyID: string;
  @Input() public questionArr: string[];

  question: string;

  constructor(private eventEmitterService: EventEmitterService) { }

  sliderForm = new FormGroup({question: new FormControl('', Validators.required), });

  ngOnInit(): void {
    if (this.eventEmitterService.subsVar==undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
      invokeSaveSurveyFunction.subscribe(() => {
        this.saveSurvey();
      });
    }
  }

  saveSurvey(){
    this.questionArr[this.i]='START' + this.surveyID + 'SLIDERQUESTION' + this.question + 'END';
  }

}
