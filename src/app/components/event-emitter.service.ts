import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeSaveSurveyFunction = new EventEmitter();
  subsVar: Subscription;

  constructor() { }

  onSurveySaveButtonClick(questionArr: string[]) {
    this.invokeSaveSurveyFunction.emit(questionArr);
  }
}
