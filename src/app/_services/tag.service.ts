import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  api_base_url = environment.API_BASE_URL
  wrs_api_base_url = environment.WRS_API_BASE_URL

  constructor(private http: HttpClient, private dataService: DataService) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return(error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      console.log(error);
      return of(result as T);
    }
  }

  getBillingHeadList(): Observable<any[]> {
    // const billingHeadUrl = `${this.api_base_url}/tags/get_billing_head_list.json`
    // return this.http.get<any[]>(billingHeadUrl)
    // .pipe(
    //   tap(billingHeads => {
    //     console.log("Got Billing head list")
    //   }),
    //   catchError(this.handleError('getBillingHeadList', []))
    // );
    let params = new HttpParams().set("include_manager",'true');
    return this.http.get<any>(`${this.wrs_api_base_url}/employees/${this.dataService.current_user.id}/groups.json`, { params: params })
    .pipe(
      tap(groups => {
        console.log("Got Billing heads")
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
