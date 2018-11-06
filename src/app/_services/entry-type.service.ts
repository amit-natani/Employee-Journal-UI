import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EntryType } from '../_models/entry-type';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EntryTypeService {

  api_base_url = environment.API_BASE_URL;

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

  getRootEntryTypes(): Observable<EntryType[]> {
    const entryTypesUrl = `${this.api_base_url}/entry_types/root_entry_types.json`
    return this.http.get<EntryType[]>(entryTypesUrl)
    .pipe(
      tap(entryTypes => {
        console.log("Got root entry types")
      }),
      catchError(this.handleError('getRootEntryTypes', []))
    );
  }

  getSubEntryTypes(id): Observable<EntryType[]> {
    const subEntryTypesUrl = `${this.api_base_url}/entry_types/${id}/sub_entry_types.json`;
    return this.http.get<EntryType[]>(subEntryTypesUrl)
    .pipe(
      tap(entryTypes => {
        console.log("Got sub entry types")
      })
    );
  }

  getAllSubEntryTypes(): Observable<EntryType[]> {
    const allSubEntryTypesUrl = `${this.api_base_url}/entry_types/all_sub_entry_types.json`;
    return this.http.get<EntryType[]>(allSubEntryTypesUrl)
    .pipe(
      tap(entryTypes => {
        console.log("Got All sub entry types")
      })
    );
  }

  getCustomFields(id): Observable<any> {
    const customFieldsUrl = `${this.api_base_url}/entry_types/${id}/get_custom_form.json`;
    return this.http.get<any>(customFieldsUrl)
    .pipe(
      tap(customFields => {
        console.log("Retrieved custom fields")
      }),
      catchError(this.handleError<any>(`getCustomFields id=${id}`))
    )
  }

  getWorklogSubEntryTypes(): Observable<EntryType[]> {
    const allSubEntryTypesUrl = `${this.api_base_url}/entry_types/all_worklog_entry_types.json`;
    return this.http.get<EntryType[]>(allSubEntryTypesUrl)
    .pipe(
      tap(entryTypes => {
        console.log("Got All worklog entry types")
      })
    );
  }

  getFeedbackSubEntryTypes(): Observable<EntryType[]> {
    const allSubEntryTypesUrl = `${this.api_base_url}/entry_types/all_feedback_entry_types.json`;
    return this.http.get<EntryType[]>(allSubEntryTypesUrl)
    .pipe(
      tap(entryTypes => {
        console.log("Got All feedback entry types")
      })
    );
  }



  // Just for new schema test
  getLevelZeroTypes(): Observable<EntryType[]> {
    const levelZeroTypes = `${this.api_base_url}/entry_types/level_zero_types.json`;
    return this.http.get<EntryType[]>(levelZeroTypes)
    .pipe(
      tap(entryTypes => {
        console.log("Got Level zero entry types")
      })
    );
  }

  getLevelOneTypes(id): Observable<EntryType[]> {
    const levelOneTypes = `${this.api_base_url}/entry_types/${id}/level_one_types.json`;
    return this.http.get<EntryType[]>(levelOneTypes)
    .pipe(
      tap(entryTypes => {
        console.log("Got Level one entry types")
      })
    );
  }

  getLevelTwoTypes(id): Observable<EntryType[]> {
    const levelTwoTypes = `${this.api_base_url}/entry_types/${id}/level_two_types.json`;
    return this.http.get<EntryType[]>(levelTwoTypes)
    .pipe(
      tap(entryTypes => {
        console.log("Got Level two entry types")
      })
    );
  }
}
