import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecurityCheckService {
  public yearNames = [];
  public monthNames;
  public commonArray = [];
  public AUTH = false;
  public username;
  constructor() {
    this.yearNames = this.generateYears();
  }

  authenticate(a) {
    if (a === 'hi') {
      return true;
    } else {
      return false;
    }
  }

  generateYears() {
    let startYear = 2019
    let currentYear = new Date().getFullYear();
    let toAdd = currentYear - startYear;
    let arr = [2019];
    for (let i = 0; i < toAdd; i++) {
      arr.push(startYear + i + 1)
    }
    return arr;
  }
  setUsername(username) {
    this.username = username;
  }

}
