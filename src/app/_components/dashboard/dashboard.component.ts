import { Component, OnInit } from '@angular/core';
import { EntryService } from '../../_services/entry.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { DataService } from '../../_services/data.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  counts: any = {};

  objectKeys = Object.keys;

  constructor(
    private route: ActivatedRoute, 
    private entryService: EntryService, 
    private router: Router, 
    private dataService: DataService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(value => {
      if(value.access_token != undefined) {
        this.authenticationService.login(value.access_token);
        this.router.navigate(
          ['.'], 
          { relativeTo: this.route, queryParams: { access_token: null, sso_enabled: null } }
        );
      }
    })
    this.entryService.getWorklogCounts()
    .subscribe(counts => {
      this.counts = counts;
    })
  }

  nvigateToWorklogList(key) {
    this.dataService.data = key;
    this.router.navigate([`/user/worklogs`]);
  }
}
