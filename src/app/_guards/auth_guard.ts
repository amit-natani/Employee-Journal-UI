import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private cookieService: CookieService
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.cookieService.get('wrs_session') != undefined && this.cookieService.get('wrs_session') != null && this.cookieService.get('wrs_session') != "") {
      return true;
    } else {
      if(route.queryParams.access_token != undefined) {
        this.cookieService.set('wrs_session', route.queryParams.access_token)
        return true;
      }
    }
    // not logged in so redirect to login page with the return url
    // this.router.navigate([''], { queryParams: { returnUrl: state.url }});
    this.router.navigate(['login']);
    return false;
  }
}