import { Component, OnInit } from '@angular/core';
import { EntryService } from '../../_services/entry.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { DataService } from '../../_services/data.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../../_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  counts: any = {};
  current_user: any = {};

  objectKeys = Object.keys;

  constructor(
    private route: ActivatedRoute, 
    private entryService: EntryService, 
    private router: Router, 
    private dataService: DataService,
    private authenticationService: AuthenticationService,
    private userService: UserService) { }

  ngOnInit() {
    this.removeQueryParams();
    this.getCurrentUser();
    this.entryService.getWorklogCounts()
    .subscribe(counts => {
      this.counts = counts;
    })
  }

  navigateToWorklogList(key) {
    this.dataService.data = key;
    this.router.navigate([`/user/worklogs`]);
  }

  getCurrentUser(): void {
    this.userService.getCurrentUser()
    .subscribe(user => {
      this.current_user = user;
      this.dataService.current_user = user;
    })
  }

  removeQueryParams(): void {
    this.route.queryParams.subscribe(value => {
      if(value.access_token != undefined) {
        this.router.navigate(
          ['.'],
          { relativeTo: this.route, queryParams: { access_token: null, sso_enabled: null } }
        );
      }
    })
  }
}
