import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklogMiscComponent } from './worklog-misc.component';

describe('WorklogMiscComponent', () => {
  let component: WorklogMiscComponent;
  let fixture: ComponentFixture<WorklogMiscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorklogMiscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorklogMiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
