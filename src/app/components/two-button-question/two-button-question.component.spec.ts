import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoButtonQuestionComponent } from './two-button-question.component';

describe('TwoButtonQuestionComponent', () => {
  let component: TwoButtonQuestionComponent;
  let fixture: ComponentFixture<TwoButtonQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoButtonQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoButtonQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
