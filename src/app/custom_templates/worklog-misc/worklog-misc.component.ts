import { Component, OnInit, Input } from '@angular/core';
import { DateService } from 'src/app/_services/date.service';

@Component({
  selector: 'app-worklog-misc',
  templateUrl: './worklog-misc.component.html',
  styleUrls: ['./worklog-misc.component.scss']
})
export class WorklogMiscComponent implements OnInit {

  @Input() data: any;

  constructor(
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.data.worklog_date = this.dateService.getCurrentDate();
  }

}
