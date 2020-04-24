import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEmitterService } from '../../services/event-emitter.service';


@Component({
  selector: 'app-slider-question',
  templateUrl: './slider-question.component.html',
  styleUrls: ['./slider-question.component.css']
})
export class SliderQuestionComponent implements OnInit {
  @Input() public i: number;

  @Output() delete = new EventEmitter<number>();

  constructor(private eventEmitterService: EventEmitterService) { }

  sliderForm = new FormGroup({question: new FormControl('', Validators.required), });

  ngOnInit(): void {
    if (this.eventEmitterService.subsVar==undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
      invokeSaveSurveyFunction.subscribe((name:string) => {
        this.saveSurvey();
      });
    }
  }

  deleteMe(i) {
    // this.delete.emit(i);
  }

  saveSurvey(){
    // this.eventEmitterService.onSurveySaveButtonClick();
    alert( 'Hello ' + '\nWelcome to C# Corner \nFunction in First Component');
  }

}
