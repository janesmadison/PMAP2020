import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserThreeButtonQuestionComponent } from './user-three-button-question.component';

describe('UserThreeButtonQuestionComponent', () => {
  let component: UserThreeButtonQuestionComponent;
  let fixture: ComponentFixture<UserThreeButtonQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserThreeButtonQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserThreeButtonQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
