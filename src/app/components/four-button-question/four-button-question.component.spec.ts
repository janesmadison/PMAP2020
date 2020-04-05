import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FourButtonQuestionComponent } from './four-button-question.component';

describe('FourButtonQuestionComponent', () => {
  let component: FourButtonQuestionComponent;
  let fixture: ComponentFixture<FourButtonQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourButtonQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourButtonQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
