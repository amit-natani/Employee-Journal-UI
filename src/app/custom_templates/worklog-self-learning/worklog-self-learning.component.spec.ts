import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklogSelfLearningComponent } from './worklog-self-learning.component';

describe('WorklogSelfLearningComponent', () => {
  let component: WorklogSelfLearningComponent;
  let fixture: ComponentFixture<WorklogSelfLearningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorklogSelfLearningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorklogSelfLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
