import { Component, OnInit, Input } from '@angular/core';
import { DateService } from 'src/app/_services/date.service';

@Component({
  selector: 'app-worklog-csr',
  templateUrl: './worklog-csr.component.html',
  styleUrls: ['./worklog-csr.component.scss']
})
export class WorklogCsrComponent implements OnInit {

  @Input() data: any;

  constructor(
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.data.worklog_date = this.dateService.getCurrentDate();
  }

}
