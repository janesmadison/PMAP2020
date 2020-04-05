import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeButtonQuestionComponent } from './three-button-question.component';

describe('ThreeButtonQuestionComponent', () => {
  let component: ThreeButtonQuestionComponent;
  let fixture: ComponentFixture<ThreeButtonQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeButtonQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeButtonQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
