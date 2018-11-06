import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklogInternalEventComponent } from './worklog-internal-event.component';

describe('WorklogInternalEventComponent', () => {
  let component: WorklogInternalEventComponent;
  let fixture: ComponentFixture<WorklogInternalEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorklogInternalEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorklogInternalEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
