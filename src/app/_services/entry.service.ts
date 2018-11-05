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

  getAllEntries(): Observable<any[]> {
    const entriesUrl = `${this.api_base_url}/entries.json`
    return this.http.get<any>(entriesUrl)
    .pipe(
      tap(entries => {
        console.log("Got entries")
      }),
      catchError(this.handleError('getEntries', []))
    );
  }

  getWorklogCounts(): Observable<any> {
    const countUrl = `${this.api_base_url}/entries/get_worklog_counts.json`
    return this.http.get<any>(countUrl)
    .pipe(
      tap(counts => {
        console.log("Got worklog counts")
      }),
      catchError(this.handleError('getWorklogCounts', {}))
    );
  }

  getFeedbackCounts(): Observable<any> {
    const countUrl = `${this.api_base_url}/entries/get_feedback_counts.json`
    return this.http.get<any>(countUrl)
    .pipe(
      tap(counts => {
        console.log("Got feedback counts")
      }),
      catchError(this.handleError('getFeedbackCounts', {}))
    );
  }

  getEntriesById(id): Observable<Entry[]> {
    const entriesUrl = `${this.api_base_url}/entries/${id}/get_entries_by_entry_type_id.json`
    return this.http.get<any[]>(entriesUrl)
    .pipe(
      tap(entries => {
        console.log("Got entries")
      }),
      catchError(this.handleError('getEntries', []))
    );
  }

  getEntry(id): Observable<Entry> {
    const entryUrl = `${this.api_base_url}/entries/${id}.json`
    return this.http.get<any>(entryUrl)
    .pipe(
      tap(entries => {
        console.log("Got entry")
      }),
      catchError(this.handleError('getEntry'))
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
