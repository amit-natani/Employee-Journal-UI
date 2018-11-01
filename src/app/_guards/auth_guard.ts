import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private oAuthService: OAuthService,
    private httpClient: HttpClient
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.cookieService.get('wrs_session') != undefined && this.cookieService.get('wrs_session') != null && this.cookieService.get('wrs_session') != "") {
      return true;
    } else {
      if(route.queryParams.code != undefined) {
        console.log("Hello here")
        this.httpClient.post('https://newac.herokuapp.com/sessions/get_access_token', JSON.stringify({'code': route.queryParams.code}))
        .subscribe(res => {
          console.log("Data is:", res.toString())
        });
        // .toPromise()
        // .then(
        //   res => {
        //     console.log("Data is:", res.toString())
        //     this.cookieService.set('wrs_session', res.toString())
        //     return true;
        //   }
        // );
      } else {
        // not logged in so redirect to login page with the return url
        // this.router.navigate([''], { queryParams: { returnUrl: state.url }});
        this.router.navigate(['login']);
        return false;
      }
    }
  }
}