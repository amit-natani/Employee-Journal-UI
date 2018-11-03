import { Component, OnInit, Input } from '@angular/core';
import { DateService } from 'src/app/_services/date.service';

@Component({
  selector: 'app-worklog-non-project-meeting',
  templateUrl: './worklog-non-project-meeting.component.html',
  styleUrls: ['./worklog-non-project-meeting.component.scss']
})
export class WorklogNonProjectMeetingComponent implements OnInit {

  @Input() data: any;
  
  constructor(
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.data.worklog_date = this.dateService.getCurrentDate();
  }

}
