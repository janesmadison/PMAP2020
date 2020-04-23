import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { EventEmitterService } from '../components/event-emitter.service';



@Component({
  selector: 'app-text-field-question',
  templateUrl: './text-field-question.component.html',
  styleUrls: ['./text-field-question.component.css']
})
export class TextFieldQuestionComponent implements OnInit {
  @Input() public i: number;

  @Output() delete = new EventEmitter<number>();

  textFieldForm = new FormGroup({question: new FormControl('', Validators.required), });
  isValid = this.textFieldForm.valid;
  constructor(private eventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
    if (this.eventEmitterService.subsVar==undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
      invokeSaveSurveyFunction.subscribe((name:string) => {
        this.saveSurvey();
      });
    }
  }
 checkValidity() {
   console.log(this.textFieldForm.valid);
 }

 deleteMe(i) {
   // this.delete.emit(i);
 }

 saveSurvey(){
   // this.eventEmitterService.onSurveySaveButtonClick();
   alert( 'Hello ' + '\nWelcome to C# Corner \nFunction in First Component');
 }
}
