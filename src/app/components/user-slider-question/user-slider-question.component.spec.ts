import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSliderQuestionComponent } from './user-slider-question.component';

describe('UserSliderQuestionComponent', () => {
  let component: UserSliderQuestionComponent;
  let fixture: ComponentFixture<UserSliderQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSliderQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSliderQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
