import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandleDataService {

  public Data;
  public flag = false;
  constructor() { }

  notification(value) {
    this.flag = value;
  }

  checkNotification() {
    return this.flag;
  }

  saveData(data) {
    this.Data = data;
  }
}
