import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntryService } from 'src/app/_services/entry.service';
import { DataService } from 'src/app/_services/data.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-feedback-dashboard',
  templateUrl: './feedback-dashboard.component.html',
  styleUrls: ['./feedback-dashboard.component.scss']
})
export class FeedbackDashboardComponent implements OnInit {

  counts: any = {};
  current_user: any = {};

  objectKeys = Object.keys;

  constructor( 
    private entryService: EntryService, 
    private router: Router, 
    private dataService: DataService) { }

  ngOnInit() {
    this.entryService.getFeedbackCounts()
    .subscribe(counts => {
      this.counts = counts;
    })
  }

  navigateToFeedbackList(key) {
    this.dataService.data = key;
    this.router.navigate([`/user/feedbacks`]);
  }

}
