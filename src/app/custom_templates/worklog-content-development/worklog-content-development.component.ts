import { Component, OnInit, Input } from '@angular/core';
import { DateService } from 'src/app/_services/date.service';

@Component({
  selector: 'app-worklog-content-development',
  templateUrl: './worklog-content-development.component.html',
  styleUrls: ['./worklog-content-development.component.scss']
})
export class WorklogContentDevelopmentComponent implements OnInit {

  @Input() data: any;

  constructor(
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.data.worklog_date = this.dateService.getCurrentDate();
  }

}
