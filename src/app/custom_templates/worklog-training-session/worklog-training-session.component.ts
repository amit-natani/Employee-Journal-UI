import { Component, OnInit, Input } from '@angular/core';
import { DateService } from 'src/app/_services/date.service';

@Component({
  selector: 'app-worklog-training-session',
  templateUrl: './worklog-training-session.component.html',
  styleUrls: ['./worklog-training-session.component.scss']
})
export class WorklogTrainingSessionComponent implements OnInit {

  @Input() data: any;

  constructor(
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.data.worklog_date = this.dateService.getCurrentDate();
  }

}
