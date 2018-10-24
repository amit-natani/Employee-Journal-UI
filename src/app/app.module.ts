import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// For using ngModel
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { WorklogInterviewComponent } from './custom_templates/worklog-interview/worklog-interview.component';
import { DynamicContentDirective } from './_directives/dynamic-content.directive';
import { WorklogProjectTaskComponent } from './custom_templates/worklog-project-task/worklog-project-task.component';
import { WorklogProjectMeetingComponent } from './custom_templates/worklog-project-meeting/worklog-project-meeting.component';
import { WorklogNonProjectMeetingComponent } from './custom_templates/worklog-non-project-meeting/worklog-non-project-meeting.component';
import { WorklogMentoringComponent } from './custom_templates/worklog-mentoring/worklog-mentoring.component';
import { WorklogTrainingSessionComponent } from './custom_templates/worklog-training-session/worklog-training-session.component';
import { FeedbackSelfComponent } from './custom_templates/feedback-self/feedback-self.component';
import { FeedbackOthersComponent } from './custom_templates/feedback-others/feedback-others.component';
import { WorklogSelfLearningComponent } from './custom_templates/worklog-self-learning/worklog-self-learning.component';
import { WorklogColleagueSupportComponent } from './custom_templates/worklog-colleague-support/worklog-colleague-support.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddEntryComponent,
    WorklogInterviewComponent,
    DynamicContentDirective,
    WorklogProjectTaskComponent,
    WorklogProjectMeetingComponent,
    WorklogNonProjectMeetingComponent,
    WorklogMentoringComponent,
    WorklogTrainingSessionComponent,
    FeedbackSelfComponent,
    FeedbackOthersComponent,
    WorklogSelfLearningComponent,
    WorklogColleagueSupportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    ReactiveFormsModule
  ],
  entryComponents: [ WorklogInterviewComponent, WorklogColleagueSupportComponent, WorklogMentoringComponent, WorklogProjectMeetingComponent, WorklogNonProjectMeetingComponent, WorklogProjectTaskComponent, WorklogSelfLearningComponent, WorklogSelfLearningComponent, FeedbackOthersComponent, FeedbackSelfComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
