import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTwoButtonQuestionComponent } from './user-two-button-question.component';

describe('UserTwoButtonQuestionComponent', () => {
  let component: UserTwoButtonQuestionComponent;
  let fixture: ComponentFixture<UserTwoButtonQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTwoButtonQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTwoButtonQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
