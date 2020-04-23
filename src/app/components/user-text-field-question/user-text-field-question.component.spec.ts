import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTextFieldQuestionComponent } from './user-text-field-question.component';

describe('UserTextFieldQuestionComponent', () => {
  let component: UserTextFieldQuestionComponent;
  let fixture: ComponentFixture<UserTextFieldQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTextFieldQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTextFieldQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
