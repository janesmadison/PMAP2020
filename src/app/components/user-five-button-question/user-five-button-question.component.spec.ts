import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFiveButtonQuestionComponent } from './user-five-button-question.component';

describe('UserFiveButtonQuestionComponent', () => {
  let component: UserFiveButtonQuestionComponent;
  let fixture: ComponentFixture<UserFiveButtonQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFiveButtonQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFiveButtonQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
