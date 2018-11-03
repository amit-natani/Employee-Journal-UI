import { Component, OnInit, Input } from '@angular/core';
import { TagService } from 'src/app/_services/tag.service';
import { DateService } from 'src/app/_services/date.service';

@Component({
  selector: 'app-worklog-project-task',
  templateUrl: './worklog-project-task.component.html',
  styleUrls: ['./worklog-project-task.component.scss']
})
export class WorklogProjectTaskComponent implements OnInit {
  
  @Input() data: any;

  billingHeads: object[];

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
