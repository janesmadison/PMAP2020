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

  @Output() delete = new EventEmitter<number>();

  constructor(private eventEmitterService: EventEmitterService) {
   }

  twoButtonForm = new FormGroup({question: new FormControl('', Validators.required), answer: new FormControl(''), });

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
