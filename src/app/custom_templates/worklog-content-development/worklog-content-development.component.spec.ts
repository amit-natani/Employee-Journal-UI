import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklogContentDevelopmentComponent } from './worklog-content-development.component';

describe('WorklogContentDevelopmentComponent', () => {
  let component: WorklogContentDevelopmentComponent;
  let fixture: ComponentFixture<WorklogContentDevelopmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorklogContentDevelopmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorklogContentDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
