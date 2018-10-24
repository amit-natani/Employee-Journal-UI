import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackOthersComponent } from './feedback-others.component';

describe('FeedbackOthersComponent', () => {
  let component: FeedbackOthersComponent;
  let fixture: ComponentFixture<FeedbackOthersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackOthersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
