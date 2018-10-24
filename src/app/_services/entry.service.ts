import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Entry } from '../_models/entry';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EntryService {

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

  getEntries(): Observable<any[]> {
    const entriesUrl = `${this.api_base_url}/entries.json`
    return this.http.get<any[]>(entriesUrl)
    .pipe(
      tap(entries => {
        console.log("Got entries")
      }),
      catchError(this.handleError('getEntries', []))
    );
  }

  saveEntry(entry: Entry): Observable<any> {
    const saveEntryUrl = `${this.api_base_url}/entries.json`
    return this.http.post<Entry>(saveEntryUrl, entry, this.httpOptions)
    .pipe(
      tap(entry => {
        console.log("Saved an entry")
      })
    );
  }
}
