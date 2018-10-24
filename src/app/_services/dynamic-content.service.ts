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

@Injectable({
  providedIn: 'root'
})
export class DynamicContentService {

  constructor(private userService: UserService) {

  }
  getDynamicContent(componentUrl) {
    if (componentUrl == '/worklog-project-form.html') {
      return new DynamicItem(WorklogProjectTaskComponent
        , {})
    } else if (componentUrl == '/worklog-self-learning-form.html') {
      return new DynamicItem(WorklogSelfLearningComponent
        , {})
    } else if (componentUrl == '/worklog-mentoring-form.html') {
      return new DynamicItem(WorklogMentoringComponent
        , {})
    } else if (componentUrl == '/worklog-colleague-support-form.html') {
      return new DynamicItem(WorklogColleagueSupportComponent
        , {})
    } else if (componentUrl == '/worklog-project-meeting-form.html') {
      return new DynamicItem(WorklogProjectMeetingComponent
        , {})
    } else if (componentUrl == '/worklog-non-project-meeting-form.html') {
      return new DynamicItem(WorklogNonProjectMeetingComponent
        , {})
    } else if (componentUrl == '/worklog-interview-form.html') {
      return new DynamicItem(WorklogInterviewComponent
        , {})
    } else if (componentUrl == '/worklog-training-session-form.html') {
      return new DynamicItem(WorklogTrainingSessionComponent
        , {})
    } else if (componentUrl == '/feedback-self-form-template.html') {
      return new DynamicItem(FeedbackSelfComponent
        , {})
    } else if (componentUrl == '/feedback-others-form-template.html') {
      return new DynamicItem(FeedbackOthersComponent
        , {})
    }
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/