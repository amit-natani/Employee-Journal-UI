import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklogTrainingSessionComponent } from './worklog-training-session.component';

describe('WorklogTrainingSessionComponent', () => {
  let component: WorklogTrainingSessionComponent;
  let fixture: ComponentFixture<WorklogTrainingSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorklogTrainingSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorklogTrainingSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
