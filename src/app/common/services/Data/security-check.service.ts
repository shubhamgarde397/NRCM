import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecurityCheckService {
  public yearNames = [];
  public monthNames;
  public IP = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  public commonArray = {
    "gstdetails": [{}],
    "ownerdetails": [{}],
    "villagenames": [{}],
    "regularparty": [{}],
    "RegularTruck": [{}],
    "thoughts": [{}],
    "personaldetails": [{}],
    "truckdetails": [{}],
    "Role": 6
  }

  public AUTH = false;
  public username;
  public role = 6;
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

  setRole(role) {
    this.role = role;
  }

}
