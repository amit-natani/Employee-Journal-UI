import { Component, OnInit, Input } from '@angular/core';
import { DateService } from 'src/app/_services/date.service';

@Component({
  selector: 'app-worklog-internal-event',
  templateUrl: './worklog-internal-event.component.html',
  styleUrls: ['./worklog-internal-event.component.scss']
})
export class WorklogInternalEventComponent implements OnInit {
  
  @Input() data: any;

  constructor(
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.data.worklog_date = this.dateService.getCurrentDate();
  }

}
