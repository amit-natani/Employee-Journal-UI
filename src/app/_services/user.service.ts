import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api_base_url = environment.API_BASE_URL

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return(error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      console.log(error);
      return of(result as T);
    }
  }

  getUsers(): Observable<any[]> {
    const usersUrl = `${this.api_base_url}/users.json`
    return this.http.get<any[]>(usersUrl)
    .pipe(
      tap(users => {
        console.log("Got users")
      }),
      catchError(this.handleError('getUsers', []))
    );
  }
}
