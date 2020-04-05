import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveButtonQuestionComponent } from './five-button-question.component';

describe('FiveButtonQuestionComponent', () => {
  let component: FiveButtonQuestionComponent;
  let fixture: ComponentFixture<FiveButtonQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiveButtonQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveButtonQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
