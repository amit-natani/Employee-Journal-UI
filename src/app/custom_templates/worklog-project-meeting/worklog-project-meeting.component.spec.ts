import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklogProjectMeetingComponent } from './worklog-project-meeting.component';

describe('WorklogProjectMeetingComponent', () => {
  let component: WorklogProjectMeetingComponent;
  let fixture: ComponentFixture<WorklogProjectMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorklogProjectMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorklogProjectMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
