import { Component, OnInit, Input } from '@angular/core';
import { TagService } from 'src/app/_services/tag.service';
import { DateService } from 'src/app/_services/date.service';

@Component({
  selector: 'app-worklog-project-meeting',
  templateUrl: './worklog-project-meeting.component.html',
  styleUrls: ['./worklog-project-meeting.component.scss']
})
export class WorklogProjectMeetingComponent implements OnInit {

  billingHeads: object[]
  @Input() data: any;

  constructor(
    private tagService: TagService,
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.tagService.getBillingHeadList()
    .subscribe(billingHeads => {
      this.billingHeads = billingHeads;
    })
    this.data.worklog_date = this.dateService.getCurrentDate();
  }
}
