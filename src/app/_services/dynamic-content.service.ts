import { Injectable } from '@angular/core';
import { WorklogInterviewComponent } from '../custom_templates/worklog-interview/worklog-interview.component';
import { DynamicItem } from '../dynamic-item';
import { WorklogProjectTaskComponent } from '../custom_templates/worklog-project-task/worklog-project-task.component';
import { WorklogSelfLearningComponent } from '../custom_templates/worklog-self-learning/worklog-self-learning.component';
import { WorklogMentoringComponent } from '../custom_templates/worklog-mentoring/worklog-mentoring.component';
import { WorklogColleagueSupportComponent } from '../custom_templates/worklog-colleague-support/worklog-colleague-support.component';
import { WorklogProjectMeetingComponent } from '../custom_templates/worklog-project-meeting/worklog-project-meeting.component';
import { WorklogNonProjectMeetingComponent } from '../custom_templates/worklog-non-project-meeting/worklog-non-project-meeting.component';
import { WorklogTrainingSessionComponent } from '../custom_templates/worklog-training-session/worklog-training-session.component';
import { FeedbackSelfComponent } from '../custom_templates/feedback-self/feedback-self.component';
import { FeedbackOthersComponent } from '../custom_templates/feedback-others/feedback-others.component';
import { UserService } from './user.service';
import { WorklogMiscComponent } from '../custom_templates/worklog-misc/worklog-misc.component';
import { WorklogInternalEventComponent } from '../custom_templates/worklog-internal-event/worklog-internal-event.component';
import { WorklogCsrComponent } from '../custom_templates/worklog-csr/worklog-csr.component';
import { WorklogContentDevelopmentComponent } from '../custom_templates/worklog-content-development/worklog-content-development.component';

@Injectable({
  providedIn: 'root'
})
export class DynamicContentService {

  constructor(private userService: UserService) {

  }
  getDynamicContent(componentUrl, data) {
    if (componentUrl == '/worklog-project-task-form.html') {
      return new DynamicItem(WorklogProjectTaskComponent
        , data)
    } else if (componentUrl == '/worklog-learning-form.html') {
      return new DynamicItem(WorklogSelfLearningComponent
        , data)
    } else if (componentUrl == '/worklog-mentoring-form.html') {
      return new DynamicItem(WorklogMentoringComponent
        , data)
    } else if (componentUrl == '/worklog-colleague-support-form.html') {
      return new DynamicItem(WorklogColleagueSupportComponent
        , data)
    } else if (componentUrl == '/worklog-project-meeting-form.html') {
      return new DynamicItem(WorklogProjectMeetingComponent
        , data)
    } else if (componentUrl == '/worklog-non-project-meeting-form.html') {
      return new DynamicItem(WorklogNonProjectMeetingComponent
        , data)
    } else if (componentUrl == '/worklog-interview-form.html') {
      return new DynamicItem(WorklogInterviewComponent
        , data)
    } else if (componentUrl == '/worklog-training-session-form.html') {
      return new DynamicItem(WorklogTrainingSessionComponent
        , data)
    } else if (componentUrl == '/feedback-self-form-template.html') {
      return new DynamicItem(FeedbackSelfComponent
        , data)
    } else if (componentUrl == '/feedback-others-form-template.html') {
      return new DynamicItem(FeedbackOthersComponent
        , data)
    } else if (componentUrl == '/worklog-mics-form.html') {
      return new DynamicItem(WorklogMiscComponent
        , data)
    } else if (componentUrl == '/worklog-internal-event-form.html') {
      return new DynamicItem(WorklogInternalEventComponent
        , data)
    } else if (componentUrl == '/worklog-csr-form.html') {
      return new DynamicItem(WorklogCsrComponent
        , data)
    } else if (componentUrl == '/worklog-content-development-form.html') {
      return new DynamicItem(WorklogContentDevelopmentComponent
        , data)
    }
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/