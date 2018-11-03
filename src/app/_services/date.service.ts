import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getCurrentDate(): String {
    let currentDate = new Date();
    let date = currentDate.getDate();
    let stringDate = "";
    if (date < 10) {
      stringDate = "0" + date.toString()
    }
    return currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + stringDate;
  }
}
