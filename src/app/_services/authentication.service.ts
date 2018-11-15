import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  api_base_url = environment.API_BASE_URL;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private http: HttpClient) { }

  login(access_token): void {
    this.cookieService.set('wrs_session', access_token)
  }

  logout(): void {
    const logoutUrl = `${this.api_base_url}/sessions/logout.json`;
    console.log(logoutUrl)
    this.http.get(logoutUrl)
    .pipe(
      tap(logout => {
        console.log("Logged out")
      })
    ).subscribe(data => {
      this.cookieService.delete('wrs_session');
      this.router.navigate(['login']);
    });
  }

  isLoggedIn(): Boolean {
    let loggedIn = false;
    if(this.cookieService.get('wrs_session')) {
      loggedIn = true;
    }
    return loggedIn;
  }
}
