import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let access_token = this.cookieService.get('wrs_session');
    if (access_token) {
      request = request.clone({
        setHeaders: { 
          Authorization: `${access_token}`,
        }
      });
    }
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    return next.handle(request);
  }
}