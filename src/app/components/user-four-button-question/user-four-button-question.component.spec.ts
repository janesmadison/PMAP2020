import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFourButtonQuestionComponent } from './user-four-button-question.component';

describe('UserFourButtonQuestionComponent', () => {
  let component: UserFourButtonQuestionComponent;
  let fixture: ComponentFixture<UserFourButtonQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFourButtonQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFourButtonQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
