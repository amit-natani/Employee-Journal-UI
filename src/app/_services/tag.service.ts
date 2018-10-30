import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TagService {

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

  getBillingHeadList(): Observable<any[]> {
    const billingHeadUrl = `${this.api_base_url}/tags/get_billing_head_list.json`
    return this.http.get<any[]>(billingHeadUrl)
    .pipe(
      tap(billingHeads => {
        console.log("Got Billing head list")
      }),
      catchError(this.handleError('getBillingHeadList', []))
    );
  }

  getOpenSuggestions(query): Observable<any[]> {
    const openSuggestionsUrl = `${this.api_base_url}/tags/get_open_suggestions.json`
    return this.http.get<any[]>(openSuggestionsUrl, { params: new HttpParams().set('query', query) })
    .pipe(
      tap(suggestions => {
        console.log("Got suggestions")
      }),
      catchError(this.handleError('getOpenSuggestions', []))
    );
  }
}
