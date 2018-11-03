import { Component, OnInit, Input } from '@angular/core';
import { DateService } from 'src/app/_services/date.service';

@Component({
  selector: 'app-worklog-self-learning',
  templateUrl: './worklog-self-learning.component.html',
  styleUrls: ['./worklog-self-learning.component.scss']
})
export class WorklogSelfLearningComponent implements OnInit {

  @Input() data: any;

  constructor(
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.data.worklog_date = this.dateService.getCurrentDate();
  }

}
