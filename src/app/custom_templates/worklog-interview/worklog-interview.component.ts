import { Component, OnInit, Input } from '@angular/core';
import { DynamicComponent } from 'src/app/dynamic-component';
import { DateService } from 'src/app/_services/date.service';

@Component({
  selector: 'app-worklog-interview',
  templateUrl: './worklog-interview.component.html',
  styleUrls: ['./worklog-interview.component.scss']
})
export class WorklogInterviewComponent implements OnInit, DynamicComponent {

  @Input() data: any;

  constructor(
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.data.worklog_date = this.dateService.getCurrentDate();
  }

}
