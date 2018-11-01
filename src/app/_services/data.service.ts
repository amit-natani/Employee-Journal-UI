import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public data: any;
  public current_user: any;

  constructor() { }
}
